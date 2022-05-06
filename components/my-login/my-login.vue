<template>
  <view class="login-container">
    <view class="icon">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    </view>
    <view class="login">
      <button type="primary" class="login-button" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    </view>
    <view class="text">
      <text>登录后尽享更多权益</text>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['userinfo'])
    },
    methods: {
      // 更新用户信息
      ...mapMutations('m_user', ['updateUserInfo','updataToken']),
      // 获取并保存用户信息
      getUserInfo(e) {
        this.updateUserInfo(e.detail.userInfo)
        
        this.getToken(e.detail)
      },
      // 获取用户token
      async getToken(info) {
        const [err, succ] = await uni.login().catch(err => err)
        if(err || succ.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
        // 请求token的参数
        const queryInfo = {
          code: succ.code,
          encryptedData: info.encryptedData,
          rawDatarawData: info.rawData,
          iv: info.iv,
          signature: info.signature
        }
        // 接口有问题，获取不到, 写死一个
        // const {data: res} = await uni.$http.post('/users/wxlogin', queryInfo)
        // if(res.meta.status !== 200) return uni.$showMsg('token获取失败')
        this.updataToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    position: relative;
    width: 100%;
    height: 700rpx;
    background-color: #F4F4F4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    &::after {
      content: ' ';
      width: 100%;
      height: 30px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }
    .login {
      width: 90%;
      height: 90rpx;
      margin-bottom: 20rpx;

      .login-button {
        background-color: #C00000;
        border-radius: 45rpx;
      }
    }
    .text {
      font-size: 13px;
      color: gray;
    }
  }
</style>
