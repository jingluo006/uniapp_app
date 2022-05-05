<template>
  <view>
    <view class="address-container" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <view class="address-info" @click="chooseAddress" v-else>
      <view class="name-phone">
        <!-- 姓名 -->
        <view class="username">
          <text>收货人：{{address.userName}}</text>
        </view>
        <!-- 电话 -->
        <view class="iphone">
          <text>电话：{{address.telNumber}}</text>
          <uni-icons type="arrowright" size="14"></uni-icons>
        </view>
      </view>
      <!-- 详细地址 -->
      <view class="detail-adress">
        <text class="text1">收货地址：</text>
        <text>{{addstr}}</text>
      </view>
    </view>
    <view class="bottom-img">
      <image src="/static/cart_border@2x.png"></image>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
      };
    },
    computed: {
      // 地址
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    },
    methods: {
      // 更新收货地址
      ...mapMutations('m_user', ['updateAddress']),
      // 选择收货地址
      async chooseAddress() {
        const [err, suc] = await uni.chooseAddress().catch(err => err)
        if(err === null && suc.errMsg === 'chooseAddress:ok') {
          this.updateAddress(suc)
        }
      }
    }
  }
</script>

<style lang="scss">
  .address-container {
    height: 180rpx;
    text-align: center;
    line-height: 200rpx;
  }

  .bottom-img {
    height: 3px;
    image {
      display: block;
      width: 100%;
      height: 3px;
    }
  }
  
  .address-info {
    display: flex;
    flex-direction: column;
    font-size: 26rpx;
    padding: 0 12rpx;
    .name-phone {
      display: flex;
      justify-content: space-between;
      margin: 20rpx 0;
    }
    .detail-adress {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 30rpx;
      .text1 {
        white-space: nowrap;
      }
    }
  }
</style>
