import { message } from 'antd';
import productManageServices from '../../../../services/productManageService';

export default {
  namespace: 'productManage',
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
    productName: '',
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, productName = '' } = payload;
      const response = yield call(productManageServices.fetchList, { page, pageSize, productName });
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
            productName,
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
      const response = yield call(productManageServices.add, values);
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

    *uploadPic({ payload }, { call, put }) {
      const { pic } = payload;
      const response = yield call(productManageServices.uploadPic, pic);
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
