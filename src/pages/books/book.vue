<template>
	<div>
		<topSwiper :tops="tops"></topSwiper>
		<div class="bookList">
			<card v-for="(book,index) in bookList" :key="index" :book="book"></card>
		</div>
	</div>
</template>

<script>
	import topSwiper from '../../components/topSwiper.vue'
	import card from '../../components/card.vue'
	import {get} from '../../utils/util.js'
	export default {
		data(){
			return {
				bookList: [],
				page: 0,
				more: true,
				tops: []
			}
		},
		mounted () {
			this.getList()		// 获取列表信息
			this.getTops()
		},
		onPullDownRefresh(){		// 下拉刷新方法
			this.getList()			
		},
		onReachBottom(){			// 上拉获取更多
			if(!this.more){
				return false
			}
			this.page += 1
			this.getList()
		},
		components:{
			card,
			topSwiper
		},
		methods:{
			async getList(init){
				if (init) {
				  this.page = 0
				  this.more = true
				}
				mpvue.showNavigationBarLoading()	// 显示隐藏状态
				const books = await get('/weapp/bookList',{page:this.page})
				if(books.list.length<3 && page>0){
					this.more = false
				}
				console.log(books)
				if(init){
					this.bookList = books.list		 // 初次赋值
					mpvue.shopPullDownRefresh()		 // 停止刷新
				} else {
					this.bookList = this.bookList.concat(books.list)	//非第一次，累加
				}
				mpvue.hodeNavigationBarLoading()	//隐藏刷新状态
			},
			async getTops(){
				this.tops = await get('/weapp/tops')
			}
		}
	}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}
</style>
