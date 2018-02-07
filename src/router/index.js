import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'
import { LoadingBar, Notice } from 'iview';

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

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}


const whiteList = ['login'];

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  if (getToken()) {

    console.log(`getToken() --> ${getToken()}`);
    console.log(`getToken() --> ${to.name}`);

    if (to.name === 'login') {
      next({
        replace: true,
        name: 'home_index'
      });
    } else {
      console.log(`store.getters.roles.length-->${store.getters.roles.length}`);
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles;
          console.log('---router/index---');
          console.log(res);
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.appRouters);
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Notice.error({
              title: '权限分配异常，请重新登录'
            });
            next({ name: 'login' });
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to)) {
          next()
        } else {
          next({ name: 'error-403', replace: true})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.name) !== -1) {
      console.log("---whiteList---");
      next()
    } else {
      console.log("---login---");
      next({
        replace: true,
        name: 'login'
      });
    }
  }

});

router.afterEach((to) => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
  // console.log("----end----")
});


