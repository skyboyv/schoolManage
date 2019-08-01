import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Col, Row, Popconfirm } from 'antd';
import styles from '../../../../public/css/index.less';
import CurriculumModal from './Modal/CurriculumModal';

const { Search } = Input;
// 课程管理
@connect(({ curriculumManage, loading }) => ({
  curriculumManage,
  loading: loading.effects['curriculumManage/fetchList'],
}))
export default class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'curriculumManage/fetchList',
      payload: {},
    });
  }

  handlePageOnChange = current => {
    const {
      dispatch,
      curriculumManage: { pageSize },
    } = this.props;
    dispatch({
      type: 'curriculumManage/fetchList',
      payload: { page: current, pageSize },
    });
  };

  handlePageOnShowSizeChange = (current, newSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'curriculumManage/fetchList',
      payload: { page: current, pageSize: newSize },
    });
  };

  searchHandler = value => {
    const { dispatch } = this.props;

    dispatch({
      type: 'curriculumManage/fetchList',
      payload: {
        userName: value,
      },
    });
  };

  deleteByIds = ids => {
    const {
      dispatch,
      curriculumManage: { selectedRowKeys },
    } = this.props;
    dispatch({
      type: 'curriculumManage/deleteByIds',
      payload: { ids: ids || selectedRowKeys },
    });
  };

  clickRow = record => {
    const {
      dispatch,
      curriculumManage: { selectedRowKeys, selectedRow },
    } = this.props;
    const keyIndex = selectedRowKeys.findIndex(item => item === record.curriculumId);
    const rowIndex = selectedRow.findIndex(item => item.curriculumId === record.curriculumId);
    if (keyIndex > -1) {
      selectedRowKeys.splice(keyIndex, 1);
      selectedRow.splice(rowIndex, 1);
    } else {
      selectedRowKeys.push(record.curriculumId);
      selectedRow.push(record);
    }
    dispatch({
      type: 'curriculumManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  onSelectChange = (selectedRowKeys, selectedRow) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'curriculumManage/updateState',
      payload: { selectedRowKeys, selectedRow },
    });
  };

  openModal = (record, title) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'curriculumManage/openModal',
      payload: {
        record,
        title,
      },
    });
  };

  render() {
    const {
      curriculumManage: { list, total, page, pageSize, selectedRowKeys, selectedRow, modalVisible },
      loading,
    } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'curriculumId',
        key: 'curriculumId',
      },
      {
        title: '课程名称',
        dataIndex: 'curriculumName',
        key: 'curriculumName',
        render: text => {
          return <span className={styles.codeStyle}>{text}</span>;
        },
      },
      {
        title: '所属科目',
        dataIndex: 'curriculumName',
        key: 'curriculumName',
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
            <a className={styles.btnStyle} onClick={this.openModal.bind(this, record, '修改课程')}>
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
                onClick={this.openModal.bind(this, undefined, '新增课程')}
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
              <Search onSearch={this.searchHandler} placeholder="请输入课程名称" />
            </Col>
          </Row>
        </div>
        <Table
          bordered
          className="whiteSpaceNormalTable"
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey={record => record.curriculumId}
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

        {modalVisible && <CurriculumModal />}
      </div>
    );
  }
}
