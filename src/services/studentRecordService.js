import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/studentRecord/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  exportExcel(data) {
    return request('/studentRecord/exportExcel', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  printRecord(data) {
    return request('/studentRecord/printRecord', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
