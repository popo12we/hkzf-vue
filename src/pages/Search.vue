<template>
  <div class="search">
    <div class="search-top">
      <p>取消</p>
      <div class="search-input">
        <input type="text" placeholder="请输入小区名称" v-model="area" @keyup="searchArea(area)" />
      </div>
    </div>
    <div class="search-content">
       <ul>
         <li v-for="item in searchList" :key="item.community" @click="chooseSearchList(item.communityName,item.community)">{{item.communityName}}</li>
       </ul>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data () {
    return {
      area: '',
      // 防抖函数
      fn: '',
      searchList: []
    }
  },
  created () {
    // 防抖函数
    this.fn = debounce(async val => {
      const { status, body } = await this.$axios.get('/area/community', {
        params: {
          name: val,
          id: localStorage.getItem('cityvalue')
        }
      })
      if (status === 200) {
        this.searchList = body
      }
    }, 800)
  },
  methods: {
    searchArea (val) {
      this.fn(val)
    },
    chooseSearchList (name, value) {
      console.log(name, value)
      let obj = {
        name,
        value
      }
      obj = JSON.stringify(obj)
      localStorage.setItem('searchObj', obj)
      this.$router.push('add')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 44px;
  background-color: #f6f5f6;
  .search-input {
    overflow: hidden;
    input {
      display: block;
      margin-top: 7px;
      margin-left: 7px;
      width: 100%;
      height: 30px;
      text-indent: 1em;
    }
  }
  p {
    float: right;
    width: 44px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 15px;
    color: #6b7072;
  }
  li{
    height: 40px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color:#666;
    text-indent: 1em;
    line-height: 40px;
  }
}
</style>
