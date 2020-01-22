<template>
  <div class="picker">
    <div v-if="selectedLabel==='区域'"></div>
    <div v-if="selectedLabel==='方式'"></div>
    <div v-if="selectedLabel==='租金'"></div>
    <div v-if="selectedLabel==='筛选'"></div>
  </div>
</template>

<script>
import { handlePickerData } from '../utils/Func'
export default {
  props: {
    isShow: Boolean,
    selectedLabel: String
  },
  data () {
    return {
      // 区域数据
      areaList: [],
      // 方式数据
      modeList: [],
      // 租金数据
      priceList: []
    }
  },
  created () {
    this.getCondition()
  },
  methods: {
    // 拿到房租获取条件
    async getCondition () {
      let { body, status } = await this.$axios.get('/houses/condition', {
        params: {
          id: localStorage.getItem('cityvalue')
        }
      })
      if (status === 200) {
        console.log(body)
        body.area = handlePickerData(body.area)
        body.subway = handlePickerData(body.subway)
        // 区域数据
        this.areaList = [body.area, body.subway]
        // 方式数据
        this.modeList = handlePickerData(body.rentType)
        this.priceList = handlePickerData(body.price)
      }
    },
    // 区域
    showAreaPicker () {
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createCascadePicker({
          title: '区域',
          data: this.areaList
        })
      }
      this.mutiPicker.show()
    },
    // 方式
    showModePicker () {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '方式',
          data: [this.modeList]
        })
      }
      this.picker.show()
    },
    // 租金
    showPricePicker () {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '租金',
          data: [this.priceList]
        })
      }
      this.picker.show()
    }
  },
  watch: {
    selectedLabel (newVal) {
      if (newVal === '区域') {
        this.showAreaPicker()
      }
      if (newVal === '方式') {
        this.showModePicker()
      }
      if (newVal === '租金') {
        this.showPricePicker()
      }
    }
  }
}
</script>

<style>
</style>
