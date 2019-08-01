import request from '../utils/request';

export default {
  fetchList(data) {
    return request('/campusManage/fetchList', {
      method: 'POST',
      data: { ...data },
    });
  },

  fetchAll() {
    return request('/campusManage/fetchAll', {
      method: 'GET',
    });
  },

  fetchTreeData() {
    return request('/campusManage/getTreeData', {
      method: 'GET',
    });
  },
};
