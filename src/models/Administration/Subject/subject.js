import { message } from 'antd';
import subjectManageServices from '../../../services/subjectManageServices';
import campusManageService from '../../../services/campusManageService';

export default {
  namespace: 'subjectManage',
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
    campusList: [],
    // 检索条件
    subjectName: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, subjectName = '' } = payload;
      const response = yield call(subjectManageServices.fetchList, { page, pageSize, subjectName });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            subjectName,
          },
        });
      }
    },

    *openModal({ payload }, { call, put }) {
      const { record, title } = payload;
      const { data: campusList } = yield call(campusManageService.fetchAll);

      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          record,
          title,
          campusList,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(subjectManageServices.add, values);
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
