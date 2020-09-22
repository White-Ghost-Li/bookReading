const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {openId, bookId, comment, phone, location} = ctx.request.body
    try {
        await mysql('comments').insert({openId, bookId, comment, phone, location})
        ctx.start.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.start = {
            code: -1,
            data: {
                // 显示SQL里面具体的错误
                msg: '评论失败：' + e.sqlMessage
            }
        }
    }
}
