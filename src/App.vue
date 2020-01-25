<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  watch: {
    $route: {
      handler (data) {
        if (data.path === '/map') {
          localStorage.setItem('title', '地图找房')
        }
        if (data.path === '/list') {
          localStorage.setItem('title', '城市选择')
        }
        if (data.path === '/login') {
          localStorage.setItem('title', '账号登录')
        }
        if (data.path === '/add') {
          localStorage.setItem('title', '发布房源')
        }
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
#app{
  height: 100%;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
</style>
