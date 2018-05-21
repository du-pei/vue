import Vue from 'vue';
import Router from 'vue-router';
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(Router);
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
import mainManage from '../apps/components/main.vue';
import login from '../apps/login/login.vue';
import {
  routes as system
} from './system';
import {
  routes as home
} from './mainSystem';

const manageRoutes = home.concat(system);
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [{
    path: '/',
    component: login,
    children: [{
      path: '/login',
      component: login
    }]
  },
  {
    path: '/manage',
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: mainManage,
    children: manageRoutes
  }
];
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
//下一步，转到main.js
const router = new Router({
  routes
});
let toPath = '';
//路由导航守卫;
router.beforeEach((to, from, next) => {
  if (to.path !== undefined) {
    toPath = to.path;
  }
  // 判断该路由是否需要登录权限
  if (localStorage.user !== undefined) { // && localStorage.report !== undefined
    // 通过vuex state获取当前的token是否存在
    next();
  } else {
    if (to === undefined || to.path != '/login') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    } else {
      next();
    }
  }
});

export default router;
