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
      var myGeo = new window.BMap.Geocoder()
      let cityname = localStorage.getItem('cityname')
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(cityname, function (point) {
        console.log(point)
        if (point) {
          map.centerAndZoom(point, 11)
          map.addOverlay(new window.BMap.Marker(point))
        }
      },
      cityname)
    }
  }
}
</script>

<style>
#l-map{
  height: 100%;
}
</style>
