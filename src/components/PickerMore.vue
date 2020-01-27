<template>
   <div class="pickerMore">
      <div class="roomType">
         <h3>户型</h3>
      </div>
      <div class="oriented">
         <h3>朝向</h3>
      </div>
      <div class="floor">
         <h3>楼层</h3>
      </div>
      <div class="characteristic">
         <h3>亮点</h3>
      </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      // 几室
      roomTypeList: [],
      // 朝向
      orientedList: [],
      // 楼层
      floorList: [],
      // 亮点
      characteristic: []
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
        console.log(body)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pickerMore{
width: 70%;
height: 100%;
position: absolute;
top:0;
right: 0;
overflow: scroll;
background-color: #fff;
z-index: 999;
}
</style>
