import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/subjectManage/fetchList', {
      method: 'POST',
      data: { ...data },
    });
  },

  fetchAll() {
    return request('/subjectManage/fetchAll', {
      method: 'GET',
    });
  },

  fetchTreeData() {
    return request('/subjectManage/getTreeData', {
      method: 'GET',
    });
  },
};
