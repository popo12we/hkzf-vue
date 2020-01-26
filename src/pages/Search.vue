<template>
  <div class="search">
    <p>取消</p>
    <div class="search-input">
      <input type="text" placeholder="请输入小区名称"/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 .search{
  height: 44px;
   background-color: #f6f5f6;
   .search-input{
     overflow: hidden;
     input{
       display: block;
       margin-top:7px;
       margin-left:7px;
       width: 100%;
       height: 30px;
       text-indent: 1em;
     }
   }
   p{
     float: right;
     width: 44px;
     height: 44px;
     text-align: center;
     line-height: 44px;
     font-size: 15px;
    color: #6b7072;
   }
 }
</style>
