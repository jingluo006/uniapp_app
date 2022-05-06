export default {
  namespaced: true,

  state: {
    address: JSON.parse(uni.getStorageSync('address') || "{}"),
    token: uni.getStorageSync('token'),
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
  },

  mutations: {
    // 更新并保存地址
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 更新并保存用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // 更新token
    updataToken(state,val) {
      state.token = val
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    }
  },

  getters: {
    // 详细地址
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
