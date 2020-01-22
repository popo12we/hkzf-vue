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
// const column1 = [
//   { text: '剧毒', value: '剧毒' },
//   { text: '蚂蚁', value: '蚂蚁' },
//   { text: '幽鬼', value: '幽鬼' }
// ]
// const column2 = [
//   { text: '输出', value: '输出' },
//   { text: '控制', value: '控制' },
//   { text: '核心', value: '核心' },
//   { text: '爆发', value: '爆发' }
// ]
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
    // showMutiPicker () {
    //   if (!this.mutiPicker) {
    //     this.mutiPicker = this.$createPicker({
    //       title: 'Multi-column Picker',
    //       data: [column1, column2],
    //       onSelect: this.selectHandle,
    //       onCancel: this.cancelHandle
    //     })
    //   }
    //   this.mutiPicker.show()
    // },
    // selectHandle (selectedVal, selectedIndex, selectedText) {
    //   this.$createDialog({
    //     type: 'warn',
    //     content: `Selected Item: <br/> - value: ${selectedVal.join(
    //       ', '
    //     )} <br/> - index: ${selectedIndex.join(
    //       ', '
    //     )} <br/> - text: ${selectedText.join(' ')}`,
    //     icon: 'cubeic-alert'
    //   }).show()
    // },
    // cancelHandle () {
    //   this.$createToast({
    //     type: 'correct',
    //     txt: 'Picker canceled',
    //     time: 1000
    //   }).show()
    // },
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
  }
  /deep/ .cube-tab-bar {
    height: 40px;
    font-size: 16px;
  }
}
</style>
