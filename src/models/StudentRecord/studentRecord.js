import { message } from 'antd';
import studentRecordService from '../../services/studentRecordService';
import exportToExcel from '@/utils/exportToExcel';

export default {
  namespace: 'studentRecord',
  state: {
    list: [],
    page: 1,
    pageSize: 10,
    total: 0,
    selectedRowKeys: [],
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, curriculum, classes, student } = payload;
      const param = { page, pageSize, curriculum, classes, student };
      const response = yield call(studentRecordService.fetchList, param);
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.data,
            total: response.total,
            page,
            pageSize,
          },
        });
      }
    },

    *exportExcel({ payload }, { call }) {
      const { curriculum, classes, student } = payload;
      const response = yield call(studentRecordService.exportExcel, {
        curriculum,
        classes,
        student,
      });
      if (response.status === 200) {
        const fileName = '报名记录.xls';
        exportToExcel(response.data, fileName);
        message.success('导出成功');
      }
    },

    *printRecord({ payload }, { call }) {
      const { curriculum, classes, student } = payload;
      const response = yield call(studentRecordService.printRecord, {
        curriculum,
        classes,
        student,
      });
      if (response.status === 200) {
        const fileName = '报名记录.xls';
        exportToExcel(response.data, fileName);
        message.success('导出成功');
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
