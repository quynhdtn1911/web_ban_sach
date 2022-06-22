const cartRouter = require('./cart')
const bookRouter = require('./book')
const authorRouter = require('./author')
const authRouter = require('./auth')
const orderRouter = require('./order')

const router = (app) => {
    app.use('/cart', cartRouter)
    app.use('/book', bookRouter)
    app.use('/author', authorRouter)
    app.use('/auth', authRouter)
    app.use('/order', orderRouter)
}

module.exports = router