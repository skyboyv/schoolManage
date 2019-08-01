import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Modal, Select, TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

@connect(({ subjectManage }) => ({
  record: subjectManage.record,
  modalVisible: subjectManage.modalVisible,
  title: subjectManage.title,
  menuList: subjectManage.menuList,
}))
@Form.create()
export default class SubjectModal extends PureComponent {
  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'subjectManage/updateState',
      payload: {
        viewContent: '',
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
          type: 'subjectManage/save',
          payload: {
            values: data,
          },
        });
      }
    });
  };

  render() {
    const {
      modalVisible,
      record,
      title,
      campusList,
      form: { getFieldDecorator },
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
          <Form.Item label="科目名称">
            {getFieldDecorator('subjectName', {
              initialValue: record && record.campusId,
            })(
              <Select>
                {campusList &&
                  campusList.map(item => {
                    return <Select.Option key={item.campusId}>{item.campusName}</Select.Option>;
                  })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="科目名称">
            {getFieldDecorator('subjectName', {
              initialValue: record && record.subjectName,
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
