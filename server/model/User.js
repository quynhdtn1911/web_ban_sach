const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    gender: Number,
    dob: Date,
    phone: String,
    address: String,
    role: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)