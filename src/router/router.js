import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/login.vue')
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('@/views/main/lockscreen/components/lockingPage.vue')
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
      component: () => import('@/components/Hello.vue')
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
    icon: 'android-contacts',
    title: '用户列表',
    name: 'user',
    component: Main,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'add',
        title: '添加用户',
        name: 'user_add',
        component: () => import('@/views/errorPage/errorPage'),
        meta: {
          roles: ['admin']
        }
      },
      {
        path: 'list',
        title: '用户列表',
        name: 'user_list',
        component: () => import('@/views/errorPage/errorPage'),
        meta: {
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    component: Main,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        title: '错误页面',
        name: 'errorpage_index',
        component: () => import('@/views/errorPage/errorPage'),
        meta: {
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
  component: () => import('@/views/errorPage/404.vue')
};

export const page403 = {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-权限不足'
  },
  component: () => import('@/views/errorPage/403.vue')
};

export const page500 = {
  path: '/500',
  name: 'error-500',
  meta: {
    title: '500-服务端错误'
  },
  component: () => import('@/views/errorPage/500.vue')
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
