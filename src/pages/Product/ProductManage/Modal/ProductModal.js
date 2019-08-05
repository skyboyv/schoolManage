import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Icon, Input, Modal, message, Upload, InputNumber } from 'antd';

@connect(({ productManage }) => ({
  record: productManage.record,
  modalVisible: productManage.modalVisible,
  title: productManage.title,
  menuList: productManage.menuList,
}))
@Form.create()
export default class ProductModal extends PureComponent {
  state = {
    loading: false,
  };

  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productManage/updateState',
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
        const data = values;
        if (record.id) {
          data.id = record.id;
        }
        dispatch({
          type: 'productManage/save',
          payload: {
            values: data,
          },
        });
      }
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

  handleChange = info => {
    const { dispatch } = this.props;
    if (info.file.status === 'uploading') {
      dispatch({
        type: 'productManage/updateState',
        payload: {
          loading: true,
        },
      });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        dispatch({
          type: 'productManage/updateState',
          payload: {
            imageUrl,
            loading: false,
          },
        })
      );
    }
  };

  uploadPic = pic => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productManage/uploadPic',
      payload: {
        pic,
      },
    });
  };

  render() {
    const {
      modalVisible,
      record,
      title,
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.state;
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
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <Modal
        destroyOnClose
        maskClosable={false}
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
          <Form.Item label="商品名称">
            {getFieldDecorator('productName', {
              initialValue: record && record.productName,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="商品数量">
            {getFieldDecorator('number', {
              initialValue: record && record.number,
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: record && record.price,
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="兑换地点">
            {getFieldDecorator('convertAddr', {
              initialValue: record && record.convertAddr,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="上传图片">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              accept="image/.jpg,.png,JPG,.PNG"
              showUploadList={false}
              action={this.uploadPic.bind(this)}
              beforeUpload={this.beforeUpload.bind(this)}
              onChange={this.handleChange.bind(this)}
            >
              {record && record.imgSrc ? (
                <img src={record.imgSrc} alt="avatar" style={{ width: '102px', height: '102px' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
