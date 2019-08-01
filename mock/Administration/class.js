const initData = [
  {
    classId: 1,
    className: '一班',
  },
  {
    classId: 2,
    className: '二班',
  },
  {
    classId: 3,
    className: '三班',
  },
  {
    classId: 4,
    className: '四班',
  },
];

export default {
  'POST /classManage/fetchList': (req, res) => {
    const { page, pageSize, className } = req.data;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },
};
