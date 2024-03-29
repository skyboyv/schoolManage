import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Input, Popconfirm, Row, DatePicker, Table } from 'antd';
import moment from 'moment';
import styles from '../../../public/css/index.less';

const { RangePicker } = DatePicker;
@connect(({ financialRecord, loading }) => ({
  financialRecord,
  loading: loading.effects['financialRecord/fetchList'],
}))
export default class Index extends PureComponent {
  state = {
    school: '',
    startTime: moment().startOf('month'),
    endTime: moment().endOf('month'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financialRecord/fetchList',
      payload: {},
    });
  }

  clickRow = record => {
    const {
      dispatch,
      financialRecord: { selectedRowKeys },
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
    const { school, startTime, endTime } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'financialRecord/exportExcel',
      payload: {
        school,
        startTime,
        endTime,
      },
    });
  };

  searchHandler = () => {
    const { school, startTime, endTime } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'financialRecord/fetchList',
      payload: {
        school,
        startTime,
        endTime,
      },
    });
  };

  pickerOnChange = (value, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1],
    });
  };

  schoolOnChange = value => {
    this.setState({
      school: value,
    });
  };

  render() {
    const {
      financialRecord: { page, pageSize, total, list, loading },
    } = this.props;
    const { school, startTime, endTime } = this.state;
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
        title: '缴费项目',
        dataIndex: 'paymentProject',
        key: 'paymentProject',
      },
      {
        title: '缴费金额',
        dataIndex: 'money',
        key: 'money',
      },
      {
        title: '缴费时间',
        dataIndex: 'time',
        key: 'time',
        render: text => (text ? moment(text, 'YYYY-MM-DD') : ''),
      },
      {
        title: '所在校区',
        dataIndex: 'school',
        key: 'school',
      },
    ];
    return (
      <div>
        <div className={styles.ListButton}>
          <Row>
            <Col span={8}>
              <Button
                style={{ paddingRight: 8 }}
                type="primary"
                onClick={this.exportExcel.bind(this)}
              >
                导出Excel
              </Button>
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
              <Input
                style={{ width: '300px', marginRight: 8 }}
                defaultValue={school}
                placeholder="请输入校区名称"
                onChange={this.schoolOnChange.bind(this)}
              />
              <RangePicker
                style={{ width: '300px', marginRight: 8 }}
                onChange={this.pickerOnChange.bind(this)}
                placeholder={['请输入开始时间', '请输入结束时间']}
                defaultValue={[startTime, endTime]}
                format="YYYY-MM-DD"
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
