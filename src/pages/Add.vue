<template>
  <div class="add">
    <TopHeader></TopHeader>
    <!-- 中间内容部分 -->
    <div class="add-content">
      <div class="add-title">房源信息</div>
      <!-- 小区名称 -->
      <div class="add-area-name">
        <div class="area-name">小区名称</div>
        <div class="area-write">
          <i class="cubeic-arrow"></i>
          <div>请输入小区名称</div>
        </div>
      </div>
      <!-- 租金 -->
      <div class="rent-money">
        <div class="rent-money-title">租金</div>
        <div class="rent-money-mouth">￥/月</div>
        <div class="rent-money-input">
          <input type="text" placeholder="请输入租金/月" />
        </div>
      </div>
      <!-- 面积 -->
      <div class="rent-measure">
        <div class="rent-measure-title">建筑面积</div>
        <div class="rent-measure-mouth">㎡</div>
        <div class="rent-measure-input">
          <input type="text" placeholder="请输入建筑面积" />
        </div>
      </div>
      <!-- 选择面积 -->
      <div class="choose-measure">
        请选择<i class="cubeic-arrow"></i>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader'
export default {
  components: {
    TopHeader
  }
}
</script>

<style lang="less" scoped>
.add-content {
  margin: 0 15px;
  font-size: 15px;
  color: #777;
  .add-title {
    height: 40px;
    line-height: 40px;
    color: #21b97a;
    border-bottom: 1px solid #eee;
  }
  .add-area-name {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .area-name,
    .area-write {
      float: left;
      width: 50%;
    }
    .area-write {
      text-align: right;
      > div,
      i {
        float: right;
      }
    }
  }
  .rent-money {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .rent-money-title {
      float: left;
      width: 99px;
      letter-spacing: 2em;
    }
    .rent-money-input {
      overflow: hidden;
      height: 44px;
      input {
        width: 100%;
        height: 100%;
        display: block;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      input::-moz-input-placeholder {
        color: #ccc;
      }
      input::-ms-input-placeholder {
        color: #ccc;
      }
    }
    .rent-money-mouth {
      float: right;
    }
  }
  .rent-measure {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .rent-measure-title {
      float: left;
      width: 99px;
    }
    .rent-measure-input {
      overflow: hidden;
      height: 44px;
      input {
        width: 100%;
        height: 100%;
        display: block;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      input::-moz-input-placeholder {
        color: #ccc;
      }
      input::-ms-input-placeholder {
        color: #ccc;
      }
    }
    .rent-measure-mouth {
      float: right;
    }
  }
  .choose-measure {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
}
</style>
