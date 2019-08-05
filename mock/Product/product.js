const initData = [
  {
    productId: 1,
    productName: '草莓',
    price: 200,
    convertAddr: '重庆渝北区幸福华庭B栋1-3',
    number: 50,
    desc: '',
    imgSrc:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564938659018&di=100d92492f1df13266721275657e7c18&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fg2%2FM06%2F45%2FBF%2FwKhQuFLfLl-EakIIAAAAAGqrml0128.jpg',
  },
  {
    productId: 2,
    productName: '赣南脐橙',
    price: 200,
    convertAddr: '重庆渝北区幸福华庭B栋1-3',
    number: 50,
    desc: '赣南脐橙新鲜时令孕妇水果多汁甜橙子现摘现发果园直供10斤装',
    imgSrc:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
  {
    productId: 3,
    productName: '赣南脐橙',
    price: 200,
    convertAddr: '重庆渝北区幸福华庭B栋1-3',
    number: 50,
    desc: '赣南脐橙新鲜时令孕妇水果多汁甜橙子现摘现发果园直供10斤装',
    imgSrc:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
  {
    productId: 4,
    productName: '赣南脐橙',
    price: 200,
    convertAddr: '重庆渝北区幸福华庭B栋1-3',
    number: 50,
    desc: '赣南脐橙新鲜时令孕妇水果多汁甜橙子现摘现发果园直供10斤装',
    imgSrc:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
  {
    productId: 5,
    productName: '赣南脐橙',
    price: 200,
    convertAddr: '重庆渝北区幸福华庭B栋1-3',
    number: 50,
    desc: '赣南脐橙新鲜时令孕妇水果多汁甜橙子现摘现发果园直供10斤装',
    imgSrc:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
  },
];

export default {
  'POST /productManage/fetchList': (req, res) => {
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

  'POST /productManage/uploadPic': (req, res) => {
    res.send({
      status: 200,
      data:
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2821732540,1990329745&fm=26&gp=0.jpg',
    });
  },
};
