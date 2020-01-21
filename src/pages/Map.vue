<template>
  <div id="l-map"></div>
</template>

<script>
export default {
  data () {
    return {
      // 覆盖物数据
      overlays: []
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
            map.centerAndZoom(point, nextZoom)
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
      console.log(zoom)
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
    createCircle () {
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
        })
      })
    },

    // 创建方形覆盖物
    createRect () {
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
              <span class="housename">航都路18号</span>
              <span class="housenum">100 套</span>
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
          whiteSpace: 'nowrap'
        })
        // 把文字覆盖物添加到地图上
        window.map.addOverlay(label)
      })
    },

    // 查询房源数据
    async getHouseData (value) {
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
          this.createRect()
        } else {
          this.createCircle()
        }
        this.initMap(nextZoom)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#l-map {
  height: 100%;
}
</style>
