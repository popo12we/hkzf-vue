<template>
  <div class="login">
     <TopHeader></TopHeader>
     <div class="loginform">
        <div class="un">
      <cube-input v-model="username" placeholder="请输入用户名"></cube-input>
      <cube-validator v-model="usernamevalid" :model="username" :rules="usernamerules" :messages="usernamemessages"></cube-validator>
    </div>
    <div class="pwd">
      <cube-input v-model="password" placeholder="请输入密码"></cube-input>
      <cube-validator v-model="passwordvalid" :model="password" :rules="passwordrules" :messages="passwordmessages"></cube-validator>
    </div>
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
  }
}
</script>

<style lang="less">
 .loginform>div{
   margin:20px;
 }
 .cube-input-field{
   background-color: rgb(232, 240, 254);
 }
</style>
