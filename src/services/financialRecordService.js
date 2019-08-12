import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/financialRecord/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  exportExcel(data) {
    return request('/financialRecord/exportExcel', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
