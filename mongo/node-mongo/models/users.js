const express = require('express')
const app = express()

const mongoose = require('mongoose')

const userSchama = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = mongoose.model('user', userSchama);

module.exports = User