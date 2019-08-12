import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/covertManage/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
