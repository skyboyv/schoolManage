import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/userManage/fetchList', {
      method: 'POST',
      data,
    });
  },
};
