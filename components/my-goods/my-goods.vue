<template>
  <view class="goods-container">
    <label class="radio" v-if="radioShow">
      <radio color="#C00000" :checked="isChecked" @click="radioChange" /><text></text>
    </label>
    <view class="goods-list">
      <!-- 左侧图片 -->
      <view class="goods-img">
        <image :src="goods.goods_small_logo"></image>
      </view>
      <!-- 右侧内容 -->
      <view class="goods-container">
        <text @click="gotoDetail(goods)">{{goods.goods_name}}</text>
        <view class="goods-info">
          <view class="goods-price">
            ￥{{goods.goods_price | priceFixed}}
          </view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="radioShow" @change="numBoxChange"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import bus from '@/eventBus.js'
  import {
    mapState
  } from 'vuex'
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      radioShow: {
        type: Boolean,
        default: false
      },
      state: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isChecked: this.state
      };
    },
    created() {
      bus.$on('allRadioChange', val => {
        this.isChecked = val
      })
    },
    filters: {
      priceFixed(str) {
        return Number(str).toFixed(2)
      }
    },
    computed: {
      ...mapState('m_cart', ['cart']),
      // isChecked() {
      //   const findResult = this.cart.filter(item => item.goods_id === this.goods.goods_id)
      //   return findResult.goods_state
      // }
    },
    methods: {
      // 点击图片跳转商品详情页
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 单选框状态改变
      radioChange(e) {
        this.$emit('radioChangeHandler', {
          goods_id: this.goods.goods_id,
          goods_state: !this.isChecked
        })
        this.isChecked = !this.isChecked
      },
      // 商品数量增减
      numBoxChange(val) {
        this.$emit('numChange', {
          goods_id: this.goods.goods_id,
          newVal: +val
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-container {
    display: flex;
    align-items: center;
  }

  .goods-list {
    display: flex;
    justify-content: space-around;
    padding: 15rpx;
    border-bottom: 1px solid #eee;

    .radio {
      align-self: center;
    }

    .goods-img {
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .goods-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 13px;
      margin-left: 15rpx;
      .goods-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .goods-price {
          font-size: 36rpx;
          color: #C00000;
        }
      }
    }
  }
</style>
