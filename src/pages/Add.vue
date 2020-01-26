<template>
  <div class="add">
    <TopHeader></TopHeader>
    <!-- 中间内容部分 -->
    <div class="add-content">
      <div class="add-title">房源信息</div>
      <!-- 小区名称 -->
      <div class="add-area-name">
        <div class="area-name">小区名称</div>
        <div class="area-write" @click="goToSearch">
          <i class="cubeic-arrow"></i>
          <div v-if="!communityName">请输入小区名称</div>
          <div v-if="communityName">{{communityName}}</div>
        </div>
      </div>
      <!-- 租金 -->
      <div class="rent-money">
        <div class="rent-money-title">租金</div>
        <div class="rent-money-mouth">￥/月</div>
        <div class="rent-money-input">
          <input v-model="publish.price" type="text" placeholder="请输入租金/月" />
        </div>
      </div>
      <!-- 面积 -->
      <div class="rent-measure">
        <div class="rent-measure-title">建筑面积</div>
        <div class="rent-measure-mouth">㎡</div>
        <div class="rent-measure-input">
          <input v-model="publish.size" type="text" placeholder="请输入建筑面积" />
        </div>
      </div>
      <!-- 户型 -->
      <div class="choose-measure">
        <div class="choose-measure-name">户型</div>
        <div class="choose-measure-write" @click="handleroomType">
          <i class="cubeic-arrow" v-if="!rT"></i>
          <div v-if="!rT">请选择</div>
          <div  v-if="rT">{{rT}}</div>
        </div>
      </div>
      <!-- 楼层 -->
      <div class="floor">
        <div class="floor-name">所在楼层</div>
        <div class="floor-write" @click="handlefloor">
         <i class="cubeic-arrow" v-if="!fl"></i>
          <div v-if="!fl">请选择</div>
          <div  v-if="fl">{{fl}}</div>
        </div>
      </div>
      <!-- 朝向 -->
      <div class="direction">
        <div class="direction-name">朝向</div>
        <div class="direction-write" @click="handleoriented">
          <i class="cubeic-arrow" v-if="!ore"></i>
          <div v-if="!ore">请选择</div>
          <div  v-if="ore">{{ore}}</div>
        </div>
      </div>
      <!-- 房屋标题 -->
      <div class="house-title">房屋标题</div>
      <div class="house-title-input">
        <input type="text" v-model="publish.title" placeholder="请输入标题（例如：整租 小区名 2室 5000元）" />
      </div>
      <!-- 图片上传 -->
      <cube-upload :simultaneous-uploads="3" @file-submitted="fileSubmitted" />
      <div class="btn" @click="publishData">发布房源</div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader'
