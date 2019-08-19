import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/studentContent/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  fetchInfo(id) {
    return request(`/studentContent/fetchInfo?id=${id}`, {
      method: 'GET',
    });
  },

  save(data) {
    return request('/studentContent/save', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(data, id) {
    return request(`/studentContent/update?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
