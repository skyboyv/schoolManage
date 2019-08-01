import { message } from 'antd';
import classManageServices from '../../../services/classManageService';
import curriculumManageService from '../../../services/curriculumManageService';

export default {
  namespace: 'classManage',
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
    curriculumList: [],
    // 检索条件
    className: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, className = '' } = payload;
      const response = yield call(classManageServices.fetchList, { page, pageSize, className });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            className,
          },
        });
      }
    },

    *openModal({ payload }, { call, put }) {
      const { record, title } = payload;
      const { data: curriculumList } = yield call(curriculumManageService.fetchAll);

      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          record,
          title,
          curriculumList,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(classManageServices.add, values);
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
