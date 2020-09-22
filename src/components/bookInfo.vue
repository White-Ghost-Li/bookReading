<template>
    <div class='bookInfo'>
      <div class="thumb">
        <img class='back'
             :src="info.image"
             mode='aspectFill'>
        <!-- aspectFit	缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。
        也就是说，可以完整地将图片显示出来。-->
        <!-- aspectFill	缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。
        也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。-->
        <img class="img"
             :src="info.image"
             mode='aspectFit'
        >
        <div class="info">
          <div class="title">
            {{info.title}}
          </div>
          <div class="author">
            {{info.author}}
          </div>
        </div>
      </div>
      <div class="detail">
        <img :src="info.userinfo.image" class='avatar' mode='aspectFit'>
        {{userinfo.name}}
        <div class="right text-primary">
          {{info.rate}}分
          <star :value='info.rate'></star>
        </div>
      </div>
      <div class="detail">
        {{info.publisher}}
        <div class="right">
          {{info.price}}
        </div>
      </div>
      <div class="tags">
        <div class="badge" :key='tag' v-for='tag in info.tags'>{{tag}}</div>
      </div>
      <div class="summary">
        <p :key='i' v-for='(sum,i) in info.summary'>{{sum}}</p>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import star from './star'
  export default {
    props: ['info'],
    components: {
      star
    }
  }
</script>

<style>
  .bookInfo{
    font-size: 14px;
 }
	.badge{
      display: inline-block;
      margin:5px;
      padding:5px;
      border-radius: 10px;
      border:1px #EA5A49 solid;
      color:#EA5A49;
    }
    .summary{
      padding:0 15px;
      margin-top:10px;
    }
	.summary  p{
        text-indent: 2em;
        font-size:14px;
    }
    .right{
      float: right;
    }
    .detail{
      padding:5px 10px;
    }
	.detail .avatar{
        width:20px;
        height:20px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .thumb{
      width:750rpx;
      height:500rpx;
      overflow:hidden;
      position: relative;
    }
	.thumb .back{
        filter: blur(15px);
        width:100%;
    }
    .img{
        position: absolute;
        width:100%;
        height:300rpx;
        left:0;
        top:30rpx;
    }
    .info{
      color:white;
      position: absolute;
      width:100%;
      left:0;
      top:330rpx;
      text-align: center;
    }
	.info .title{
          font-size:20px;
    }
    .author{
       font-size: 14px;
    }
</style>
