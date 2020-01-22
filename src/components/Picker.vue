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
        body.area.text = body.area.label
        body.subway.text = body.subway.label
        body.area.children.forEach(item => {
          item.text = item.label
          console.log(item)
          if (item.children) {
            item.children.forEach(item1 => {
              item1.text = item1.label
            })
          }
        })
        body.subway.children.forEach(item => {
          item.text = item.label
          console.log(item)
          if (item.children) {
            item.children.forEach(item1 => {
              item1.text = item1.label
            })
          }
        })
        // body.subway.children.forEach(item => {
        //   item.text = item.label
        //   item.children.forEach(item1 => {
        //     item1.text = item1.label
        //   })
        // })
        this.areaList = [body.area, body.subway]
        console.log(this.areaList)
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
