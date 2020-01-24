<template>
  <div class="login">
    <TopHeader></TopHeader>
    <div class="loginform">
      <div class="un">
        <cube-input v-model="username" placeholder="请输入用户名"></cube-input>
        <cube-validator
          v-model="usernamevalid"
          :model="username"
          :rules="usernamerules"
          :messages="usernamemessages"
        ></cube-validator>
      </div>
      <div class="pwd">
        <cube-input v-model="password" placeholder="请输入密码"></cube-input>
        <cube-validator
          v-model="passwordvalid"
          :model="password"
          :rules="passwordrules"
          :messages="passwordmessages"
        ></cube-validator>
      </div>
      <div class="submit" @click="login">登 录</div>
    </div>
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
      username: '',
      password: '',
      usernamevalid: undefined,
      passwordvalid: undefined,
      usernamerules: {
        required: true,
        pattern: /^[a-zA-Z_\d]{3,8}$/
      },
      passwordrules: {
        required: true,
        pattern: /^[a-zA-Z_\d]{5,12}$/
      },
      usernamemessages: {
        pattern: '长度为5到8位，只能出现数字、字母、下划线',
        required: '用户名不能为空'
      },
      passwordmessages: {
        pattern: '长度为5到12位，只能出现数字、字母、下划线',
        required: '密码不能为空'
      }
    }
  },
  methods: {
    async login () {
      let { status, body: { token } } = await this.$axios.post('/user/login', {
        username: this.username,
        password: this.password
      })
      if (status === 200) {
        localStorage.setItem('token', token)
        this.$router.push('/home/profile')
      }
    }
  }
}
</script>

<style lang="less">
.loginform {
  margin: 20px;
}
.loginform > div {
  margin: 20px 0;
}
.cube-input-field {
  background-color: rgb(232, 240, 254);
}
.submit {
  width: 100%;
  background-color: rgb(28, 182, 118);
  color: #fff;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
}
</style>
