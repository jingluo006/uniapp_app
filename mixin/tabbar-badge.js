import { mapGetters } from 'vuex'

export default {
  onShow() {
    this.setTabBarBadge()
  },
  
  computed: {
    // 商品总数
    ...mapGetters('m_cart', ['total'])
  },
  methods: {
    setTabBarBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}