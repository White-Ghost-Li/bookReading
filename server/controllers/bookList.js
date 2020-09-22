
const mysql = require('../qcloud.js')

module.exports = async (ctx) => {
	const {page, openId} = ctx.request.query
	console.log('page='+page+',openId='+openId)
	const size = 3
	const mysqlSelect = await mysql('books')
					.select('books.*','userInfo.userName')
					.join('userInfo','books.openId','userInfo.openId')
					.orderBy('books.id',desc)
	let bookList
	if(openId){
		bookList = await mysqlSelect.where('books.openId',openId)
	}else{
		bookList = await mysqlSelect.limit(size).offset(Number(page)*size)
	}
	ctx.state.data = {
		list: bookList.map(v=>{
			const info = JSON.parse(v.userName)
			return Object.assign({},v,{
				userName:{
					nickName: info.nickName
				}
			})
		})
	}
}