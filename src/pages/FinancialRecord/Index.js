import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

export default class Index extends PureComponent {
  render() {
    return (
      <div>
        <Table></Table>
      </div>
    );
  }
}
