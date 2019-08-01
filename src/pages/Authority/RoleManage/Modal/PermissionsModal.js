import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Modal, TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

@connect(({ roleManage }) => ({
  record: roleManage.record,
  modalVisible: roleManage.modalVisible,
  title: roleManage.title,
  menuList: roleManage.menuList,
}))
@Form.create()
export default class PermissionsModal extends PureComponent {
  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'roleManage/updateState',
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
          type: 'roleManage/save',
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
      menuList,
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
          <Form.Item label="菜单">
            {getFieldDecorator('menu', {
              initialValue: undefined,
            })(
              <TreeSelect
                treeData={menuList}
                onChange={this.onChange}
                treeCheckable
                showCheckedStrategy={SHOW_PARENT}
                searchPlaceholder="Please select"
                style={{ width: 300 }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
