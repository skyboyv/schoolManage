import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Input, Row, Table } from 'antd';
import moment from 'moment';
import styles from '../../../public/css/index.less';

@connect(({ studentRecord, loading }) => ({
  studentRecord,
  loading: loading.effects['studentRecord/fetchList'],
}))
export default class Index extends PureComponent {
  state = {
    curriculum: '', // 课程
    classes: '', // 班级
    student: '', // 学生
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentRecord/fetchList',
      payload: {},
    });
  }

  clickRow = record => {
    const {
      dispatch,
      studentRecord: { selectedRowKeys },
    } = this.props;
    const keyIndex = selectedRowKeys.findIndex(item => item === record.id);
    if (keyIndex > -1) {
      selectedRowKeys.splice(keyIndex, 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    dispatch({
      type: 'userManage/updateState',
      payload: { selectedRowKeys },
    });
  };

  exportExcel = () => {
    const { curriculum, classes, student } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'studentRecord/exportExcel',
      payload: {
        curriculum,
        classes,
        student,
      },
    });
  };

  searchHandler = () => {
    const { curriculum, classes, student } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'studentRecord/fetchList',
      payload: {
        curriculum,
        classes,
        student,
      },
    });
  };

  curriculumOnChange = value => {
    this.setState({
      curriculum: value,
    });
  };

  classesOnChange = value => {
    this.setState({
      classes: value,
    });
  };

  studentOnChange = value => {
    this.setState({
      student: value,
    });
  };

  printRecord = () => {
    const { curriculum, classes, student } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'studentRecord/printRecord',
      payload: {
        curriculum,
        classes,
        student,
      },
    });
  };

  render() {
    const {
      studentRecord: { page, pageSize, total, list, loading },
    } = this.props;
    const { curriculum, classes, student } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '学生姓名',
        dataIndex: 'studentName',
        key: 'studentName',
      },
      {
        title: '报名课程',
        dataIndex: 'curriculumName',
        key: 'curriculumName',
      },
      {
        title: '班级',
        dataIndex: 'classes',
        key: 'classes',
      },
      {
        title: '报名时间',
        dataIndex: 'time',
        key: 'time',
        render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      },
    ];
    return (
      <div>
        <div className={styles.ListButton}>
          <Row>
            <Col span={6}>
              <Button type="primary" onClick={this.exportExcel.bind(this)}>
                导出Excel
              </Button>
              <Button type="primary" onClick={this.printRecord.bind(this)}>
                打印
              </Button>
            </Col>
            <Col span={18} style={{ textAlign: 'right' }}>
              <Input
                style={{ width: '150px', marginRight: '8px' }}
                defaultValue={curriculum}
                placeholder="请输入课程名称"
                onChange={this.curriculumOnChange.bind(this)}
              />
              <Input
                style={{ width: '150px', marginRight: '8px' }}
                defaultValue={classes}
                placeholder="请输入班级名称"
                onChange={this.classesOnChange.bind(this)}
              />
              <Input
                style={{ width: '150px', marginRight: '8px' }}
                defaultValue={student}
                placeholder="请输入学生名称"
                onChange={this.studentOnChange.bind(this)}
              />
              <Button type="primary" onClick={this.searchHandler.bind(this)}>
                搜索
              </Button>
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
      </div>
    );
  }
}
