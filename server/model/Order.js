const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    bookOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book_order',
        }
    ],
    address: String,
    status: Number,
    shipment: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('order', orderSchema)