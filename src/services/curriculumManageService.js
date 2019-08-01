import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/curriculumManage/fetchList', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  fetchAll() {
    return request('/curriculumManage/fetchAll', {
      method: 'GET',
    });
  },

  fetchTreeData() {
    return request('/curriculumManage/getTreeData', {
      method: 'GET',
    });
  },
};
