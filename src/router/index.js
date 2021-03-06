import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'
import { LoadingBar, Notice } from 'iview';

import {routers} from './router';

import { getToken } from '@/utils/auth'
import Util from '@/utils/util';

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

/**
 * 当前页面是否已打开
 * @param name
 * @returns {boolean}
 */
function isOpenViews(name) {
  let visitedViews = store.getters.visitedViews;
  let visitedRouterName = [];
  visitedViews.forEach(item => {
    visitedRouterName.push(item.name);
  });
  return (visitedRouterName.indexOf(name) > -1);
}

const whiteList = ['login'];

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  if (getToken()) {
    if (to.name === 'login') {
      next({
        replace: true,
        name: 'home_index'
      });
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles;
          store.dispatch('generateRoutes', { roles }).then(() => {
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
      next()
    } else {
      next({
        replace: true,
        name: 'login'
      });
    }
  }

});

router.afterEach((to) => {
  let currentRouterName = to.name;
  if (!isOpenViews(currentRouterName)) {
    store.dispatch('addVisitedViews', to);
  }

  LoadingBar.finish();
  window.scrollTo(0, 0);
});


