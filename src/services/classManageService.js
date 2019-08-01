import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/classManage/fetchList', {
      method: 'POST',
      data: { ...data },
    });
  },

  fetchAll() {
    return request('/classManage/fetchAll', {
      method: 'GET',
    });
  },

  fetchTreeData() {
    return request('/classManage/getTreeData', {
      method: 'GET',
    });
  },
};
