<template>
  <div class="list">
    <TopHeader></TopHeader>
    <cube-index-list :data="cityList" @select="selectItem"></cube-index-list>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader'
import { handleLangList, hotCityList } from '../utils/Func'
export default {
  components: {
    TopHeader
  },
  data () {
    return {
      cityList: [],
      hotCity: [],
      positionCity: []
    }
  },
  created () {
    this.getCityList()
  },
  methods: {
    // 城市列表数据
    async getCityList () {
      let { status, body } = await this.$axios.get('/area/city?level=1')
      if (status === 200) {
        this.cityList = handleLangList(body)
        this.getHotList()
      }
    },
    // 热门城市数据
    async getHotList () {
      let { status, body } = await this.$axios.get('/area/hot')
      if (status === 200) {
        // 热门城市
        this.hotCity = hotCityList(body)
        // 定位城市
        this.positionCity = hotCityList()
        this.cityList = [
          ...this.positionCity,
          ...this.hotCity,
          ...this.cityList
        ]
      }
    },
    // 点击改变定位城市
    selectItem (item) {
      if (
        item.name === '上海' ||
        item.name === '北京' ||
        item.name === '广州' ||
        item.name === '深圳'
      ) {
        this.cityList[0].items[0].label = item.name
        this.cityList[0].items[0].name = item.name
        localStorage.setItem('cityname', item.name)
        localStorage.setItem('cityvalue', item.value)
        const toast = this.$createToast({
          time: 1500,
          type: 'correct',
          txt: '当前定位城市' + item.name
        })
        toast.show()
        setTimeout(() => {
          this.$router.push('/home/index')
        }, 2000)
      } else {
        const toast = this.$createToast({
          time: 1500,
          type: 'error',
          txt: '抱歉当前城市无房源'
        })
        toast.show()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  height: 100%;
  // 长列表
  /deep/ .cube-index-list-anchor {
    background-color: #fff;
  }
}
</style>
