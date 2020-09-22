<template>
	<div class="year">
		<progress :percent="parsen" show-info stroke-width="3" activeColor="red"/>
		<p>{{year}}已经过去了{{days}}天，{{parsen}}%</p>
	</div>
</template>

<script>
	export default {
		computed:{
			yeas(){
				return new Date().getFullYear()
			},
			days(){
				const start = new Date()
				start.setMonth(0)
				start.setDate(1)
				const offset = new Date().getTime() - start.getTime()
				return parseInt(offset / 1000 / 60 / 60 / 24) + 1
			},
			parsen(){
				var percent = 1
				if (this.year % 400 === 0) {
				  percent = this.days * 100 / 366
				} else if (this.year % 4 === 0 && this.year % 100 !== 0) {
				  percent = this.days * 100 / 366
				} else {
				  percent = this.days * 100 / 365
				}
				return percent.toFixed(1)
			}
		}
	}
</script>

<style>
	
</style>
