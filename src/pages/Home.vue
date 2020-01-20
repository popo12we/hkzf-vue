<template>
  <div class="home">
    <router-view />
    <BottomFooter></BottomFooter>
  </div>
</template>
<script>
import BottomFooter from '../components/BottomFooter'
export default {
  components: {
    BottomFooter
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
</style>
