const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookId, openId} = ctx.request.query
    try {
        const commsql = mysql('comments')
            .select('comments.*', 'userInfo.uId')
            .join('userInfo', 'userInfo.openId', 'comments.openId')
            // .where('bookId', bookId)
        let commentList
        if (bookId) {
            commentList = await commsql.where('bookId', bookId)
        } else if (openId) {
            commentList = await commsql.where('openId', openId)
        }
        ctx.start.data = {
            list: commentList.map(v => {
                const info = JSON.parse(v.uId)
                return Object.assign({}, v, {
                    title: info.nickName,
                    image: info.avatarUrl
                })
            })
        }
    } catch (e) {
        ctx.start = {
            code: -1,
            data: {
                msg: '获取评论失败' + e.sqlMessage
            }
        }
    }
}
