<template>
  <div @click="clickHandle">
    <div class="userinfo" @click="bindViewTap">
      <!-- <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" /> -->
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />      
    </div>
	<year-progress></year-progress>
	<button @click="login">登陆</button>
    <div class="all">        
        <button @click="scanCode">添加书籍</button>        
    </div>
  </div>
</template>

<script>
import yearProgress from '@/components/yearProgress'
import {post,showModal,showSuccess} from '@/utils/util.js'
import qcloud from 'wafer2-client-sdk'
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
	yearProgress
  },

  methods: {
	bindViewTap () {
	    const url = '/pages/logs/main'
	    if (mpvuePlatform === 'wx') {
	      mpvue.switchTab({ url })
	    } else {
	      mpvue.navigateTo({ url })
	    }
	},
	clickHandle (ev) {
	    console.log('clickHandle:', ev)
	    // throw {message: 'custom test'}
	},
    login(){
		const user = mpvue.getStorageSync('userInfo')
		const self = this
		if(!user){
			// qcloud.setLoginUrl('http://localhost:5757/weapp/login')
			mpvue.login({
				success: (res) => {
					if(res.code){
						console.log(res)
						mpvue.request({
							url: 'http://localhost:5757/weapp/login',
							data: res,
							success: (userInfo) =>{
								showSuccess('登陆成功')
								console.log(userInfo)
								mpvue.setStorageSync('userInfo',userInfo.data.data)
								self.userInfo = userInfo.data.data
							}
						})
					}else{
						config.log('登录失败'+res.errMsg)
					}					
				}
			})
		}else{
			this.userInfo = user
		}
	},
	scanCode(){
		mpvue.scanCode({
			// onlyFromCamera: true,	// 只允许从相机扫码
			success: (res) =>{
				if(res.result){
					this.addBook(res.result)
				}
			}
		})
	},
	async addBook(isbn){
		console.log('isbn='+isbn)
		console.log(this.userInfo)
		const result = await post('/weapp/addBook',{
			isbn,
			openId: this.userInfo.openId
		})
		console.log(result)
		if(result.code === 0 && result.data.title){
			showModal('添加成功',`${result.data.title}添加成功`)
		}
	}
  },

  created () {
    // let app = getApp()
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

.all{
  width:7.5rem;
  height:1rem;
  background-color:#AAAAAA;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
</style>
