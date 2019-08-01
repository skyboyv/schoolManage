import { message } from 'antd';
import roleManageServices from '../../../services/roleManageService';

export default {
  namespace: 'roleManage',
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
    roleName: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, roleName = '' } = payload;
      const response = yield call(roleManageServices.fetchList, { page, pageSize, roleName });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            roleName,
          },
        });
      }
    },

    *openModal({ payload }, { call, put }) {
      const { record, title } = payload;
      const { data: menuList } = yield call(roleManageServices.fetchTreeData);

      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          record,
          title,
          menuList,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(roleManageServices.add, values);
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
