const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookOrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'book'
    },
    quantity: Number,
    status: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('book_order', bookOrderSchema)