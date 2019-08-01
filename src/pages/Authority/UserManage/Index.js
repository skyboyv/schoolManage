import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Col, Row, Popconfirm } from 'antd';
import styles from '../../../../public/css/index.less';
import UserInfoModal from './Modal/UserInfoModal';

const { Search } = Input;

@connect(({ userManage, loading }) => ({
  userManage,
  loading: loading.effects['userManage/fetchList'],
}))
export default class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/fetchList',
      payload: {},
    });
  }

  handlePageOnChange = current => {
    const {
      dispatch,
      userManage: { pageSize },
    } = this.props;
    dispatch({
      type: 'userManage/fetchList',
      payload: { page: current, pageSize },
    });
  };

  handlePageOnShowSizeChange = (current, newSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/fetchList',
      payload: { page: current, pageSize: newSize },
    });
  };

  searchHandler = value => {
    const { dispatch } = this.props;

    dispatch({
      type: 'userManage/fetchList',
      payload: {
        userName: value,
      },
    });
  };

  deleteByIds = ids => {
    const {
      dispatch,
      userManage: { selectedRowKeys },
    } = this.props;
    dispatch({
      type: 'userManage/deleteByIds',
      payload: { ids: ids || selectedRowKeys },
    });
  };

  clickRow = record => {
    const {
      dispatch,
      userManage: { selectedRowKeys, selectedRow },
    } = this.props;
    const keyIndex = selectedRowKeys.findIndex(item => item === record.id);
    const rowIndex = selectedRow.findIndex(item => item.id === record.id);
    if (keyIndex > -1) {
      selectedRowKeys.splice(keyIndex, 1);
      selectedRow.splice(rowIndex, 1);
    } else {
      selectedRowKeys.push(record.id);
      selectedRow.push(record);
    }
    dispatch({
      type: 'userManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  onSelectChange = (selectedRowKeys, selectedRow) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  openModal = (record, title) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/openModal',
      payload: {
        record,
        title,
      },
    });
  };

  render() {
    const {
      userManage: { list, total, page, pageSize, selectedRowKeys, selectedRow, modalVisible },
      loading,
    } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
        render: text => {
          return <span className={styles.codeStyle}>{text}</span>;
        },
      },
      {
        title: '用户账号',
        dataIndex: 'userName',
        key: 'userName',
        render: text => {
          return <span className={styles.codeStyle}>{text}</span>;
        },
      },
      {
        title: '用户角色',
        dataIndex: 'roleName',
        key: 'roleName',
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
            <a className={styles.btnStyle} onClick={this.openModal.bind(this, record, '编辑用户')}>
              编辑
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
                onClick={this.openModal.bind(this, undefined, '新增用户')}
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
              <Search onSearch={this.searchHandler} placeholder="请输入用户名称" />
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

        {modalVisible && <UserInfoModal />}
      </div>
    );
  }
}
