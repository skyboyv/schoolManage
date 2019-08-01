import Result from '../result';

const initData = [
  {
    id: 1,
    name: 'admin',
    roleName: '超级管理员',
    userName: 'admin',
    password: '123456',
  },
  {
    id: 2,
    name: 'user',
    roleName: '管理员',
    userName: 'user',
    password: '123456',
  },
];

export default {
  'POST /userManage/fetchList': (req, res) => {
    console.log(req);
    const page = 1;
    const pageSize = 10;
    // const { page = 1, pageSize = 10, userName } = req.data;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },
};
