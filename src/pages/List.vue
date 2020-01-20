<template>
  <div class="map">
    <router-link to="/home/index">
      <div class="choose-city">
        <div class="choose-city-icon">
          <i class="iconfont icon-back"></i>
        </div>
        <!-- 防止标题歪了。。 -->
        <div class="choose-city-empty"></div>
        <h1>城市选择</h1>
      </div>
    </router-link>
    <cube-index-list :data="cityList"></cube-index-list>
  </div>
</template>

<script>
import { handleLangList } from '../utils/Func'
export default {
  data () {
    return {
      cityList: [],
      hotCityList: []
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
        let obj = {}
        obj.name = '#'
        obj.items = []
        body.forEach(item => {
          obj.items.push({ label: item.label, value: item.value, name: item.label })
        })
        obj = [obj]
        this.cityList = [...obj, ...this.cityList]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  height: 100%;
  // 头部
  .choose-city {
    height: 45px;
    background-color: #f6f5f6;
    font-size: 20px;
    .choose-city-icon {
      width: 45px;
      height: 45px;
      float: left;
      text-align: center;
      line-height: 45px;
    }
    .choose-city-empty {
      width: 45px;
      height: 45px;
      float: right;
    }
    h1 {
      overflow: hidden;
      text-align: center;
      line-height: 45px;
      color: #333;
    }
  }
  // 长列表
  /deep/ .cube-index-list-anchor {
    background-color: #fff;
  }
}
</style>
