import Result from '../result';

const initData = [
  {
    curriculumId: 1,
    curriculumName: '高数',
  },
  {
    curriculumId: 2,
    curriculumName: '中国文学',
  },
  {
    curriculumId: 3,
    curriculumName: '英语',
  },
  {
    curriculumId: 4,
    curriculumName: '思想政治',
  },
  {
    curriculumId: 5,
    curriculumName: '会计学',
  },
];

export default {
  'POST /curriculumManage/fetchList': (req, res) => {
    const { page, pageSize, curriculumName } = req.body;
    const list = initData.reduce((acc, curr, index) => {
      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        acc.push(curr);
      }
      return acc;
    }, []);
    res.send({ status: 200, data: list, total: initData.length });
  },
};
