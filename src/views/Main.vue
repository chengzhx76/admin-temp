<template>
  <div class="main" :class="{'main-hide-text': shrink}">

    <!-- 侧边栏 -->
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <menu-bar
        :shrink="shrink"
        theme="dark"
        :menu-list="menus">
        <div slot="top" class="logo-con">
          <img v-show="!shrink" src="../images/logo.jpg" key="max-logo"/>
          <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo"/>
        </div>
      </menu-bar>
    </div>

    <!-- 头信息 -->
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <!-- 头部小部件 -->
      <div class="main-header">
        <!-- 汉堡图标 -->
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                  @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <!-- 面包屑导航 -->
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <!-- 左侧小组件 -->
        <div class="header-avator-con">
          <!-- 全屏 -->
          <full-screen v-model="fullScreen"></full-screen>
          <!-- 锁屏 -->
          <lock-screen></lock-screen>

          <!-- 用户 -->
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">

              <!-- 下拉 -->
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ name }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="logOut" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <!-- 头像 -->
              <Avatar :src="avatar" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>

        </div>
      </div>
      <!-- 打开菜单导航栏 -->
      <div class="tags-con">
        <visited-view :visitedViews="visitedViews"></visited-view>
      </div>
    </div>

    <!-- 主内容 -->
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script>

  import {mapGetters} from 'vuex'

  import menuBar from './main/menu';
  import visitedView from './main/tags';
  import breadcrumbNav from './main/breadcrumb';

  import fullScreen from './main/fullscreen';
  import lockScreen from './main/lockscreen';

  export default {
    components: {
      menuBar,
      visitedView,
      breadcrumbNav,
      fullScreen,
      lockScreen
    },

    data() {
      return {
        shrink: false,
        fullScreen: false,
      };
    },

    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'menus',
        'currentPath',
        'visitedViews',
      ])
    },

    methods: {
      toggleClick() {
        this.shrink = !this.shrink;
      },

      handleClickUserDropdown(name) {
        if (name === 'logOut') {
          this.$store.dispatch('LogOut').then(() => {
            location.reload();
          });
        }
      }
    },

    watch: {
      '$route'(to) {
//        this.$store.commit('setCurrentPageName', to.name);
//        localStorage.currentPageName = to.name;
      }
    }

  };
</script>

<style lang="less">
  @import "../styles/main.less";
</style>
