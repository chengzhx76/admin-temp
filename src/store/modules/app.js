import {routers, otherRouter, appRouter} from '@/router/router';

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
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param appRouterMap
 * @param roles
 */
function filterAppRouter(appRouterMap, roles) {
  const accessedRouters = appRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAppRouter(route.children, roles)
      }
      return true
    }
    return false
  });
  return accessedRouters
}

const app = {
  state: {
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ],

    menus: [],
    addAppRouters: [],
    routers: routers
  },
  mutations: {
    SET_ROUTERS: (state, accessedRouters) => {
      state.addAppRouters = accessedRouters;
      console.log(accessedRouters);
      state.routers = routers.concat(accessedRouters);
    },
    SET_MENUS: (state, accessedRouters) => {
      state.menus = accessedRouters;
    },
    SET_CURRENT_PATH: (state, currentPath) => {
      state.currentPath = currentPath;
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = appRouter;
        } else {
          accessedRouters = filterAppRouter(appRouter, roles);
        }
        commit('SET_ROUTERS', accessedRouters);
        commit('SET_MENUS', accessedRouters);
        resolve();
      })
    }
  }
};

export default app;
