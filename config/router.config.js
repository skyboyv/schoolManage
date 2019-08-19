import Cookies from 'universal-cookie';

var cookies = new Cookies();

export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      {
        path: '/',
        redirect:
          cookies.get('authority') === 'admin' || cookies.get('authority') === 'user'
            ? '/Home'
            : '/user/login',
        authority: ['admin', 'user'],
      },
      {
        path: '/Home',
        icon: 'home',
        name: '首页',
        component: './Home',
      },
      {
        path: '/authority',
        icon: 'setting',
        name: '权限管理',
        routes: [
          {
            path: '/authority/userManage',
            name: '用户管理',
            component: './Authority/UserManage',
          },
          {
            path: '/authority/roleManage',
            name: '角色管理',
            component: './Authority/RoleManage',
          },
        ],
      },
      {
        path: '/administration',
        name: '行政管理',
        icon: 'solution',
        routes: [
          {
            path: '/administration/campus',
            name: '校区管理',
            component: './Administration/Campus',
          },
          {
            path: '/administration/subject',
            name: '科目管理',
            component: './Administration/Subject',
          },
          {
            path: '/administration/curriculum',
            name: '课程管理',
            component: './Administration/Curriculum',
          },
          {
            path: '/administration/class',
            name: '班级管理',
            component: './Administration/Class',
          },
        ],
      },
      {
        path: '/product',
        icon: 'shop',
        name: '商品管理',
        routes: [
          {
            path: '/Product/ProductManage',
            name: '商品管理',
            component: './Product/ProductManage',
          },
          {
            path: '/Product/ConvertManage',
            name: '兑换管理',
            component: './Product/ConvertManage',
          },
        ],
      },
      {
        path: '/FinancialRecord',
        name: '财务记录',
        component: './FinancialRecord',
      },
      {
        path: '/StudentRecord',
        name: '学生记录',
        component: './StudentRecord',
      },
      {
        path: '/ActionMessageManage',
        name: '活动信息管理',
        routes: [
          {
            path: '/ActionMessageManage/ParentContent',
            name: '家长内容管理',
            component: './ActionMessageManage/ParentContent',
          },
          {
            path: '/ActionMessageManage/StudentContent',
            name: '学生内容管理',
            component: './ActionMessageManage/StudentContent',
          },
          {
            path: '/ActionMessageManage/SchoolContent',
            name: '学校内容管理',
            component: './ActionMessageManage/SchoolContent',
          },
        ],
      },
      //  editor
      {
        component: '404',
      },
    ],
  },
];
