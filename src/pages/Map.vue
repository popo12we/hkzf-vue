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
  created () {
    this.getHouseData()
  },
  methods: {
    // 初始化地图
    initMap () {
      var map = new window.BMap.Map('l-map')
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
      // 4. 添加文字覆盖物
      console.log(this.overlays)
      this.overlays.forEach(item => {
        var point = new window.BMap.Point(
          item.coord.longitude,
          item.coord.latitude
        )
        var opts = {
          // 指定文本标注所在的地理位置
          position: point
          // 设置文本x轴和y轴的偏移量
          // offset: new window.BMap.Size(30, -30)
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
        map.addOverlay(label)
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
      if (status === 200) {
        this.overlays = body
        this.initMap()
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 区、镇的覆盖物样式： */

#l-map {
  height: 100%;
}
</style>
