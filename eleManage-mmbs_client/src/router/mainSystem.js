import Vue from 'vue';
import Router from 'vue-router';

import homePage from '../apps/components/homePage.vue';

export const routes = [{
    name: 'home',
    path: '/manage',
    component: homePage,
    meta: []
}]