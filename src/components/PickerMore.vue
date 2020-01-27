<template>
  <div class="pickerMore">
    <div class="roomType">
      <h3>户型</h3>
      <ul>
        <li v-for="(item,index) in roomTypeList" :key="item.value" :class="{'active':roomTypetLightIndexList.some(item => item === index)}" @click="handleRoomType(index)">{{item.label}}</li>
      </ul>
    </div>
    <div class="oriented">
      <h3>朝向</h3>
      <ul>
        <li v-for="(item,index) in orientedList" :key="item.value" :class="{'active':orientedLightIndexList.some(item => item === index)}" @click="handleoriented(index)">{{item.label}}</li>
      </ul>
    </div>
    <div class="floor">
      <h3>楼层</h3>
      <ul>
        <li v-for="(item,index) in floorList" :key="item.value" :class="{'active':floorLightIndexList.some(item => item === index)}" @click="handlefloor(index)">{{item.label}}</li>
      </ul>
    </div>
    <div class="characteristic">
      <h3>亮点</h3>
      <ul>
        <li v-for="(item,index) in characteristicList" :key="item.value" :class="{'active':characterLightIndexList.some(item => item === index)}" @click="handlecharacter(index)">{{item.label}}</li>
      </ul>
    </div>
    <div class="btn" @click="sure">确认</div>
  </div>
</template>

<script>
import { handlePickerMore } from '../utils/Func'
export default {
  data () {
    return {
      // 几室
      roomTypeList: [],
      // 几室高亮数据
      roomTypetLightIndexList: [],
      handleRoomTypeResult: '',
      // 朝向
      orientedList: [],
      // 朝向高亮数据
      orientedLightIndexList: [],
      handleOrientedResult: '',
      // 楼层
      floorList: [],
      // 楼层高亮数据
      floorLightIndexList: [],
      handleFloorResult: '',
      // 亮点
      characteristicList: [],
      // 楼层高亮数据
      characterLightIndexList: [],
      handleCharacterResult: '',
      // 请求数据
      dataArray: []

    }
  },
  created () {
    this.getCondition()
    this.dataArray = []
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
    // 处理几室高亮
    handleRoomType (index) {
      this.handleRoomTypeResult = handlePickerMore(index, this.roomTypetLightIndexList)
    },
    // 处理朝向高亮
    handleoriented (index) {
      this.handleOrientedResult = handlePickerMore(index, this.orientedLightIndexList)
    },
    // 处理楼层高亮
    handlefloor (index) {
      this.handleFloorResult = handlePickerMore(index, this.floorLightIndexList)
    },
    // 处理亮点高亮
    handlecharacter (index) {
      this.handleCharacterResult = handlePickerMore(index, this.characterLightIndexList)
    },
    sure () {
      for (let i = 0; i < this.handleRoomTypeResult.length; i++) {
        this.dataArray.push(this.roomTypeList[this.handleRoomTypeResult[i]].value)
      }
      for (let i = 0; i < this.handleOrientedResult.length; i++) {
        this.dataArray.push(this.orientedList[this.handleOrientedResult[i]].value)
      }
      for (let i = 0; i < this.handleFloorResult.length; i++) {
        this.dataArray.push(this.floorList[this.handleFloorResult[i]].value)
      }
      for (let i = 0; i < this.handleCharacterResult.length; i++) {
        this.dataArray.push(this.characteristicList[this.handleCharacterResult[i]].value)
      }
      this.dataArray = this.dataArray.join(',')
      this.$emit('closePickMore')
      console.log(this.dataArray)
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
