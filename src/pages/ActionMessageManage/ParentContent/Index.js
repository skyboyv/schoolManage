import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, List, Row } from 'antd';
import styles from '../../../../public/css/index.less';
import ContentModal from './Modal/ContentModal';

const { Meta } = Card;

@connect(({ parentContent, loading }) => ({
  parentContent,
  loading: loading.effects['parentContent/fetchList'],
}))
export default class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'parentContent/fetchList',
      payload: {},
    });
  }

  handlePageOnChange = current => {
    const {
      dispatch,
      classManage: { pageSize },
    } = this.props;
    dispatch({
      type: 'parentContent/fetchList',
      payload: { page: current, pageSize },
    });
  };

  handlePageOnShowSizeChange = (current, newSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'parentContent/fetchList',
      payload: { page: current, pageSize: newSize },
    });
  };

  openModal = (title, id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'parentContent/openModal',
      payload: {
        id,
        title,
      },
    });
  };

  render() {
    const {
      parentContent: { page, pageSize, total, list, loading, modalVisible },
    } = this.props;

    return (
      <div>
        <div className={styles.ListButton}>
          <Row>
            <Col span={6}>
              <Button type="primary" onClick={this.openModal.bind(this, '新建图文信息', undefined)}>
                新建
              </Button>
            </Col>
          </Row>
        </div>
        <List
          grid={{ column: 4, gutter: 24 }}
          loading={loading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                style={{ width: 240 }}
                actions={[
                  <a onClick={this.openModal.bind(this, '编辑图文信息', undefined)}>编辑</a>,
                  <a>发布</a>,
                  <a>删除</a>,
                ]}
                cover={<img alt="example" src={item.cover} />}
              >
                <Meta title={item.title} />
              </Card>
            </List.Item>
          )}
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
        {modalVisible && <ContentModal />}
      </div>
    );
  }
}
