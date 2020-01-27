import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    more: ''
  },
  mutations: {
    // 购物车添加
    send (state, payload) {
      state.more = payload
    }
  },
  actions: {
    sendOne (context, obj) {
      context.commit('send', obj)
    }
  }
})
