import { message } from 'antd';
import curriculumManageServices from '../../../services/curriculumManageService';
import subjectManageServices from '../../../services/subjectManageServices';

export default {
  namespace: 'curriculumManage',
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
    subjectList: [],
    // 检索条件
    curriculumName: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, curriculumName = '' } = payload;
      const response = yield call(curriculumManageServices.fetchList, {
        page,
        pageSize,
        curriculumName,
      });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            curriculumName,
          },
        });
      }
    },

    *openModal({ payload }, { call, put }) {
      const { record, title } = payload;
      const { data: subjectList } = yield call(subjectManageServices.fetchAll);

      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          record,
          title,
          subjectList,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(curriculumManageServices.add, values);
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
