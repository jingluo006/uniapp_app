<template>
  <view class="my-search-container" :style="{backgroundColor: backgroundColor}" @click="goSearch">
    <view class="my-search-box" :style="{borderRadius: radius + 'rpx'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="search-text">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      backgroundColor: {
        type: String,
        default: "#FFCFE8"
      },
      radius: {
        type: Number,
        default: 30
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      goSearch() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  height: 90rpx;
  // background-color: #C00000;
  padding-top: 15rpx;
  box-sizing: border-box;
  .my-search-box {
    height: 60rpx;
    margin: 0 30rpx;
    background-color: #fff;
    // border-radius: 30rpx;
    text-align: center;
    line-height: 60rpx;
    .search-text {
      padding-left: 6rpx;
    }
  }
}
</style>