<template>
  <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
    <slot name="top"></slot>

    <!-- 展开的菜单 -->
    <sidebar-menu
      v-show="!shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      @on-change="handleChange"
    ></sidebar-menu>

    <!-- 收缩后的菜单 -->
    <sidebar-menu-shrink
      v-show="shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-change="handleChange"
    ></sidebar-menu-shrink>

  </div>
</template>

<script>
  import sidebarMenu from './sidebar';
  import sidebarMenuShrink from './sidebar/shrink';
  import util from '@/utils/util';

  export default {
    name: 'menuBar',
    components: {
      sidebarMenu,
      sidebarMenuShrink
    },
    props: {
      shrink: {
        type: Boolean,
        default: false
      },
      menuList: {
        type: Array,
        required: true
      },
      theme: {
        type: String,
        default: 'dark',
        validator(val) { //验证必须在这里面的
          return util.oneOf(val, ['dark', 'light']);
        }
      }
    },
    computed: {
      bgColor() {
        return this.theme === 'dark' ? '#495060' : '#fff';
      },
      shrinkIconColor() {
        return this.theme === 'dark' ? '#fff' : '#495060';
      }
    },
    methods: {
      // 有子路由传入 路由跳转
      handleChange(name) {
        this.$router.push({
          name: name
        });
      }
    }
  };
</script>

<style lang="less">
  @import './styles/menu.less';
</style>
