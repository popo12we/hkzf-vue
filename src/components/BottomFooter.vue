<template>
  <!-- 底部 -->
  <div class="footer">
    <ul>
      <li>
        <router-link to="/home/index" class="bgi">
          <i class="iconfont icon-ind"></i>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/home/list" class="bgi">
         <i class="iconfont icon-findHouse"></i>
          <p>找房</p>
        </router-link>
      </li>
      <li>
        <router-link to="/home/news" class="cartShow bg">
         <i class="iconfont icon-infom"></i>
          <p>咨询</p>
        </router-link>
      </li>
      <li>
        <router-link to="/home/my" class="bgi">
         <i class="iconfont icon-my"></i>
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// 底部样式
.footer {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 18px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;
  background-color: #f8f8f8;
  font-size: 20px;
  ul {
    overflow: hidden;
    height: 100%;
  }
  li {
    float: left;
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    a {
      width: 100%;
      height: 100%;
      display: block;
      margin-top:5px;
      i{
        font-size: 20px;
        margin:3px 0;
      }
      p {
        font-size: 12px;
         margin-top:5px;
      }
      &.active{
        color:rgb(33, 185, 122);
      }
    }
  }
}
</style>
