import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import moment from 'moment';

@connect(({ covertManage }) => ({
  record: covertManage.record,
  modalVisible: covertManage.modalVisible,
  title: covertManage.title,
  roleList: covertManage.roleList,
}))
@Form.create()
export default class covertInfoModal extends PureComponent {
  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'covertManage/updateState',
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
        const data = values;
        data.covertTime = moment().format('YYYY-MM-DD');
        dispatch({
          type: 'covertManage/save',
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
      productList,
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
            {getFieldDecorator('商品名称', {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: '请选择商品',
                },
              ],
            })(
              <Select placeholder="请选择商品">
                {productList.length > 0 &&
                  productList.map(item => {
                    return <Select.Option key={item.productId}>{item.productName}</Select.Option>;
                  })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="商品单价">
            {getFieldDecorator('price', {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: '请输入商品单价',
                },
              ],
            })(<InputNumber step={0.01} min={0} />)}
          </Form.Item>
          <Form.Item label="兑换数量">
            {getFieldDecorator('covertNumber', {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: '请输入兑换数量',
                },
              ],
            })(<InputNumber step={1} min={0} />)}
          </Form.Item>
          <Form.Item label="兑换地点">
            {getFieldDecorator('covertAddr', {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: '请输入兑换地点',
                },
                {
                  max: 30,
                  message: '最大长度30',
                },
              ],
            })(<Input placeholder="请输入兑换地点" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
