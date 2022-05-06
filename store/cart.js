export default {
  namespaced: true,

  state: () => ({
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    // 添加商品
    addToCart(state, goods) {
      // 查找是否存在这件商品
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }

      this.commit('m_cart/saveCartToStorage')
    },
    // 将商品信息存储到本地
    saveCartToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新商品状态
    updateGoodsState(state, newStateInfo) {
      const findResult = state.cart.find(item => item.goods_id === newStateInfo.goods_id)
      if (findResult) {
        findResult.goods_state = newStateInfo.goods_state
        this.commit('m_cart/saveCartToStorage')
      }
    },
    // 更新商品数量
    updataGoodsNum(state, newNum) {
      const findResult = state.cart.find(item => item.goods_id === newNum.goods_id)
      if (findResult) {
        findResult.goods_count = newNum.newVal
        this.commit('m_cart/saveCartToStorage')
      }
    },
    //删除商品
    removeGoods(state, removeGoods) {
      state.cart = state.cart.filter(item => item.goods_id !== removeGoods.goods_id)
      this.commit('m_cart/saveCartToStorage')
    },
    // 底部全选框变化
    changeState(state, isChecked) {
      state.cart.forEach(item => {
        item.goods_state = isChecked
        this.commit('m_cart/saveCartToStorage')
      })
    }
  },

  getters: {
    // 勾选条数
    total(state) {
      return state.cart.filter(item => item.goods_state).reduce((total, i) => total += i.goods_count, 0)
    },
    // 总条数
    allTotal(state) {
      return state.cart.reduce((total, i) => total += i.goods_count, 0)
    },
    // 总价格
    totalPrice(state) {
      return state.cart.filter(item => item.goods_state).reduce((totalPrice,i) => totalPrice += i.goods_count * i.goods_price, 0)
    }
  }
}
