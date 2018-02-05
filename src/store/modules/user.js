import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: '',
    name: '',
    avatar: '',
    token: '',
    roles: []
  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {

      console.log('--------store/user-------');
      console.log(userInfo);

      console.log(userInfo.username);

      const username = userInfo.username.trim();
      console.log(`--------store/user/loginByUsername-------${username}`);
      return new Promise((resolve, reject) => {
        console.log('--------store/user/loginByUsername-------');
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }

};

export default user;
