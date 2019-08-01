const initData = [
  {
    productId: 1,
    productName: '一班',
  },
  {
    productId: 2,
    productName: '二班',
  },
  {
    productId: 3,
    productName: '三班',
  },
  {
    productId: 4,
    productName: '四班',
  },
];

export default {
  'POST /productManage/fetchList': (req, res) => {
    const { page, pageSize, productName } = req.data;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },
};
