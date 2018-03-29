import Vue from 'vue';
import Router from 'vue-router';

import test from '../apps/app/system/test.vue';

Vue.use(Router);

export const routes = [{
    name: 'test',
    path: '/System/Test',
    component: test,
    meta: ['基本信息']
}];