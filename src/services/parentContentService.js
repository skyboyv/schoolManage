import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/parentContent/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  fetchInfo(id) {
    return request(`/parentContent/fetchInfo?id=${id}`, {
      method: 'GET',
    });
  },

  save(data) {
    return request('/parentContent/save', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(data, id) {
    return request(`/parentContent/update?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
