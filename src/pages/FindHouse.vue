<template>
  <div class="findhouse">
    <!-- 顶部tabbar -->
    <div class="tabbar">
      <div class="tab" v-for="item in tabs" :key="item.id" @click="changeLabel(item.label)">{{item.label}}</div>
      <Picker :isShow="isShow" :selectedLabel="selectedLabel" @getData="getData"></Picker>
    </div>
    <!-- 房屋列表 -->
    <div class="house" v-for="(item,index) in houseList" :key="index">
      <div class="imgWrap">
        <img class="img" alt="" />
      </div>
      <div class="content">
        <h3 class="title">{{item.title}}</h3>
        <div class="desc">{{item.desc}}</div>
        <div class=".price">
          <span class="priceNum">{{item.price}}</span> 元/月
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Picker from '../components/Picker'
export default {
  components: {
    Picker
  },
  data () {
    return {
      tabs: [
        { id: 1, label: '区域' },
        { id: 2, label: '方式' },
        { id: 3, label: '租金' },
        { id: 4, label: '筛选' }
      ],
      // 选中项
      selectedLabel: '',
      isShow: true,
      // 房屋列表
      houseList: []
    }
  },
  methods: {
    // 改变选项卡
    changeLabel (label) {
      this.selectedLabel = label
    },
    getData (data) {
      this.houseList = data
    }

  }
}
</script>

<style lang="less" scoped>
.findhouse {
  height: 100%;
  .tab {
    float: left;
    width: 25%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  /deep/ .cube-tab-bar {
    height: 40px;
    font-size: 16px;
  }
}
</style>