import { handlePickerData } from '../utils/Func'
export default {
  components: {
    TopHeader
  },
  data () {
    return {
      // 房屋类型
      roomTypeData: [
        { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
        { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
        { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
        { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
        { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
      ],

      // 朝向：
      orientedData: [
        { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
        { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
        { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
        { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
        { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
        { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
        { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
        { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
      ],

      // 楼层
      floorData: [
        { label: '高楼层', value: 'FLOOR|1' },
        { label: '中楼层', value: 'FLOOR|2' },
        { label: '低楼层', value: 'FLOOR|3' }
      ],

      communityName: JSON.parse(localStorage.getItem('searchObj')).name || '',
      // 处理图片上传数组
      tempList: [],
      // 显示在页面中的房屋类型
      rT: '',
      // 显示在页面中的楼层
      fl: '',
      // 显示在页面中的朝向
      ore: '',
      // 请求数据
      publish: {
        // 小区名称
        community: JSON.parse(localStorage.getItem('searchObj')).value,
        title: '',
        description: '',
        oriented: '',
        supporting: '',
        price: '',
        roomType: '',
        size: '',
        floor: '',
        // 处理图片数据
        houseImg: ''
      }
    }
  },
  methods: {
    goToSearch () {
      this.$router.push('/search')
    },
    // 显示朝向
    handleoriented () {
      this.orientedData = handlePickerData(this.orientedData)
      if (!this.orientedPicker) {
        this.orientedPicker = this.$createCascadePicker({
          title: '朝向',
          data: this.orientedData,
          onSelect: this.selectoriented
        })
      }
      this.orientedPicker.show()
    },
    // 处理确定朝向
    selectoriented (oriented) {
      this.publish.oriented = oriented[0]
      let result = this.orientedData.filter(item => item.value === oriented[0])
      this.ore = result[0].label
    },

    // 显示楼层
    handlefloor () {
      this.floorData = handlePickerData(this.floorData)
      if (!this.floorPicker) {
        this.floorPicker = this.$createCascadePicker({
          title: '楼层',
          data: this.floorData,
          onSelect: this.selectfloor
        })
      }
      this.floorPicker.show()
    },
    // 处理确定楼层
    selectfloor (floor) {
      this.publish.floor = floor[0]
      let result = this.floorData.filter(item => item.value === floor[0])
      this.fl = result[0].label
    },

    // 显示房屋类型
    handleroomType () {
      this.roomTypeData = handlePickerData(this.roomTypeData)
      if (!this.roomTypePicker) {
        this.roomTypePicker = this.$createCascadePicker({
          title: '房屋类型',
          data: this.roomTypeData,
          onSelect: this.selectroomType
        })
      }
      this.roomTypePicker.show()
    },
    // 处理确定房屋类型
    selectroomType (roomType) {
      this.publish.roomType = roomType[0]
      let result = this.roomTypeData.filter(item => item.value === roomType[0])
      this.rT = result[0].label
    },
    async fileSubmitted (e) {
      const form = new FormData()
      this.tempList.push(e)
      this.tempList.forEach(item => {
        // 当前接口中要求上传文件的键名为：file
        form.append('file', item.file)
      })
      const res = await this.$axios.post('/houses/image', form, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      this.publish.houseImg = res.body.join('|')
    },
    async publishData () {
      const res = await this.$axios.post('/user/houses', this.publish)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.add-content {
  margin: 0 15px;
  font-size: 15px;
  color: #777;
  .add-title {
    height: 40px;
    line-height: 40px;
    color: #21b97a;
    border-bottom: 1px solid #eee;
  }
  .add-area-name {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .area-name,
    .area-write {
      float: left;
      width: 50%;
    }
    .area-write {
      text-align: right;
      > div,
      i {
        float: right;
      }
    }
  }
  .rent-money {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .rent-money-title {
      float: left;
      width: 99px;
      letter-spacing: 2em;
    }
    .rent-money-input {
      overflow: hidden;
      height: 44px;
      input {
        width: 100%;
        height: 100%;
        display: block;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      input::-moz-input-placeholder {
        color: #ccc;
      }
      input::-ms-input-placeholder {
        color: #ccc;
      }
    }
    .rent-money-mouth {
      float: right;
    }
  }
  .rent-measure {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .rent-measure-title {
      float: left;
      width: 99px;
    }
    .rent-measure-input {
      overflow: hidden;
      height: 44px;
      input {
        width: 100%;
        height: 100%;
        display: block;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      input::-moz-input-placeholder {
        color: #ccc;
      }
      input::-ms-input-placeholder {
        color: #ccc;
      }
    }
    .rent-measure-mouth {
      float: right;
    }
  }
  .choose-measure {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .choose-measure-name {
      letter-spacing: 2em;
      width: 50%;
      float: left;
    }
    .choose-measure-write {
      float: left;
      width: 50%;
    }
    .choose-measure-write {
      text-align: right;
      > div,
      i {
        float: right;
      }
    }
  }
  .floor {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .floor-name,
    .floor-write {
      float: left;
      width: 50%;
    }
    .floor-write {
      text-align: right;
      > div,
      i {
        float: right;
      }
    }
  }
  .direction {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    .direction-name,
    .direction-write {
      float: left;
      width: 50%;
    }
    .direction-name {
      letter-spacing: 2em;
    }
    .direction-write {
      text-align: right;
      > div,
      i {
        float: right;
      }
    }
  }
  .house-title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
  }
  .house-title-input {
    height: 40px;
    line-height: 40px;
    input {
      width: 100%;
      height: 100%;
      display: block;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
    input::-moz-input-placeholder {
      color: #ccc;
    }
    input::-ms-input-placeholder {
      color: #ccc;
    }
  }
  .btn {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #21b97a;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
</style>
