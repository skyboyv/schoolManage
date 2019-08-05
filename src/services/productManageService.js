import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/productManage/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  fetchAll() {
    return request('/productManage/fetchAll', {
      method: 'GET',
    });
  },

  fetchTreeData() {
    return request('/productManage/getTreeData', {
      method: 'GET',
    });
  },

  uploadPic(file) {
    return request('/productManage/uploadPic', {
      method: 'POST',
      body: JSON.stringify(file),
    });
  },
};
