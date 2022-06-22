const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    year: String
}, {
    timestamps: true
})

module.exports = mongoose.model('author', authorSchema)