<template>
  <div class="pickerMore">
    <div class="roomType">
      <h3>户型</h3>
      <ul>
        <li v-for="(item,index) in roomTypeList" :key="item.value" @click="handle(index)" :class='{"active":index===roomTypetLightIndex}'>{{item.label}}</li>
      </ul>
    </div>
    <div class="oriented">
      <h3>朝向</h3>
      <ul>
        <li v-for="item in orientedList" :key="item.value">{{item.label}}</li>
      </ul>
    </div>
    <div class="floor">
      <h3>楼层</h3>
      <ul>
        <li v-for="item in floorList" :key="item.value">{{item.label}}</li>
      </ul>
    </div>
    <div class="characteristic">
      <h3>亮点</h3>
      <ul>
        <li v-for="item in characteristicList" :key="item.value">{{item.label}}</li>
      </ul>
    </div>
    <div class="btn" @click="sure">确认</div>
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
      characteristicList: [],
      roomTypetLightIndex: -1
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
        this.roomTypeList = body.roomType
        this.orientedList = body.oriented
        this.floorList = body.floor
        this.characteristicList = body.characteristic
      }
    },
    handle (index) {
      this.roomTypetLightIndex = index
    },
    sure () {

    }
  }
}
</script>

<style lang="less" scoped>
.pickerMore {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  overflow: scroll;
  background-color: #fff;
  z-index: 999;
  margin-bottom: 50px;
  > div {
    margin: 0 15px;
    h3 {
      margin: 20px 0;
      font-size: 15px;
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        height: 32px;
        width: 70px;
        margin: 0 18px 15px 0;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: #888;

      }
       .active{
          color:#21b97a !important;
        }
    }
  }
    .btn {
    width: 80%;
    height: 45px;
    line-height: 45px;
    background-color: #21b97a;
    font-size: 16px;
    color: #fff;
    text-align: center;
    margin:0 auto;
  }
}
</style>
