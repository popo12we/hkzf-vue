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
        this.areaList = body.area.children
        this.areaList.forEach(item => {
          item.text = item.label
        })
      }
    },
    showMutiPicker () {
      if (!this.mutiPicker) {
        console.log(this.areaList)
        this.mutiPicker = this.$createPicker({
          title: '区域',
          data: [this.areaList, this.areaList],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.mutiPicker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {

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
