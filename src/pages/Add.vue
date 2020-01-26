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
          <input v-model="publish.price" type="text" placeholder="请输入建筑面积" />
        </div>
      </div>
      <!-- 选择面积 -->
      <div class="choose-measure">
        请选择
        <i class="cubeic-arrow"></i>
      </div>
      <!-- 小区名称 -->
      <div class="floor">
        <div class="floor-name">所在楼层</div>
        <div class="floor-write">
          <i class="cubeic-arrow"></i>
          <div>请选择</div>
        </div>
      </div>
      <!-- 小区名称 -->
      <div class="direction">
        <div class="direction-name">朝向</div>
        <div class="direction-write">
          <i class="cubeic-arrow"></i>
          <div>请选择</div>
        </div>
      </div>
      <!-- 房屋标题 -->
      <div class="house-title">房屋标题</div>
      <div class="house-title-input">
        <input type="text" placeholder="请输入标题（例如：整租 小区名 2室 5000元）" />
      </div>
      <!-- 图片上传 -->
      <cube-upload
  :simultaneous-uploads="3"
  @file-submitted="fileSubmitted"/>
    </div>
    <button @click="publishData">发布房源</button>
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
      communityName: JSON.parse(localStorage.getItem('searchObj')).name || '',
      // 处理图片上传数组
      tempList: [],
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
    text-align: center;
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
}
</style>
