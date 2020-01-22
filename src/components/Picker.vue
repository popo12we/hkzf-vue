<template>
   <div class="picker">
     <div v-if="selectedLabel==='区域'">

     </div>
     <div v-if="selectedLabel==='方式'">2222</div>
     <div v-if="selectedLabel==='租金'">3333</div>
     <div v-if="selectedLabel==='筛选'">4444</div>
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
      areaList: []
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
        body.area = handlePickerData(body.area)
        body.subway = handlePickerData(body.subway)
        this.areaList = [body.area, body.subway]
      }
    },
    showMutiPicker () {
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createCascadePicker({
          title: '区域',
          data: this.areaList
        })
      }
      this.mutiPicker.show()
    }
  },
  watch: {
    selectedLabel (newVal) {
      if (newVal === '区域') {
        this.showMutiPicker()
      }
    }
  }
}
</script>

<style>
</style>
