import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/roleManage/fetchList', {
      method: 'POST',
      data: { ...data },
    });
  },

  fetchAll() {
    return request('/roleManage/fetchAll', {
      method: 'GET',
    });
  },

  fetchTreeData() {
    return request('/roleManage/getTreeData', {
      method: 'GET',
    });
  },
};
