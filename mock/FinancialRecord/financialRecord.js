const initData = [
  {
    id: 1,
    studentName: '李明',
    paymentProject: '数学',
    money: 150,
    time: '2019-8-12',
    school: 'A区',
  },
  {
    id: 2,
    studentName: '王三',
    paymentProject: '语文',
    money: 150,
    time: '2019-8-12',
    school: 'A区',
  },
  {
    id: 3,
    studentName: '李四',
    paymentProject: '英语',
    money: 150,
    time: '2019-8-12',
    school: 'A区',
  },
  {
    id: 4,
    studentName: '高斯',
    paymentProject: '数学',
    money: 150,
    time: '2019-8-12',
    school: 'A区',
  },
  {
    id: 5,
    studentName: '王健',
    paymentProject: '数学',
    money: 150,
    time: '2019-8-12',
    school: 'A区',
  },
];

export default {
  'POST /financialRecord/fetchList': (req, res) => {
    const page = 1;
    const pageSize = 10;
    // const { page = 1, pageSize = 10, productName } = req.body;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },

  'POST /financialRecord/exportExcel': (req, res) => {
    res.send({
      status: 200,
      data: initData,
    });
  },

  'POST /financialRecord/printRecord': (req, res) => {
    res.send({
      status: 200,
      data: initData,
    });
  },
};
