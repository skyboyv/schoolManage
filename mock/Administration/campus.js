const initData = [
  {
    campusId: 1,
    campusName: 'A区',
  },
  {
    campusId: 2,
    campusName: 'B区',
  },
  {
    campusId: 3,
    campusName: 'C区',
  },
  {
    campusId: 4,
    campusName: 'D区',
  },
];

export default {
  'POST /campusManage/fetchList': (req, res) => {
    const { page, pageSize, campusName } = req.data;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },
};
