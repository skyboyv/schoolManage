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
      productManage: { list, modalVisible },
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
                onClick={this.openModal.bind(this, undefined, '新增商品')}
              >
                新增
              </Button>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Search onSearch={this.searchHandler} placeholder="请输入商品名称" />
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
                        bodyStyle={{ height: '180px' }}
                        actions={[<a key="option1">编辑</a>, <a key="option2">删除</a>]}
                      >
                        <Card.Meta
                          avatar={
                            <img
                              style={{ width: '100px', height: '100px' }}
                              alt=""
                              className={styles.cardAvatar}
                              src={item.imgSrc}
                            />
                          }
                          title={`${item.productName}`}
                          description={
                            <div>
                              <Row gutter={24}>
                                <Col span={12}>
                                  <span>商品名称: {`${item.productName}`}</span>
                                </Col>
                                <Col span={12}>
                                  <span>商品数量: {`${item.number}`}</span>
                                </Col>
                              </Row>
                              <Row gutter={24}>
                                <Col span={12}>
                                  <span>商品价格: {`${item.price}`}</span>
                                </Col>
                                <Col span={12}>
                                  <span>兑换地点: {`${item.convertAddr}`}</span>
                                </Col>
                              </Row>
                              <Row gutter={24}>
                                <Col span={24}>
                                  <span>商品介绍:{`${item.desc}`}</span>
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
