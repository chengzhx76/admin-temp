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
    visitedViews: [
      {
        path: '',
        name: 'home_index',
        meta: {
          title: '首页'
        }
      }
    ],
    menus: [],
    addAppRouters: [],
    routers: routers
  },
  mutations: {
    SET_ROUTERS: (state, accessedRouters) => {
      state.addAppRouters = accessedRouters;
      state.routers = routers.concat(accessedRouters);
    },
    SET_MENUS: (state, accessedRouters) => {
      state.menus = accessedRouters;
    },

    // 面包屑
    SET_CURRENT_PATH: (state, path) => {
      state.currentPath.push(path);
    },

    // 标签
    ADD_VISITED_VIEWS (state, view) {
      state.visitedViews.push(view);
    },

    DEL_VISITED_VIEW (state, name) {
      state.visitedViews.map((item, index) => {
        if (item.name === name) {
          state.visitedViews.splice(index, 1);
        }
      });
    },

    DEL_VISITED_VIEWS (state) {
      state.visitedViews.splice(1);
    },

    DEL_OTHER_VISITED_VIEWS (state, currentName) {
      let currentIndex = 0;
      state.visitedViews.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index;
        }
      });
      if (currentIndex === 0) {
        state.visitedViews.splice(1);
      } else {
        state.visitedViews.splice(currentIndex + 1);
        state.visitedViews.splice(1, currentIndex - 1);
      }
    }

  },
  actions: {

    generateRoutes({ commit }, data) {
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
    },

    // 标签
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },

    delVisitedView({ commit }, view) {
      commit('DEL_VISITED_VIEW', view)
    },

    delVisitedViews ({ commit }) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEWS');
        resolve();
      })
    },

    delOtherVisitedViews ({ commit }) {
      return new Promise(resolve => {
        commit('DEL_OTHER_VISITED_VIEWS');
        resolve();
      })
    }

  }
};

export default app;
