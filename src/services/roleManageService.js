import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/roleManage/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  fetchInfo(id) {
    return request(`/roleManage/fetchInfo?id=${id}`, {
      method: 'GET',
    });
  },

  save(data) {
    return request('/roleManage/save', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(data, id) {
    return request(`/roleManage/update?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
