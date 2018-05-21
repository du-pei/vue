// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
//4. 注入路由
import router from './router';
import plugins from './apps/plugin/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/icon/iconfont.css';
import store from './store/app';

Vue.config.productionTip = false;
Vue.use(plugins);
Vue.use(ElementUI);

/* eslint-disable no-new */
// 5. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    store // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
});