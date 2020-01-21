<template>
<div id="l-map"></div>
</template>

<script>
export default {
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      var map = new window.BMap.Map('l-map')
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11)
      // 创建地址解析器实例
      var myGeo = new window.BMap.Geocoder()
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint('北京市海淀区上地10街10号', function (point) {
        if (point) {
          map.centerAndZoom(point, 16)
          map.addOverlay(new window.BMap.Marker(point))
        }
      },
      '北京市')
    }
  }
}
</script>

<style>
#l-map{
  height: 100%;
}
</style>
