<template>
  <view class="userInfo-container">
    <!-- 头部 -->
    <view class="info-header">
      <view class="img">
        <image :src="userInfo.avatarUrl"></image>
      </view>
      <view class="username">
        <text>{{userInfo.nickName}}</text>
      </view>
    </view>
    <!-- 主体区域 -->
    <view class="info-body">
      <!-- 上 -->
      <view class="body-header">
        <view class="body-head-item">
          <text>8</text>
          <text>收藏的店铺</text>
        </view>
        <view class="body-head-item">
          <text>14</text>
          <text>收藏的商品</text>
        </view>
        <view class="body-head-item">
          <text>18</text>
          <text>关注的商品</text>
        </view>
        <view class="body-head-item">
          <text>84</text>
          <text>足迹</text>
        </view>
      </view>
      <!-- 中 -->
      <view class="body-mid">
        <view class="mid-title">
          <text class="my-title">我的订单</text>
        </view>
        <view class="mid-icon">
          <view class="icon-item">
            <image src="/static/my-icons/icon1.png"></image>
            <text>待付款</text>
          </view>
          <view class="icon-item">
            <image src="/static/my-icons/icon2.png"></image>
            <text>待收货</text>
          </view>
          <view class="icon-item">
            <image src="/static/my-icons/icon3.png"></image>
            <text>退款/退货</text>
          </view>
          <view class="icon-item">
            <image src="/static/my-icons/icon4.png"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 下 -->
      <view class="body-bottom">
        <view class="bottom-item">
          <text>收货地址</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
        <view class="bottom-item">
          <text>联系客服</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
        <view class="bottom-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState, mapMutations
  } from 'vuex'
  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'token', 'address'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo','updataToken','updateAddress']),
      // 退出登录
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
        if(succ && succ.confirm) {
          this.updateUserInfo({})
          this.updataToken('')
          this.updateAddress({})
        }

      }
    }
  }
</script>

<style lang="scss">
  .userInfo-container {
    background-color: #efefef;
    height: 100%;
  }

  .info-header {
    height: 400rpx;
    background-color: #FFCFE8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;

    .img {
      width: 100px;
      height: 100px;

      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        box-shadow: 0 1px 5px black;
      }
    }

    .username {
      font-size: 16px;
      font-weight: bold;
      margin: 10px;
    }
  }

  // 主体区域
  .info-body {
    width: 94%;
    margin-left: 24rpx;
    height: 300px;
    position: relative;
    top: -15px;

    .body-header {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100rpx;
      background-color: #fff;

      .body-head-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 13px;
      }
    }

    .body-mid {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      margin-top: 10px;

      .mid-title {
        font-size: 17px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        padding-left: 10px;
      }

      .mid-icon {
        display: flex;
        padding-top: 10px;

        .icon-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 15px;

          image {
            width: 40px;
            height: 40px;
          }

          text {
            margin: 3px 0 6px;
          }
        }
      }
    }

    .body-bottom {
      padding: 0 5px;
      background-color: #fff;
      margin-top: 10px;

      .bottom-item {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
