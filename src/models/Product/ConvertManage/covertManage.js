import { message } from 'antd/lib/index';
import covertService from '../../../services/covertManageService';
import productManageService from '../../../services/productManageService';

export default {
  namespace: 'covertManage',
  state: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 10,
    selectedRowKeys: [],
    selectedRow: [],
    // 模态框state
    modalVisible: false,
    record: undefined,
    title: '',
    productList: [],
    // 检索条件
    covertName: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, covertName = '' } = payload;
      const response = yield call(covertService.fetchList, { page, pageSize, covertName });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            covertName,
          },
        });
      }
    },

    *openModal({ payload }, { call, put }) {
      const { record, title } = payload;
      const { data: productList } = yield call(productManageService.fetchAll);
      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          record,
          title,
          productList,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(covertService.add, values);
      if (response.status === 200) {
        message.success('兑换成功');
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false,
          },
        });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
