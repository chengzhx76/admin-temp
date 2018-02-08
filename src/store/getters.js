const getters = {
  username: state => state.user.username,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,

  menus: state => state.app.menus,
  routers: state => state.app.routers,
  appRouters: state => state.app.addAppRouters,
  currentPath: state => state.app.currentPath,
  visitedViews: state => state.app.visitedViews,
}

export default getters;
