<template>
  <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto"
        @on-select="changeMenu">
    <template v-for="item in menuList">
      <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
        <Icon :type="item.children[0].meta.icon || item.meta.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
        <span class="layout-text" :key="'title' + item.name">{{ item.children[0].meta.title }}</span>
      </MenuItem>

      <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
        <template slot="title">
          <Icon :type="item.meta.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children">
          <MenuItem :name="child.name" :key="'menuitem' + child.name">
            <Icon :type="child.meta.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
            <span class="layout-text" :key="'title' + child.name">{{ child.meta.title }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  export default {
    name: 'sidebarMenu',
    props: {
      menuList: Array,
      iconSize: Number,
      menuTheme: {
        type: String,
        default: 'dark'
      },
      openNames: {
        type: Array
      }
    },
    methods: {
      // 由父组件负责路由跳转
      changeMenu(active) {
        this.$emit('on-change', active);
      }
    }
  };
</script>

<style lang="less">
  @import '../styles/menu.less';
</style>

