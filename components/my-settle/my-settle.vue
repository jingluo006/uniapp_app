<template>
  <view class="bottom-container">
    <view class="bottom-text">
      <label class="radio">
        <radio color="#C00000" :checked="isAllChecked" @click="radioChange" /><text>全选</text>
      </label>
      <view class="price-total">
        合计:<text>￥{{totalPrice | priceFixed}}</text>
      </view>
      <view class="payment" @click="settlement">
        <text>结算({{total}})</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  import bus from '@/eventBus.js'
  export default {
    name: "my-settle",
    data() {
      return {
        seconds: 3,
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['total', 'allTotal', 'totalPrice']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      // 是否全选
      isAllChecked() {
        return this.total === this.allTotal
      }
    },
    filters: {
      priceFixed(str) {
        return Number(str).toFixed(2)
      }
    },
    methods: {
      ...mapMutations('m_cart', ['changeState']),
      // 全选框状态改变
      radioChange() {
        this.changeState(!this.isAllChecked)
        bus.$emit('allRadioChange', this.isAllChecked)
      },
      // 结算
      settlement() {
        if (!this.total) return uni.$showMsg('请选择要购买的商品')

        if (!this.addstr) return uni.$showMsg('请选择收货地址')

        // if(!this.token) return uni.$showMsg('请先登录')
        if (!this.token) return this.goToLogin()

        this.payOrder()
      },
      // 跳转登录页面
      goToLogin() {
        this.seconds = 3
        this.showTips(this.seconds)

        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            uni.switchTab({
              url: '/pages/my/my',
            })
            return clearInterval(this.timer)
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      // 展示提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算! ' + n + ' 秒后跳转登录页面',
          mask: true,
          duration: 1500
        })
      },
      // 支付
      async payOrder() {
        // 1.1 组织订单的信息对象
        const orderInfo = {
          // 开发期间，注释掉真实的订单价格，
          // order_price: this.checkedGoodsAmount,
          // 写死订单总价为 1 分钱
          order_price: 0.01,
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }
        const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 1.3 得到服务器响应的“订单编号”
        const orderNumber = res.message.order_number
        // 2. 订单预支付
        // 2.1 发起请求获取订单的支付信息
        const {
          data: res2
        } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
          order_number: orderNumber
        })
        // 2.2 预付订单生成失败
        if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
        // 2.3 得到订单支付相关的必要参数
        const payInfo = res2.message.pay
        // 3. 发起微信支付
        // 3.1 调用 uni.requestPayment() 发起微信支付
        const [err, succ] = await uni.requestPayment(payInfo)
        // 3.2 未完成支付
        if (err) return uni.$showMsg('订单未支付！')
        // 3.3 完成了支付，进一步查询支付的结果
        const {
          data: res3
        } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
          order_number: orderNumber
        })
        // 3.4 检测到订单未支付
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        // 3.5 检测到订单支付完成
        uni.showToast({
          title: '支付完成！',
          icon: 'success'
        })
      }
    }
  }
</script>

<style lang="scss">
  .bottom-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #ccc;
    background-color: #fff;

    .bottom-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding-left: 10rpx;

      .price-total {
        text {
          font-size: 18px;
          color: #C00000;
        }
      }

      .payment {
        width: 240rpx;
        height: 100%;
        background-color: #C00000;
        color: white;
        text-align: center;
        line-height: 50px;
      }
    }
  }
</style>
