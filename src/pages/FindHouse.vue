<template>
  <div :class="{findhouse:true,ov:selectedLabel==='筛选'}">
    <!-- 顶部tabbar -->
    <div class="tabbar">
      <div
        v-for="(item,index) in tabs"
        :key="item.id"
        @click="changeLabel(item.label)"
        :class="{tab:true,green:(index===0&&glObj.area?true:'')||(index===1&&glObj.mode?true:'')||(index===2&&glObj.price?true:'')}"
      >{{item.label}}</div>
      <Picker :selectedLabel="selectedLabel" @getData="getData" @clearLabel="clearLabel"></Picker>
    </div>
    <!-- 房屋列表 -->
    <div class="houseDataList">
      <div class="house" v-for="(item,index) in houseList" :key="index">
        <div class="imgWrap">
          <img class="img" :src="'http://localhost:8080'+`${item.houseImg}`" alt />
        </div>
        <div class="content">
          <h3 class="title">{{item.title}}</h3>
          <div class="desc">{{item.desc}}</div>
          <div>
            <span
              v-for="(item1,index1) in item.tags"
              :key="index1"
              :class="['tag', `tag${index1 > 2 ? '3' : index1 + 1}`].join(' ')"
            >{{item1}}</span>
          </div>
          <div class="price">
            <span class="priceNum">{{item.price}}</span> 元/月
          </div>
        </div>
      </div>
    </div>
    <PickerMore v-if="selectedLabel==='筛选'"></PickerMore>
    <div class="mask" @click="hidePickerMore" v-if="selectedLabel==='筛选'"></div>
  </div>
</template>

<script>
import Picker from '../components/Picker'
import PickerMore from '../components/PickerMore'
export default {
  components: {
    Picker,
    PickerMore
  },
  data () {
    return {
      tabs: [
        { id: 1, label: '区域' },
        { id: 2, label: '方式' },
        { id: 3, label: '租金' },
        { id: 4, label: '筛选' }
      ],
      // 选中项
      selectedLabel: '',
      // 房屋列表
      houseList: [],
      // 处理高亮逻辑(父组件数据,根据他来判断)
      glObj: {}
    }
  },
  methods: {
    // 改变选项卡
    changeLabel (label) {
      this.selectedLabel = label
    },
    // 清空选项卡数据
    clearLabel (data) {
      this.selectedLabel = ''
      if (data) {
        this.glObj = data
      }
    },
    getData (data) {
      this.houseList = data
    },
    // 点击除导航栏的其他地方,隐藏Pickermore
    hidePickerMore () {
      this.selectedLabel = ''
    }
  }
}
</script>

<style lang="less" scoped>
.ov {
  overflow: hidden;
}
.findhouse {
  height: 100%;
  .tab {
    float: left;
    width: 25%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  /deep/ .cube-tab-bar {
    height: 40px;
    font-size: 16px;
  }
  .houseDataList {
    padding-top: 35px;
    padding-bottom: 50px;
    .house {
      height: 120px;
      position: relative;
      box-sizing: border-box;
      justify-content: space-around;
      padding-top: 18px;
      border-bottom: 1px solid #e5e5e5;
    }

    .imgWrap {
      float: left;
      width: 106px;
      height: 80px;
    }

    .img {
      width: 106px;
      height: 80px;
    }

    .content {
      overflow: hidden;
      line-height: 22px;
      padding-left: 12px;
    }

    .title {
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      font-size: 15px;
      color: #394043;
    }

    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      font-size: 12px;
      color: #afb2b3;
    }

    .price {
      font-size: 12px;
      color: #fa5741;
    }

    .priceNum {
      font-size: 16px;
      font-weight: bolder;
    }

    .tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 5px;
      margin-right: 5px;
      line-height: 12px;
    }
    .tag1 {
      color: #39becd;
      background: #e1f5f8;
    }
    .tag2 {
      color: #3fc28c;
      background: #e1f5ed;
    }
    .tag3 {
      color: #5aabfd;
      background: #e6f2ff;
    }
  }
  .green {
    color: #3fc28c;
  }
  .mask {
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
