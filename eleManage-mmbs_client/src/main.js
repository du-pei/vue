// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
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
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    store // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
});