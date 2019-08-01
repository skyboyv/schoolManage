import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Col, Row, Popconfirm } from 'antd';
import styles from '../../../../public/css/index.less';
import CampusModal from './Modal/CampusModal';

const { Search } = Input;

// 校区管理
@connect(({ campusManage, loading }) => ({
  campusManage,
  loading: loading.effects['campusManage/fetchList'],
}))
export default class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'campusManage/fetchList',
      payload: {},
    });
  }

  handlePageOnChange = current => {
    const {
      dispatch,
      campusManage: { pageSize },
    } = this.props;
    dispatch({
      type: 'campusManage/fetchList',
      payload: { page: current, pageSize },
    });
  };

  handlePageOnShowSizeChange = (current, newSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'campusManage/fetchList',
      payload: { page: current, pageSize: newSize },
    });
  };

  searchHandler = value => {
    const { dispatch } = this.props;

    dispatch({
      type: 'campusManage/fetchList',
      payload: {
        userName: value,
      },
    });
  };

  deleteByIds = ids => {
    const {
      dispatch,
      campusManage: { selectedRowKeys },
    } = this.props;
    dispatch({
      type: 'campusManage/deleteByIds',
      payload: { ids: ids || selectedRowKeys },
    });
  };

  clickRow = record => {
    const {
      dispatch,
      campusManage: { selectedRowKeys, selectedRow },
    } = this.props;
    const keyIndex = selectedRowKeys.findIndex(item => item === record.campusId);
    const rowIndex = selectedRow.findIndex(item => item.campusId === record.campusId);
    if (keyIndex > -1) {
      selectedRowKeys.splice(keyIndex, 1);
      selectedRow.splice(rowIndex, 1);
    } else {
      selectedRowKeys.push(record.campusId);
      selectedRow.push(record);
    }
    dispatch({
      type: 'campusManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  onSelectChange = (selectedRowKeys, selectedRow) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'campusManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  openModal = (record, title) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'campusManage/openModal',
      payload: {
        record,
        title,
      },
    });
  };

  permission = id => {
    const { dispatch } = this.props;
  };

  render() {
    const {
      campusManage: { list, total, page, pageSize, selectedRowKeys, selectedRow, modalVisible },
      loading,
    } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'campusId',
        key: 'campusId',
      },
      {
        title: '校区名称',
        dataIndex: 'campusName',
        key: 'campusName',
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
            <a className={styles.btnStyle} onClick={this.openModal.bind(this, record, '修改校区')}>
              修改
            </a>,
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
                onClick={this.openModal.bind(this, undefined, '新增校区')}
              >
                新增
              </Button>
              {selectedRow.length !== 0 && (
                <Popconfirm title="请确认是否删除" onConfirm={this.deleteByIds}>
                  <Button className={styles.btnStyle} type="primary">
                    批量删除
                  </Button>
                </Popconfirm>
              )}
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Search onSearch={this.searchHandler} placeholder="请输入校区名称" />
            </Col>
          </Row>
        </div>
        <Table
          bordered
          className="whiteSpaceNormalTable"
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey={record => record.campusId}
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

        {modalVisible && <CampusModal />}
      </div>
    );
  }
}
