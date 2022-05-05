<template>
  <view class="bottom-container">
    <view class="bottom-text">
      <label class="radio">
          <radio color="#C00000" :checked="isAllChecked" @click="radioChange"/><text>全选</text>
        </label>
        <view class="price-total">
          合计:<text>￥{{totalPrice | priceFixed}}</text>
        </view>
        <view class="payment">
          <text>结算({{total}})</text>
        </view>
      </view>
    </view>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import bus from '@/eventBus.js'
  export default {
    name:"my-settle",
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters('m_cart', ['total', 'allTotal','totalPrice']),
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