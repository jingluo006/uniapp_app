<template>
  <view>
    <!-- 地址 -->
    <my-address></my-address>
    <!-- 购物车标志 -->
    <view class="cart-header">
      <uni-icons type="shop" size="18"></uni-icons>
      <text>购物车</text>
    </view>
    <!-- 商品项 -->
    <view class="goods-item">
      <uni-swiper-action>
        <block v-for="item in cart" :key="item.goods_id">
          <uni-swipe-action-item :autoClose="false" :right-options="options" @click="onDeleteClick(item)">
            <my-goods :goods="item" :radioShow="true" :state="item.goods_state" @radioChangeHandler="radioChange"
              @numChange="numChange"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swiper-action>
    </view>

    <!-- 底部 -->
    <my-settle></my-settle>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapState,
    mapMutations
  } from 'vuex'
  import badge from '@/mixin/tabbar-badge.js'
  export default {
    mixins: [badge],
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    computed: {
      ...mapState('m_cart', ['cart']),
    },
    methods: {
      // 更新商品状态        更新商品数量
      ...mapMutations('m_cart', ['updateGoodsState', 'updataGoodsNum', 'removeGoods']),
      // 单选框状态改变
      radioChange(goodsInfo) {
        this.updateGoodsState(goodsInfo)
        this.setTabBarBadge()
      },
      // 数量改变
      numChange(newVal) {
        this.updataGoodsNum(newVal)
        this.setTabBarBadge()
      },
      // 删除商品
      onDeleteClick(item) {
        this.removeGoods(item)
      }
    }
  }
</script>

<style lang="scss">
  .cart-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20rpx;
    height: 80rpx;
    border-bottom: 1px solid #eee;

    text {
      font-size: 28rpx;
      padding-left: 10rpx;
    }
  }
  .goods-item {
    margin-bottom: 50px;
  }
</style>
