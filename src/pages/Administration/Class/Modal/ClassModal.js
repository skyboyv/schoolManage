import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Modal, Select, TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

@connect(({ classManage }) => ({
  record: classManage.record,
  modalVisible: classManage.modalVisible,
  title: classManage.title,
  menuList: classManage.menuList,
}))
@Form.create()
export default class ClassModal extends PureComponent {
  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'classManage/updateState',
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
          type: 'classManage/save',
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
      curriculumList,
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
          <Form.Item label="课程名称">
            {getFieldDecorator('className', {
              initialValue: record && record.className,
            })(
              <Select mode="multiple">
                {curriculumList &&
                  curriculumList.map(item => {
                    return (
                      <Select.Option key={item.curriculumId}>{item.curriculumName}</Select.Option>
                    );
                  })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="班级名称">
            {getFieldDecorator('className', {
              initialValue: record && record.className,
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
