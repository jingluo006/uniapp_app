<template>
  <view>
    <!-- 顶部搜索框 -->
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧 -->
      <scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
        <!-- 一级分类 -->
        <view :class="i1 === active ? 'active' : ''" v-for="(cate1, i1) in cateList" :key="cate1.cat_id" @click="cate1Change(i1)">{{cate1.cat_name}}</view>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view scroll-y="true" class="right-scroll-view" :style="{height: wh + 'px'}">
      <!-- 二级分类 -->
      <view class="cate2-item" v-for="(cate2, i2) in cateList[active].children" :key="cate2.cat_id">
        <view class="cate2-title">/{{cate2.cat_name}}/</view>
        <!-- 三级分类 -->
        <view class="cate3-lev">
          <navigator class="cate3-item" v-for="(cate3, i3) in cate2.children" :key="cate3.cat_id" @click="gotoGoodsList(cate3)">
            <image :src="cate3.cat_icon" mode="widthFix"></image>
            <text>{{cate3.cat_name}}</text>
          </navigator>
        </view>
      </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        // 分类数据
        cateList: [],
        active: 0
      };
    },
    onLoad() {
      // 获取当前系统的值,为高度动态赋值
      const syncInfo = uni.getSystemInfoSync()
      this.wh = syncInfo.windowHeight - 45
      // 获取分类数据
      this.getCateList()
    },
    methods: {
      // 顶部搜索
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      // 获取分类数据
      async getCateList() {
        const {data: res} = await uni.$http.get('/categories')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        console.log(this.cateList);
      },
      // 点击左侧列表时
      cate1Change(i) {
        this.active = i
      },
      // 点击三级分类跳转商品列表
      gotoGoodsList(cate3) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + cate3.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    view {
      line-height: 120rpx;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 24rpx;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: '';
          display:block;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -50%);
          width: 6rpx;
          height: 60rpx;
          background-color: #C00000;
        }
      }
    }
  }
  .right-scroll-view {
    .cate2-item {
      display: flex;
      flex-direction: column;
      .cate2-title {
        text-align: center;
        font-weight: 700;
      }
      .cate3-lev {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 40rpx;
      .cate3-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        image {
          width: 60px;
          height: 60px;
        }
        text {
          font-size: 12px;
        }
      }
      }
    }
  }
}
</style>
