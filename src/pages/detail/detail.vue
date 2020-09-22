<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <CommentList type="user" :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model='comment'
                class='textarea'
                :maxlength='100'
                placeholder='请输入图书短评'></textarea>
      <div class='location'>
          地理位置：
          <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
          <span class='text-primary'>{{location}}</span>
      </div>
      <div class='phone'>
          手机型号：
          <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
          <!--  switch   开关选择器-->
          <span class='text-primary'>{{phone}}</span>
      </div>
      <button class="btn" @click='addComment'>
        评论
      </button>
    </div>
    <div v-else class='text-footer'>
      未登录或者已经评论过啦
    </div>
    <button open-type='share' class="btn">转发给好友</button>
  </div>
</template>

<script>
	import BookInfo from '@/components/bookInfo.vue'
	import CommentList from '@/components/commentList.vue'
	import {get, post, showModal} from '@/utils/util'
	
	export default {
		data () {
		  return {
		    userInfo: {},
		    comment: '',
		    comments: [],
		    location: '',
		    phone: '',
		    bookId: '',
		    info: {}
		  }
		},
		computed:{
			showAdd () {
			  if (!this.userInfo.openId) {
			    // 没登录
			    return false
			  } else if (this.comments.filter(v => v.openId === this.userInfo.openId).length) {
			    // 检测数值元素，并返回符合条件所有元素的数组
			    // 已经登录且有自己的评论
			    return false
			  } else {
			    // 登录且没有评论
			    return true
			  }
			}
		},
		mounted(){
			this.bookId = this.$root.$mp.query.id
			this.getDetail()
			this.userInfo = mpvue.getStorageSync('userInfo')
			this.getComments()
		},
		methods:{
			async getDetail () {
			  this.info = await get('/weapp/bookDetail', {id: this.bookId})
			},
			// 获取地理位置
			getGeo (e) {
			  const ak = 'nrt8bkPw5eRRyN8SGRTdFDSyV40futcF'
			  const url = 'http://api.map.baidu.com/reverse_geocoding/v3/'
			  if (e.target.value) {
			    mpvue.getLocation({
			      success: geo => {
			        mpvue.request({
			          url,
			          data: {
			            ak,
			            location: `${geo.latitude},${geo.longitude}`,
			            output: 'json'
			          },
			          success: res => {
			            if (res.data.status === 0) {
			              this.location = res.data.result.addressComponent.city
			            } else {
			              this.location = '未知地点'
			            }
			          }
			        })
			      }
			    })
			  } else {
			    this.location = ''
			  }
			},
			// 获取手机型号
			getPhone (e) {
			  // 判断是否选中
			  if (e.target.value) {
			    // mpvue.getSystemInfoSync(): 获取系统信息     .model: 手机型号
			    const phoneInfo = mpvue.getSystemInfoSync()
			    this.phone = phoneInfo.model
			  } else {
			    this.phone = ''
			  }
			},
			// 获取评论
			async getComments () {
			  const commentList = await get('/weapp/commentList', {bookId: this.bookId})
			  this.comments = commentList.list || []
			},
			async addComment () {
			  const data = {
			    openId: this.userInfo.openId,
			    bookId: this.bookId,
			    phone: this.phone,
			    comment: this.comment,
			    location: this.location
			  }
			  try {
			    await post('/weapp/addComment', data)
			    this.comment = ''
			    this.getComments()
			  } catch (e) {
			    showModal('失败', e.msg)
			  }
			}
		},
		components:{
			BookInfo,
			CommentList
		}
	}
</script>

<style>
</style>
