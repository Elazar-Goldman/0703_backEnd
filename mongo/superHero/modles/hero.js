const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const heroSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    country:String,
    superPower:String,
    partner:String
})

const Hero = mongoose.model('hero', heroSchema);

module.exports= Hero