<template>
  <div class="findhouse">
    <!-- 顶部tabbar -->
    <div class="tabbar">
      <div class="tab" v-for="item in tabs" :key="item.id" @click="changeLabel(item.label)">{{item.label}}</div>
      <Picker :isShow="isShow" :selectedLabel="selectedLabel"></Picker>
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
      isShow: true
    }
  },
  methods: {
    // 改变选项卡
    changeLabel (label) {
      this.selectedLabel = label
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
