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
    selectedLabel: String
  },
  data () {
    return {
      // 区域数据
      areaList: [],
      // 方式数据
      modeList: [],
      // 租金数据
      priceList: [],
      queryObj: {
        more: this.$store.state.more
      },
      // 处理高亮逻辑(子组件数据)
      lightObj: {}
    }
  },
  created () {
    this.getCondition()
    this.searchHouseList()
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
        body.area = handlePickerData(body.area)
        body.subway = handlePickerData(body.subway)
        // 区域数据
        this.areaList = [body.area, body.subway]
        // 方式数据
        this.modeList = handlePickerData(body.rentType)
        // 租金数据
        this.priceList = handlePickerData(body.price)
      }
    },
    // 区域
    showAreaPicker () {
      this.$emit('clearLabel')
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createCascadePicker({
          title: '区域',
          data: this.areaList,
          onSelect: this.areaHandle
        })
      }
      this.mutiPicker.show()
    },
    areaHandle (area) {
      area.length === 3 ? (area[area.length - 1] === 'null' ? this.queryObj.area = area[area.length - 2] : this.queryObj.area = area[area.length - 1]) : this.queryObj.area = null
      this.lightObj.area = true
      this.$emit('clearLabel', this.lightObj)
      this.searchHouseList()
    },
    // 方式
    showModePicker () {
      this.$emit('clearLabel')
      if (!this.modepicker) {
        this.modepicker = this.$createPicker({
          title: '方式',
          data: [this.modeList],
          onSelect: this.modeHandle
        })
      }
      this.modepicker.show()
    },
    modeHandle (mode) {
      this.queryObj.rentType = mode[0]
      this.lightObj.mode = true
      this.$emit('clearLabel', this.lightObj)
      this.searchHouseList()
    },
    // 租金
    showPricePicker () {
      this.$emit('clearLabel')
      if (!this.pricepicker) {
        this.pricepicker = this.$createPicker({
          title: '租金',
          data: [this.priceList],
          onSelect: this.priceHandle
        })
      }
      this.pricepicker.show()
    },
    priceHandle (price) {
      this.queryObj.price = price[0]
      this.lightObj.price = true
      this.$emit('clearLabel', this.lightObj)
      this.searchHouseList()
    },
    // 筛选房源数据
    async searchHouseList (start = 1, end = 20) {
      const res = await this.$axios.get('/houses', {
        params: {
          ...this.queryObj,
          cityId: localStorage.getItem('cityvalue'),
          start,
          end
        }
      })
      this.$emit('getData', res.body.list)
    }
  },
  watch: {
    selectedLabel: {
      handler  (newVal) {
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
    },
    '$store.state.more' (newval) {
      this.queryObj.more = newval
      this.lightObj.more = true
      this.$emit('clearLabel', this.lightObj)
      this.searchHouseList()
    }
  }
}
</script>

<style>
</style>
