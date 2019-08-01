const initData = [
  {
    subjectId: 1,
    subjectName: 'admin',
  },
  {
    subjectId: 2,
    subjectName: 'curriculum',
  },
];
export default {
  'POST /subjectManage/fetchList': (req, res) => {
    const { page, pageSize, subjectName } = req.data;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },
};
