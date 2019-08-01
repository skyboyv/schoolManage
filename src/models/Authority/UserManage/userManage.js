import { message } from 'antd/lib/index';
import userService from '../../../services/userManageService';
import roleManageService from '../../../services/roleManageService';

export default {
  namespace: 'userManage',
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
    roleList: [],
    // 检索条件
    userName: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, userName = '' } = payload;
      const response = yield call(userService.fetchList, { page, pageSize, userName });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            userName,
          },
        });
      }
    },

    *openModal({ payload }, { call, put }) {
      const { record, title } = payload;
      const { data: roleList } = yield call(roleManageService.fetchAll);
      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          record,
          title,
          roleList,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(userService.add, values);
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
