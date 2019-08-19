import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Icon, Input, Modal, message, Upload } from 'antd';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';
import moment from 'moment';

@connect(({ parentContent }) => ({
  record: parentContent.record,
  editorState: parentContent.editorState,
  modalVisible: parentContent.modalVisible,
  title: parentContent.title,
}))
@Form.create()
export default class covertInfoModal extends PureComponent {
  componentDidMount() {
    const { dispatch, record } = this.props;
    dispatch({
      type: 'parentContent/updateState',
      payload: {
        editorState: BraftEditor.createEditorState(record.content),
      },
    });
  }

  handleChange = editorState => {
    const { dispatch, record } = this.props;
    dispatch({
      type: 'parentContent/updateState',
      payload: {
        record: { ...record, content: editorState.toHTML() },
        editorState,
      },
    });
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleUploadChange = info => {
    const { dispatch, record } = this.props;
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => {
        dispatch({
          type: 'parentContent/updateState',
          payload: {
            record: {
              ...record,
              imageUrl,
            },
          },
        });
      });
    }
  };

  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'parentContent/updateState',
      payload: {
        modalVisible: false,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, record } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        record.title = values.title;
        dispatch({
          type: 'parentContent/save',
          payload: {
            values: record,
          },
        });
      }
    });
  };

  uploadHandler = param => {
    const { record, dispatch, editorState } = this.props;
    if (!param.file) {
      return false;
    }
    const temp = ContentUtils.insertMedias(editorState, [
      {
        type: 'IMAGE',
        url: URL.createObjectURL(param.file),
      },
    ]);
    dispatch({
      type: 'parentContent/updateState',
      payload: {
        record: {
          ...record,
          content: temp.toHTML(),
        },
        editorState: temp,
      },
    });
    return null;
  };

  render() {
    const {
      modalVisible,
      record,
      editorState,
      title,
      form: { getFieldDecorator },
      loading,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler.bind(this)}
          >
            <Button className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />
            </Button>
          </Upload>
        ),
      },
    ];

    return (
      <Modal
        destroyOnClose
        maskClosable={false}
        width={900}
        visible={modalVisible}
        title={title}
        onCancel={this.onCancel}
        footer={[
          <Button key="cancel" onClick={this.onCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleSubmit}>
            确认
          </Button>,
        ]}
      >
        <Form {...formItemLayout}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              initialValue: record && record.title ? record.title : undefined,
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>
          <Form.Item label="封面图">
            {getFieldDecorator('cover', {
              initialValue: record && record.cover ? record.cover : undefined,
              rules: [
                {
                  required: true,
                  message: '请上传封面',
                },
              ],
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.handleUploadChange}
              >
                {record.imageUrl ? (
                  <img src={record.imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="正文">
            {getFieldDecorator('covert', {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: '请输入正文',
                },
              ],
            })(
              <div className="editor-wrapper" style={{ border: '1px solid #ddd' }}>
                <BraftEditor
                  value={editorState}
                  onChange={this.handleChange}
                  placeholder="请输入正文内容"
                  extendControls={extendControls}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
