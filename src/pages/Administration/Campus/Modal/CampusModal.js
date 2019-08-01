import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Modal, TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

@connect(({ campusManage }) => ({
  record: campusManage.record,
  modalVisible: campusManage.modalVisible,
  title: campusManage.title,
  menuList: campusManage.menuList,
}))
@Form.create()
export default class CampusModal extends PureComponent {
  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'campusManage/updateState',
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
          type: 'campusManage/save',
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
          <Form.Item label="校区名称">
            {getFieldDecorator('campusName', {
              initialValue: record && record.campusName,
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
