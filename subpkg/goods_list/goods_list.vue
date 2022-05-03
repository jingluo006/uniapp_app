<template>
  <view>
    <view class="goods-list" v-for="(item, i) in goodsList" :key="item.cat_id" @click="gotoDetail(item)">
      <!-- 左侧图片 -->
      <view class="goods-img">
        <image :src="item.goods_small_logo"></image>
      </view>
      <!-- 右侧内容 -->
      <view class="goods-container">
        <text>{{item.goods_name}}</text>
        <view class="goods-price">
          ￥{{item.goods_price | priceFixed}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryInfo: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        // 下拉请求防抖
        flag: false
      }
    },
    onLoad(options) {
      this.queryInfo.query = options.query || ''
      this.queryInfo.cid = options.cid || ''
      this.getGoodsList()
    },
    filters: {
      priceFixed(str) {
        return Number(str).toFixed(2)
      }
    },
    methods: {
      async getGoodsList(cb) {
        this.flag = true
        const {data: res} = await uni.$http.get('/goods/search', this.queryInfo)
        if(res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        this.flag = false
        cb && cb()
        console.log(this.goodsList)
      },
      // 点击图片跳转商品详情页
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    onPullDownRefresh() {
      this.goodsList = []
      this.total = 0
      this.queryInfo.pagenum = 1
      this.queryInfo.pagesize = 10
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    onReachBottom() {
      if(this.queryInfo.pagenum * this.queryInfo.pagesize >= this.total) return uni.$showMsg('没有更多啦')
      if(this.flag) return
      
      this.queryInfo.pagenum += 1
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">
.goods-list {
  display: flex;
  justify-content: space-around;
  padding: 15rpx;
  border-bottom: 1px solid #eee;
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
    .goods-price {
      font-size: 36rpx;
      color: #C00000;
    }
  }
}
</style>
