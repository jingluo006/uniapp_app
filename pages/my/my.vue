<template>
  <view class="my-container">
    <!-- 未登录 -->
    <my-login v-if="!token"></my-login>
    
    <!-- 登录后用户信息 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import badge from '@/mixin/tabbar-badge.js'
  export default {
    mixins: [badge],
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    }
  }
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
