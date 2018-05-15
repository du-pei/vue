import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import mainManage from '../apps/components/main.vue';
import login from '../apps/login/login.vue';
import { routes as system } from './system';
import { routes as home } from './mainSystem';

const manageRoutes = home.concat(system);

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

const router = new Router({ routes });
let toPath = '';
//路由导航守卫;
router.beforeEach((to, from, next) => {
    console.log(from);
    console.log(to);
    console.log(this.$route);
    if (to.path !== undefined) {
        toPath = to.path;
    }
    console.log(localStorage.report);
    // 判断该路由是否需要登录权限
    if (localStorage.user !== undefined && localStorage.report !== undefined) {
        // 通过vuex state获取当前的token是否存在
        next();
    } else {
        console.log(to.path);
        if (to === undefined || to.path != '/login') {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        } else {
            next();
        }
    }
});

export default router;