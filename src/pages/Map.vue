<template>
  <div class="map">
    <TopHeader></TopHeader>
    <div id="l-map"></div>
    <div class="house" v-for="item in houses" :key="item.houseCode">
      <div class="imgWrap">
        <img class="img" alt />
      </div>
      <div class="content">
        <h3 class="title">{{item.title}}</h3>
        <div class="desc">{{item.desc}}</div>

        <div class="price">
          <span class="priceNum">{{item.price}}</span> 元/月
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader'
export default {
  components: {
    TopHeader
  },
  data () {
    return {
      // 覆盖物数据
      overlays: [],
      // 具体房屋数据
      houses: []
    }
  },

  mounted () {
    this.initMap()
    this.getHouseData()
  },
  methods: {
    // 初始化地图
    initMap (nextZoom) {
      var map = new window.BMap.Map('l-map')
      window.map = map
      var myGeo = new window.BMap.Geocoder()
      let cityname = localStorage.getItem('cityname')
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(
        cityname,
        function (point) {
          if (point) {
            map.centerAndZoom(point, 11)
            map.addControl(new window.BMap.NavigationControl())
            map.addControl(new window.BMap.ScaleControl())
            map.addOverlay(new window.BMap.Marker(point))
          }
        },
        cityname
      )
    },

    // 判断现在到底处在哪个层级,通过判断在哪个层级知道覆盖物是什么类型的
    getTypeAndZoom () {
      const zoom = window.map.getZoom()
      let nextZoom, type
      if (zoom === 11) {
        nextZoom = 13
        type = 'circle'
      } else if (zoom === 13) {
        nextZoom = 15
        type = 'circle'
      } else {
        nextZoom = 15
        type = 'rect'
      }
      return {
        nextZoom,
        type
      }
    },
    // 创建圆形覆盖物
    createCircle (nextZoom) {
      this.overlays.forEach(item => {
        var point = new window.BMap.Point(
          item.coord.longitude,
          item.coord.latitude
        )
        var opts = {
          // 指定文本标注所在的地理位置
          position: point
        }
        // 创建文本标注对象
        var label = new window.BMap.Label(
          `<div class="bubble">
            <p class="name">${item.label}</p>
            <p>${item.count}套</p>
          </div>`,
          opts
        )
        label.setStyle({
          width: '50px',
          height: '50px',
          lineHeight: '23px',
          display: 'inline-block',
          position: 'absolute',
          borderRadius: '100%',
          background: 'rgba(12, 181, 106, 0.9)',
          color: '#fff',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          cursor: 'pointer'
        })
        // 把文字覆盖物添加到地图上
        window.map.addOverlay(label)
        label.addEventListener('click', e => {
          this.getHouseData(item.value)
          window.map.centerAndZoom(point, nextZoom)
        })
      })
    },

    // 创建方形覆盖物
    createRect (nextZoom) {
      this.overlays.forEach(item => {
        var point = new window.BMap.Point(
          item.coord.longitude,
          item.coord.latitude
        )
        var opts = {
          // 指定文本标注所在的地理位置
          position: point
        }
        // 创建文本标注对象
        var label = new window.BMap.Label(
          `<div class="rect">
              <span class="housename">${item.label}</span>
              <span class="housenum">${item.count}套</span>
              <i class="arrow"></i>
           </div>`,
          opts
        )
        label.setStyle({
          height: '20px',
          lineHeight: '19px',
          width: '100px',
          padding: '0 3px',
          borderRadius: '3px',
          position: 'absolute',
          background: 'rgba(12, 181, 106, 0.9)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          color: '#fff',
          border: 'none'
        })
        // 把文字覆盖物添加到地图上
        window.map.addOverlay(label)
        label.addEventListener('click', e => {
          this.getHouseDetailData(item)
        })
      })
    },

    // 查询房源数据
    async getHouseData (value) {
      const toast = this.$createToast({
        txt: '加载中'
      })
      toast.show()
      let { status, body } = await this.$axios.get(
        'http://localhost:8080/area/map',
        {
          params: {
            id: value || localStorage.getItem('cityvalue')
          }
        }
      )
      window.map.clearOverlays()
      let { type, nextZoom } = this.getTypeAndZoom()
      if (status === 200) {
        this.overlays = body

        if (type === 'rect') {
          this.createRect(nextZoom)
        } else {
          this.createCircle(nextZoom)
        }
        toast.hide()
      }
    },

    // 展示房源具体信息
    async getHouseDetailData (item) {
      const { status, body } = await this.$axios.get(
        `http://localhost:8080/houses?cityId=${item.value}`
      )
      if (status === 200) {
        this.houses = body.list
        console.log(this.houses)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  height: 100%;
  #l-map {
    padding-top: 40px;
    height: 100%;
  }
  .house {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 120px;
    box-sizing: border-box;
    padding-top: 18px;
    border-bottom: 1px solid #e5e5e5;
    .imgWrap {
      float: left;
      width: 106px;
      height: 80px;
      .img {
        width: 106px;
        height: 80px;
      }
    }
  }
}
</style>
