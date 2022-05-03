<template>
  <view>
    <!-- 顶部搜索框 -->
    <view class="search-box">
      <uni-search-bar @input="searchInputChange" :radius="100" :cancelButton="'none'" :bgColor="'#fff'"></uni-search-bar>
    </view>
    <!-- 历史消息列表 -->
    <view class="history-list">
      <!-- 上层 -->
      <view class="history-head">
        <text>搜索历史</text>
        <uni-icons type="trash" size="18" @click="clearHistory"></uni-icons>
      </view>
      <!-- 下层 -->
      <view class="history-bottom">
        <uni-tag inverted :text="item" v-for="(item, i) in revHistories" :key="i"></uni-tag>
      </view>
    </view>
    <!-- 搜索列表 -->
    <view class="search-list">
      <view class="search-item" v-for="(item, i) in searchList" :key="item.goods_id" @click="gotoDetail(item)">
        <text>{{item.goods_name}}</text>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchList: [],
        historyList: ['a', 'apple', 'app'],
        revHistories: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
      this.reverseHisList()
    },
    methods: {
      searchInputChange(e) {
        if(this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 500)
      },
      // 根据关键字获取信息
      async getSearchList() {
        if(this.kw.trim() === '') return this.searchList = []
        const {data: res} = await uni.$http.get('/goods/qsearch', {query: this.kw})
        if( res.meta.status !== 200) return uni.$showMsg()
        // 去重
        this.changeHistList()
        //翻转
        this.reverseHisList()
        
        this.searchList = res.message
      },
      // 点击列表项跳往详情页
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 翻转历史搜索
      reverseHisList() {
         this.revHistories = [...this.historyList].reverse()
      },
      // 去重
      changeHistList() {
        // 放入历史搜索列表
        this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        // 将搜索历史持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清空搜索历史
      clearHistory() {
        this.revHistories = []
        uni.removeStorageSync('kw')
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  height: 90rpx;
  background-color: #FFCFE8;
  padding: 10rpx 0;
}
.search-list {
  padding: 10rpx;
  .search-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    border-bottom: 1px solid #cfcfcf;
    text {
      font-size: 26rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
// 搜索历史
.history-list {
  .history-head{
    display: flex;
    justify-content: space-between;
    padding: 20rpx 20rpx 15rpx;
    border-bottom: 1px solid #ccc ;
    text {
      font-size: 13px;
    }
  }
  .history-bottom{
    height: 20px;
    margin-top: 10rpx;
    .uni-tag {
      margin-right: 8px;
    }
  }
}
</style>
