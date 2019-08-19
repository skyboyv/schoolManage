const initData = [
  {
    id: 1,
    title: `第一个图文编辑`,
    cover:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
  {
    id: 2,
    title: `第一个图文编辑`,
    cover:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
  {
    id: 3,
    title: `第一个图文编辑`,
    cover:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
  {
    id: 4,
    title: `第一个图文编辑`,
    cover:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
  {
    id: 5,
    title: `第一个图文编辑`,
    cover:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
];

export default {
  'POST /schoolContent/fetchList': (req, res) => {
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

  'POST /schoolContent/uploadPic': (req, res) => {
    res.send({
      status: 200,
      data:
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
    });
  },
};
