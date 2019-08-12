const initData = [
  {
    id: 1,
    productName: '草莓',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 2,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 3,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 4,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 5,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 6,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 7,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 8,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 9,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 10,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
  {
    id: 11,
    productName: '菠萝',
    convertNumber: 20,
    price: 30,
    covertTime: '2019-08-05',
    covertAddr: '重庆渝北区幸福华庭B栋1-3',
  },
];

export default {
  'POST /covertManage/fetchList': (req, res) => {
    const { page = 1, pageSize = 10 } = req.body;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },
};
