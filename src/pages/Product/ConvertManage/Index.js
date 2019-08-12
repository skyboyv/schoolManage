import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Col, Row, Popconfirm } from 'antd';
import moment from 'moment';
import styles from '../../../../public/css/index.less';
import CovertInfoModal from './Modal/CovertInfoModal';

const { Search } = Input;

@connect(({ covertManage, loading }) => ({
  covertManage,
  loading: loading.effects['covertManage/fetchList'],
}))
export default class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'covertManage/fetchList',
      payload: {},
    });
  }

  handlePageOnChange = current => {
    const {
      dispatch,
      covertManage: { pageSize },
    } = this.props;
    dispatch({
      type: 'covertManage/fetchList',
      payload: { page: current, pageSize },
    });
  };

  handlePageOnShowSizeChange = (current, newSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'covertManage/fetchList',
      payload: { page: current, pageSize: newSize },
    });
  };

  searchHandler = value => {
    const { dispatch } = this.props;

    dispatch({
      type: 'covertManage/fetchList',
      payload: {
        covertName: value,
      },
    });
  };

  deleteByIds = ids => {
    const {
      dispatch,
      covertManage: { selectedRowKeys },
    } = this.props;
    dispatch({
      type: 'covertManage/deleteByIds',
      payload: { ids: ids || selectedRowKeys },
    });
  };

  clickRow = record => {
    const {
      dispatch,
      covertManage: { selectedRowKeys },
    } = this.props;
    const keyIndex = selectedRowKeys.findIndex(item => item === record.id);
    if (keyIndex > -1) {
      selectedRowKeys.splice(keyIndex, 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    dispatch({
      type: 'covertManage/updateState',
      payload: { selectedRowKeys },
    });
  };

  onSelectChange = (selectedRowKeys, selectedRow) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'covertManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  openModal = (record, title) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'covertManage/openModal',
      payload: {
        record,
        title,
      },
    });
  };

  render() {
    const {
      covertManage: { list, total, page, pageSize, selectedRowKeys, modalVisible },
      loading,
    } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        render: text => {
          return <span className={styles.codeStyle}>{text}</span>;
        },
      },
      {
        title: '兑换数量',
        dataIndex: 'convertNumber',
        key: 'convertNumber',
        render: text => {
          return <span className={styles.codeStyle}>{text}</span>;
        },
      },
      {
        title: '商品单价',
        dataIndex: 'price',
        key: 'price',
        render: text => {
          return <span className={styles.codeStyle}>{text}</span>;
        },
      },
      {
        title: '兑换时间',
        dataIndex: 'covertTime',
        key: 'covertTime',
        render: text => {
          return <span className={styles.codeStyle}>{moment(text).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        title: '兑换地点',
        dataIndex: 'covertAddr',
        key: 'covertAddr',
        render: text => {
          return <span className={styles.codeStyle}>{text}</span>;
        },
      },
      {
        title: '操作',
        dataIndex: 'Action',
        key: 'operation',
        render: (text, record) => {
          return [
            <Popconfirm
              title="你确定要删除吗?"
              onConfirm={() => this.deleteByIds.bind(null, [record.id])}
            >
              <a className={styles.btnStyle}>删除</a>
            </Popconfirm>,
          ];
        },
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div className={styles.ListButton}>
          <Row>
            <Col span={16}>
              <Button
                className={styles.btnStyle}
                type="primary"
                onClick={this.openModal.bind(this, undefined, '兑换商品')}
              >
                兑换商品
              </Button>
              {selectedRowKeys.length !== 0 && (
                <Popconfirm title="请确认是否删除" onConfirm={this.deleteByIds}>
                  <Button className={styles.btnStyle} type="primary">
                    批量删除
                  </Button>
                </Popconfirm>
              )}
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Search onSearch={this.searchHandler} placeholder="请输入商品名称" />
            </Col>
          </Row>
        </div>
        <Table
          bordered
          className="whiteSpaceNormalTable"
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          onRow={record => {
            // 表格行点击事件
            return {
              onClick: this.clickRow.bind(this, record),
            };
          }}
          pagination={{
            total,
            current: page,
            pageSize,
            onChange: this.handlePageOnChange,
            onShowSizeChange: this.handlePageOnShowSizeChange,
            showTotal: _total => `总计${_total || 0}条`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />

        {modalVisible && <CovertInfoModal />}
      </div>
    );
  }
}
