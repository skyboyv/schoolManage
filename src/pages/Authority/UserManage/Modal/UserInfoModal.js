import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Modal, Select } from 'antd';

@connect(({ userManage }) => ({
  record: userManage.record,
  modalVisible: userManage.modalVisible,
  title: userManage.title,
  roleList: userManage.roleList,
}))
@Form.create()
export default class userInfoModal extends PureComponent {
  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/updateState',
      payload: {
        viewContent: '',
        modalVisible: false,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'userManage/save',
          payload: {
            values,
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
      roleList,
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
          <Form.Item label="用户名">
            {getFieldDecorator('name', {
              initialValue: record ? record.name : undefined,
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  max: 10,
                  message: '最大长度10',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="用户角色">
            {getFieldDecorator('roleId', {
              initialValue: record ? record.roleId : undefined,
              rules: [
                {
                  required: true,
                  message: '请选择角色',
                },
              ],
            })(
              <Select>
                {roleList.map(item => {
                  return <Select.Option key={item.roleId}>{item.roleName}</Select.Option>;
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="用户账号">
            {getFieldDecorator('userName', {
              initialValue: record ? record.userName : undefined,
              rules: [
                {
                  required: true,
                  message: '请输入用户账号',
                },
                {
                  max: 10,
                  message: '最大长度10',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="用户密码">
            {getFieldDecorator('password', {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: '请输入用户密码',
                },
                {
                  max: 10,
                  message: '最大长度10',
                },
                {
                  min: 6,
                  message: '最小长度6',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
