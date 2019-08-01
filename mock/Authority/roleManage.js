import Result from '../result';

const initData = [
  {
    roleId: 1,
    roleName: '系统管理员',
  },
  {
    roleId: 2,
    roleName: '管理员',
  },
  {
    roleId: 3,
    roleName: '教师',
  },
  {
    roleId: 4,
    roleName: '家长',
  },
  {
    roleId: 5,
    roleName: '学生',
  },
  {
    roleId: 6,
    roleName: '其他',
  },
];
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default {
  'POST /roleManage/fetchList': (req, res) => {
    const { page, pageSize } = req.data;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },

  'GET /roleManage/fetchAll': (req, res) => {
    res.send({ status: 200, data: initData, total: initData.length });
  },

  'GET /roleManage/getTreeData': (req, res) => {
    res.send({ status: 200, data: treeData, total: initData.length });
  },
};
