import { param2Obj } from '@/utils'

const blank = {
  meta: {
    code: 200,
    msg: 'ok blank'
  },
  data: {}
};

const userMap = {
  admin: {
    meta: {
      code: 200,
      msg: 'ok'
    },
    data: {
      roles: ['admin'],
      token: 'admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  },
  editor: {
    meta: {
      code: 200,
      msg: 'ok'
    },
    data: {
      roles: ['editor'],
      token: 'editor',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Editor'
    }
  },
  cheng: {
    meta: {
      code: 401,
      msg: '帐号或密码不正确'
    },
    data: {
    }
  },
  test01: {
    meta: {
      code: 500,
      msg: '服务器异常'
    },
    data: {
    }
  }
};

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },

  getUserInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token]
    } else {
      return blank
    }
  },

  logout: () => blank
}
