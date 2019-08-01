import { message } from 'antd';
import campusManageServices from '../../../services/campusManageService';

export default {
  namespace: 'campusManage',
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
    menuList: [],
    // 检索条件
    campusName: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, campusName = '' } = payload;
      const response = yield call(campusManageServices.fetchList, { page, pageSize, campusName });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            campusName,
          },
        });
      }
    },

    *openModal({ payload }, { call, put }) {
      const { record, title } = payload;
      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          record,
          title,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(campusManageServices.add, values);
      if (response.status === 200) {
        message.success('新增成功');
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
