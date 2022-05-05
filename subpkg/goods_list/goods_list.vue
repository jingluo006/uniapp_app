<template>
  <view>
    <block v-for="(item, i) in goodsList" :key="item.cat_id">
      <my-goods :goods="item"></my-goods>
    </block>
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
    methods: {
      async getGoodsList(cb) {
        this.flag = true
        const {
          data: res
        } = await uni.$http.get('/goods/search', this.queryInfo)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        this.flag = false
        cb && cb()
        console.log(this.goodsList)
      },
    },
    onPullDownRefresh() {
      this.goodsList = []
      this.total = 0
      this.queryInfo.pagenum = 1
      this.queryInfo.pagesize = 10
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    onReachBottom() {
      if (this.queryInfo.pagenum * this.queryInfo.pagesize >= this.total) return uni.$showMsg('没有更多啦')
      if (this.flag) return

      this.queryInfo.pagenum += 1
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">
 
</style>
