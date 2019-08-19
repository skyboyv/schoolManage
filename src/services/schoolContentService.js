import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/schoolContent/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  fetchInfo(id) {
    return request(`/schoolContent/fetchInfo?id=${id}`, {
      method: 'GET',
    });
  },

  save(data) {
    return request('/schoolContent/save', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(data, id) {
    return request(`/schoolContent/update?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
