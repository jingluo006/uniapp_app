<template>
  <view v-if="goodsList.goods_name">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsList.pics" :key="item.pics_id">
        <image :src="item.pics_big_url" @click="previewImg(i)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品详细信息 -->
    <view class="goods--container">
      <!-- 价格 -->
      <view class="goods-price">￥{{goodsList.goods_price | numToFixed}}</view>
      <!-- 详细信息 -->
      <view class="goods-info">
        <view class="goods-text">
          {{goodsList.goods_name}}
        </view>
        <view class="goods-icon">
          <uni-icons type="star" size="16"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 快递 -->
      <view class="goods-express">
        <text>快递：免运费</text>
      </view>
    </view>

    <!-- 底部图片 -->
    <rich-text :nodes="goodsList.goods_introduce"></rich-text>

    <!-- 底部导航 -->
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsId: null,
        goodsList: [],
        // 底部导航数据
        options: [{
          icon: 'shop',
          text: '店铺',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    onLoad(options) {
      this.goodsId = options.goods_id
      this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        const {
          data: res
        } = await uni.$http.get('/goods/detail', {
          goods_id: this.goodsId
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = res.message
        console.log(res);
      },
      // 预览图片
      previewImg(i) {
        uni.previewImage({
          current: i,
          urls: this.goodsList.pics.map(item => item.pics_big_url)
        })
      },
      // 底部导航
      onClick(e) {
        console.log(e);
        if(e.content.text === '购物车')
        uni.navigateTo({
          url: '/pages/cart/cart'
        })
      },
      buttonClick(e) {
      }
    },
    filters: {
      numToFixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods--container {
    margin: 20rpx 10rpx;

    .goods-price {
      font-size: 36rpx;
      color: #C00000;
    }

    .goods-info {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 0;

      .goods-text {
        font-size: 28rpx;
      }

      .goods-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 120rpx;
        font-size: 28rpx;
        color: gray;
        border-left: 1px solid #efefef;
      }
    }

    .goods-express {
      font-size: 28rpx;
      color: gray;
    }
  }
  .uni-goods-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
