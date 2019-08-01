import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Modal, Select, TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

// 课程管理
@connect(({ curriculumManage }) => ({
  record: curriculumManage.record,
  modalVisible: curriculumManage.modalVisible,
  title: curriculumManage.title,
  menuList: curriculumManage.menuList,
}))
@Form.create()
export default class CurriculumModal extends PureComponent {
  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'curriculumManage/updateState',
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
          type: 'curriculumManage/save',
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
      subjectList,
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
            {getFieldDecorator('subjectId', {
              initialValue: record && record.subjectId,
            })(
              <Select>
                {subjectList &&
                  subjectList.map(item => {
                    return <Select.Option key={item.subjectId}>{item.subjectName}</Select.Option>;
                  })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="课程名称">
            {getFieldDecorator('curriculumName', {
              initialValue: record && record.curriculumName,
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
