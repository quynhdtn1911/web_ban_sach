const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    publisher: String,
    publishedDate: Date,
    generes: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author'
    },
    price: Number,
    image: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('book', bookSchema)