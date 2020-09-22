const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const tops = await mysql('books').select('*').limit('count', 'desc')
    ctx.state.data = {
        tops: tops
    }
}
