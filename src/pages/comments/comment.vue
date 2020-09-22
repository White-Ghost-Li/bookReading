<template>
  <div class="container">
    <CommentList v-if='userInfo.openId'
                 type='user'
                 :comments="comments"></CommentList>
    <div v-if='userInfo.openId'>
      <div class="page-title">我的图书</div>
      <Card
        v-for='book in books'
        :key='book.id'
        :book='book'></Card>
      <div v-if='!books.length'>暂时还没添加过书，快去添加几本把</div>
    </div>
  </div>
</template>

<script>
import {get} from '@/utils/util'
import commentList from '@/components/commentList'
import card from '@/components/card'
export default {
  data () {
    return {
      userInfo: {},
      comments: [],
      books: []
    }
  },
  methods: {
    init () {
      mpvue.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      mpvue.hideNavigationBarLocading()
    },
    async getBooks () {
      this.books = await get('/weapp/bookList', {
        openId: this.userInfo.openId
      }).list || []
    },
    async getComments () {
      const commentList = await get('/weapp/commentList', {openId: this.userInfo.openId})
      this.comments = commentList.list || []
    }
  },
  // 监听用户下拉动作
  onPullDownRefresh () {
    this.init()
    mpvue.stopPullDownRefresh()       // 停止下拉刷新
  },
  // 生命周期，页面显示
  onShow () {
    if (!this.userInfo.openId) {
      let userInfo = mpvue.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.init()
      }
    }
  },
  components: {
    commentList,
    card
  }
}
</script>

<style>

</style>
