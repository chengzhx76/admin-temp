import Main from '@/views/Main';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/login')
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('@/views/main/lockscreen/components/lockingPage')
};

// -----------------------------------------------------------------------------------------------

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: 'home',
      title: '测试页',
      name: 'home_index',
      component: () => import('@/components/Hello')
    },
    // { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
    // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
    // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
    // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/user',
    name: 'user',
    component: Main,
    meta: {
      title: '用户列表',
      icon: 'android-contacts',
      roles: ['admin']
    },
    children: [
      {
        path: 'add',
        name: 'user_add',
        component: () => import('@/components/user'),
        meta: {
          title: '添加用户',
          roles: ['admin']
        }
      },
      {
        path: 'list',
        name: 'user_list',
        component: () => import('@/components/list'),
        meta: {
          title: '用户列表',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/error-page',
    name: 'errorpage',
    component: Main,
    meta: {
      title: '错误页面',
      icon: 'android-sad',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'errorpage_index',
        component: () => import('@/views/errorPage/errorPage'),
        meta: {
          title: '错误页面',
          roles: ['admin']
        }
      }
    ]
  }
];

// -----------------------------------------------------------------------------------------------
export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/views/errorPage/404')
};

export const page403 = {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-权限不足'
  },
  component: () => import('@/views/errorPage/403')
};

export const page500 = {
  path: '/500',
  name: 'error-500',
  meta: {
    title: '500-服务端错误'
  },
  component: () => import('@/views/errorPage/500')
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  locking,
  // ...appRouter,
  page500,
  page403,
  page404
];
