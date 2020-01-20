<template>
  <div class="map">
    <cube-index-list :data="cityList" @select="selectItem" @title-click="clickTitle"></cube-index-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cityList: [],
      hotCityList: []
    }
  },
  created () {
    this.getCityList()
    this.getHotList()
  },
  methods: {
    // 城市列表数据
    async getCityList () {
      let { status, body } = await this.$axios.get('/area/city?level=1')
      if (status === 200) {
        // 原始数据
        // 0：{label: "北京", value: "AREA|88cff55c-aaa4-e2e0", pinyin: "beijing", short: "bj"}
        // 1: {label: "安庆", value: "AREA|b4e8be1a-2de2-e039", pinyin: "anqing", short: "aq"}
        // 2: {label: "南宁", value: "AREA|2bc437ca-b3d2-5c3c", pinyin: "nanning", short: "nn"}

        // 期待数据
        // {
        //   "name": "★Hot City",
        //   "items": [
        //     {
        //       "name": "BEIJING",
        //       "value": 1
        //     },
        //     {
        //       "name": "SHANGHAI",
        //       "value": 2
        //     }
        //   ]
        // },
        body.forEach(item => {
          item.name = item.label
        })
        let tempObj = {}
        body.forEach(item => {
          if (item.short[0] in tempObj) {
            tempObj[item.short[0]].push(item)
          } else {
            tempObj[item.short[0]] = [item]
          }
        })
        const cityIndex = Object.keys(tempObj).sort()
        let newObj = {}
        for (let i = 0; i < cityIndex.length; i++) {
          newObj[cityIndex[i]] = tempObj[cityIndex[i]]
        }
        let newList = []
        for (var key in newObj) {
          newList.push({ name: key, items: newObj[key] })
        }
        this.cityList = newList
      }
    },
    // 热门城市数据
    async getHotList () {
      let { status, body } = await this.$axios.get('/area/hot')
      if (status === 200) {
        this.hotCityList = body
      }
    },
    selectItem (item) {
      console.log(item.name)
    },
    clickTitle (title) {
      console.log(title)
    }
  }
}
</script>

<style lang="less" scoped>
  .map{
    height: 100%;
  }
</style>
