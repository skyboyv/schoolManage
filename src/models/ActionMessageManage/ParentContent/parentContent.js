import { message } from 'antd';
import parentContentService from '../../../services/parentContentService';

export default {
  namespace: 'parentContent',
  state: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 10,
    selectedRowKeys: [],
    selectedRow: [],
    // 模态框state
    modalVisible: false,
    record: {
      title: '',
      imageUrl: '',
      content: '',
    },
    editorState: undefined,
    title: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, userName = '' } = payload;
      const response = yield call(parentContentService.fetchList, { page, pageSize, userName });
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
      const { id, title } = payload;
      // const { data: record } = yield call(parentContentService.fetchInfo, id);
      yield put({
        type: 'updateState',
        payload: {
          modalVisible: true,
          title,
        },
      });
    },

    *save({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(parentContentService.save, values);
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

    *update({ payload }, { call, put }) {
      const { values } = payload;
      const response = yield call(parentContentService.update, values);
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
