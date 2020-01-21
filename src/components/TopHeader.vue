<template>
  <div class="header">
    <div class="choose-city-icon">
      <router-link to="/home/index">
        <i class="iconfont icon-back"></i>
      </router-link>
    </div>
    <!-- 防止标题歪了。。 -->
    <div class="choose-city-empty"></div>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: localStorage.getItem('title')
    }
  }

}
</script>

<style  lang="less" scoped>
// 头部
.header {
  height: 45px;
  background-color: #f6f5f6;
  font-size: 18px;
  .choose-city-icon {
    width: 45px;
    height: 45px;
    float: left;
    text-align: center;
    line-height: 45px;
  }
  .choose-city-empty {
    width: 45px;
    height: 45px;
    float: right;
  }
  h1 {
    overflow: hidden;
    text-align: center;
    line-height: 45px;
    color: #333;
  }
}
</style>
