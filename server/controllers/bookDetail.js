const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'userInfo.*')
        .join('userInfo', 'books.openId', 'userInfo.uid')
        .where('id', id)
        .first()
    const info = JSON.parse(detail.userInfo)
    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(','), // 以逗号为分割点，分成数组
        summary: detail.summary.split('\n'), // 以换行为分割点，分成数组
        user_info: {
            name: info.nickName,
            image: info.avatarUrl
        }
    })
    await mysql('books')
        .where('id', id)
        .increment('count', 1) // count浏览量累加
}
