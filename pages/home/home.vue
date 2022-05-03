<template>
  <view>
    <!-- 顶部搜索框 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="item.goods_id" class="swiperitem">
        <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航区域 -->
    <view class="cate-list">
      <view class="cate-item" v-for="(item, i) in cateList" :key="i" @click="navHandlerClick(item)">
        <image :src="item.image_src" mode=""></image>
      </view>
    </view>
    
    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" mode="widthFix"></image>
        <!-- 右侧区域 -->
        <view class="floor-container">
          <navigator class="left" :url="item.product_list[0].navigator_url">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
          </navigator>
          <view class="right">
            <navigator class="right-img" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.navigator_url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图数据
        swiperList: [],
        // 分类导航数据
        cateList: [],
        // 楼层数据
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getCateList(),
      this.getFloorList()
    },
    methods: {
      // 顶部搜索
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      // 获取轮播图数据
      async getSwiperList() {
        const {data: res} = await uni.$http.get('/home/swiperdata')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      // 获取分类导航数据
      async getCateList() {
        const {data: res} = await uni.$http.get('/home/catitems')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
      },
      // 点击分类跳转
      navHandlerClick(item) {
        if(item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取楼层数据
      async getFloorList() {
        const {data: res} = await uni.$http.get('/home/floordata')
        if(res.meta.status !== 200) return uni.$showMsg()
        // 修改跳转地址
        res.message.forEach(item => {
          item.product_list.forEach(item2 => {
            item2.navigator_url = '/subpkg/goods_list/goods_list?' + item2.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
        console.log(this.floorList);
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  // 轮播图
swiper {
  height: 330rpx;
  .swiperitem,
  navigator,
  image{
      width: 100%;
      height: 100%;
  }
}
// 分类导航
.cate-list {
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  .cate-item {
    image {
      width: 128rpx;
      height: 140rpx;
    }
  }
}
// 楼层
.floor-item {
  margin-bottom: 15rpx;
}
.floor-container {
  display: flex;
  padding: 0 8rpx;
  .right {
    display: flex;
    flex-wrap: wrap;
    .right-img {
      margin: 0 6rpx;
    }
  }
}
</style>
