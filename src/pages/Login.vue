<template>
  <div>
   <cube-form
  :model="model"
  :schema="schema"
  :immediate-validate="false"
  :options="options"
  @validate="validateHandler"
  @submit="submitHandler"></cube-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      validity: {},
      valid: undefined,
      model: {
        usernameValue: ''
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: 'input',
                modelKey: 'usernameValue',
                label: '用户名',
                props: {
                  placeholder: '请输入用户名'
                },
                rules: {
                  required: true,
                  pattern: /^[a-zA-Z_\d]{5,8}$/
                },
                messages: {
                  required: '用户名不能为空',
                  pattern: '长度为5到8位'
                },
                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            fields: [
              {
                type: 'input',
                modelKey: 'passwordValue',
                label: '密码',
                props: {
                  placeholder: '请输入密码'
                },
                rules: {
                  required: true,
                  pattern: /^[a-zA-Z_\d]{5,12}$/
                },
                messages: {
                  required: '密码不能为空',
                  pattern: '长度为5到12位'
                },
                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            fields: [
              {
                type: 'submit',
                label: 'Submit'
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard' // classic fresh
      }
    }
  },
  methods: {
    submitHandler (e) {
      e.preventDefault()
      console.log('submit', e)
    },
    validateHandler (result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    }
  }
}
</script>

<style lang="less">
.cube-form_standard .cube-validator-msg-def{
  font-size: 12px !important;
}
</style>
