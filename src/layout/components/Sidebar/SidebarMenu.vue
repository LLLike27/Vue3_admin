<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    :default-active="activeMenu"
    router
    :collapse="!$store.getters.sidebarOpened"
  >
    <!-- 子集 menu 菜单 -->
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
// 刷新页面 根据route路径 计算选中展开 menu高亮的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  // console.log(path)
  return path
})

// console.log(JSON.stringify(routes.value))
</script>

<style lang="scss" scoped></style>
