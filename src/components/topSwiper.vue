<template>
	<div class="swiper">
		<!--  indicator-dots    ：是否显示面板指示点
		      indicator-color   ：指示点颜色
		      indicator-active-color:当前选中的指示点颜色
		      autoplay           :是否自动切换
		      interval           :自动切换时间间隔
		      duration           :滑动动画时长
		      circular           :是否采用衔接滑动
		      display-multiple-items:同时显示的滑块数量
		-->
		<swiper :indicator-dots="true"
                :autoplay="true"
                interval="6000"
                duration="1000"
                :circular="true"
                display-multiple-items="3">
			<block v-for="(top,index) in tops" :key="index">
				<swiper-item>
					<img :src="top.image" @click="bookDefault(top.id)">
				</swiper-item>
			</block>		
		</swiper>
	</div>
</template>
	
<script type="text/ecmascript-6">
	export default {
		props:['tops'],
		methods:{
			bookDefault(id){
				mpvue.navigateTo({
					url: '/pages/detail/main?id=' + id
				})
			}
		}
	}
</script>

<style>
	.swiper{
	  margin-top:5px;
	}
	.slide-image{
	  width:33%;
	  height:250rpx;
	}	
</style>
