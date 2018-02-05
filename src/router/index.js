import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';

import {routers} from './router';

import { getToken } from '@/utils/auth'

Vue.use(VueRouter);


// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

const router = new VueRouter(RouterConfig);

export default router


router.beforeEach((to, from, next) => {
  console.log("----start----")
  iView.LoadingBar.start();
  next();
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
  console.log("----end----")
});


