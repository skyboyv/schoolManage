import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Input, Col, Row, Card, List, Table } from 'antd';
import styles from '../../../../public/css/index.less';
import ProductModal from './Modal/ProductModal';

const { Search } = Input;

@connect(({ productManage, loading }) => ({
  productManage,
  loading: loading.effects['productManage/fetchList'],
}))
export default class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productManage/fetchList',
      payload: {},
    });
  }

  handlePageOnChange = current => {
    const {
      dispatch,
      productManage: { pageSize },
    } = this.props;
    dispatch({
      type: 'productManage/fetchList',
      payload: { page: current, pageSize },
    });
  };

  handlePageOnShowSizeChange = (current, newSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productManage/fetchList',
      payload: { page: current, pageSize: newSize },
    });
  };

  searchHandler = value => {
    const { dispatch } = this.props;

    dispatch({
      type: 'productManage/fetchList',
      payload: {
        userName: value,
      },
    });
  };

  deleteByIds = ids => {
    const {
      dispatch,
      productManage: { selectedRowKeys },
    } = this.props;
    dispatch({
      type: 'productManage/deleteByIds',
      payload: { ids: ids || selectedRowKeys },
    });
  };

  clickRow = record => {
    const {
      dispatch,
      productManage: { selectedRowKeys, selectedRow },
    } = this.props;
    const keyIndex = selectedRowKeys.findIndex(item => item === record.productId);
    const rowIndex = selectedRow.findIndex(item => item.productId === record.productId);
    if (keyIndex > -1) {
      selectedRowKeys.splice(keyIndex, 1);
      selectedRow.splice(rowIndex, 1);
    } else {
      selectedRowKeys.push(record.productId);
      selectedRow.push(record);
    }
    dispatch({
      type: 'productManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  onSelectChange = (selectedRowKeys, selectedRow) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  openModal = (record, title) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productManage/openModal',
      payload: {
        record,
        title,
      },
    });
  };

  render() {
    const {
      productManage: { list, selectedRow, modalVisible },
      loading,
    } = this.props;

    return (
      <div>
        <div className={styles.ListButton}>
          <Row>
            <Col span={16}>
              <Button
                className={styles.btnStyle}
                type="primary"
                onClick={this.openModal.bind(this, undefined, '新增班级')}
              >
                新增
              </Button>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Search onSearch={this.searchHandler} placeholder="请输入班级名称" />
            </Col>
          </Row>
        </div>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 2, md: 2, sm: 1, xs: 1 }}
            dataSource={[...list]}
            renderItem={
              list.length === 0 ? (
                <Table dataSource={[]} />
              ) : (
                item => {
                  return (
                    <List.Item key={item.productId}>
                      <Card
                        hoverable
                        className={styles.card}
                        actions={[<a key="option1">编辑</a>, <a key="option2">删除</a>]}
                      >
                        <Card.Meta
                          avatar={
                            <img
                              alt=""
                              className={styles.cardAvatar}
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                          }
                          title={`${item.productName} 上课时间:9:00 - 18:00`}
                          description={
                            <div>
                              <Row gutter={24}>
                                <Col span={12}>
                                  <span>课程名称: {`高数,语文,英语,化学`}</span>
                                </Col>
                                <Col span={12}>
                                  <span>所属校区: {`重庆大学A区`}</span>
                                </Col>
                              </Row>
                              <Row gutter={24}>
                                <Col span={12}>
                                  <span>授课教师: {`高小明,彭永淳`}</span>
                                </Col>
                                <Col span={12}>
                                  <span>收费: {`998元`}</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={24}>适应年龄段: 20岁 - 25岁</Col>
                              </Row>
                              <Row gutter={24}>
                                <Col span={24}>
                                  <span>
                                    班级特征:{' '}
                                    {`在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽`}
                                  </span>
                                </Col>
                              </Row>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  );
                }
              )
            }
          />
        </div>

        {modalVisible && <ProductModal />}
      </div>
    );
  }
}
