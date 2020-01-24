<template>
  <div class="profile">
    <div class="root">
      <!-- 头像部分 -->
      <div class="title">
        <img class="bg" :src="'http://localhost:8080/img/profile/bg.png'" />
        <div class="info">
          <div class="myIcon">
            <img class="avatar" :src="'http://localhost:8080/img/profile/avatar.png'" alt="icon" />
          </div>
          <div class="user">
            <div class="name">游客</div>
            <div class="auth">
              <span @click="toLogin">去登录</span>
            </div>
            <!-- <div class="edit">
              编辑个人资料
              <span class="arrow">
                <i class="iconfont icon-arrow" />
              </span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- 九宫格部分 -->
      <div class="grid">
        <div class="menuItem" v-for="item in menus" :key="item.id">
          <i :class="['iconfont',`${item.iconfont}`]" />
          <span>{{item.name}}</span>
        </div>
      </div>
      <!-- 加入图片 -->
      <div class="add">
        <img src="http://localhost:8080/img/profile/join.png" alt />
      </div>
    </div>
    <BottomFooter></BottomFooter>
  </div>
</template>

<script>
import BottomFooter from '../components/BottomFooter'
export default {
  components: {
    BottomFooter
  },
  data () {
    return {
      menus: [
        { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
        { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
        { id: 3, name: '看房记录', iconfont: 'icon-record' },
        { id: 4, name: '成为房主', iconfont: 'icon-identity' },
        { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
        { id: 6, name: '联系我们', iconfont: 'icon-cust' }
      ]
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  min-height: 300px;
  position: relative;
}

.bg {
  width: 100%;
}

.info {
  position: absolute;
  background: #fff;
  width: 85%;
  height: 55%;
  bottom: 0px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  box-shadow: 0px 0px 10px 3px #ddd;
  margin: 50px auto 0;
  padding: 0 20px;
  padding-top: 0;
  text-align: center;
  font-size: 13px;
}

.auth {
  margin: 30px 0;
  span{
  border-radius: 10px;
  color: #fff;
  padding: 8px 15px;
  background: #21b97a;
  font-size: 12px;
  }
}

.user {
  padding-top: 15px;
}

.myIcon {
  position: relative;
  transform: translateY(-50%);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  border: solid 5px #f5f5f5;
  display: inline-block;
  box-shadow: 0px 2px 2px #bdbdbd;
}
.avatar {
  width: 100%;
  border-radius: 50%;
}
.name {
  margin-top: -30px;
  margin-bottom: 10px;
}
.menuItem {
  float: left;
  width: 33.3%;
  padding: 10px 0;
  height: 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  i,
  span {
    line-height: 30px;
  }
}
.add{
  img{
    width:100%;
  }
}
</style>
