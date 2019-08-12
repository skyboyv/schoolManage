const initData = [
  {
    id: 1,
    studentName: '李明',
    curriculumName: '数学',
    classes: '三年级一班',
    time: '2019-8-12',
  },
  {
    id: 2,
    studentName: '王三',
    curriculumName: '语文',
    classes: '三年级二班',
    time: '2019-8-12',
  },
  {
    id: 3,
    studentName: '李四',
    curriculumName: '英语',
    classes: '二年级一班',
    time: '2019-8-12',
  },
  {
    id: 4,
    studentName: '高斯',
    curriculumName: '数学',
    classes: '四年级二班',
    time: '2019-8-12',
  },
  {
    id: 5,
    studentName: '王健',
    curriculumName: '数学',
    classes: '二年级一班',
    time: '2019-8-12',
  },
];

export default {
  'POST /studentRecord/fetchList': (req, res) => {
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

  'POST /studentRecord/exportExcel': (req, res) => {
    res.send({
      status: 200,
      data: initData,
    });
  },

  'POST /studentRecord/printRecord': (req, res) => {
    res.send({
      status: 200,
      data: initData,
    });
  },
};
