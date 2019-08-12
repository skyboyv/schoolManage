import { message } from 'antd';
import financialRecordService from '../../services/financialRecordService';
import exportToExcel from '@/utils/exportToExcel';

export default {
  namespace: 'financialRecord',
  state: {
    list: [],
    page: 1,
    pageSize: 10,
    total: 0,
    selectedRowKeys: [],
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { page = 1, pageSize = 10, school, startTime, endTime } = payload;
      const param = { page, pageSize, school, startTime, endTime };
      const response = yield call(financialRecordService.fetchList, param);
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

    *exportExcel({ payload }, { call, put }) {
      const { school, startTime, endTime } = payload;
      const response = yield call(financialRecordService.exportExcel, {
        school,
        startTime,
        endTime,
      });
      if (response.status === 200) {
        const fileName = '财务报表.xls';
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
