const express = require('express')
const app = express()
const Router = require('express').Router()
const { json } = require("body-parser");
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { render } = require('ejs');



// navagation to regester
Router.post('/regester',async (req,res)=>{
    // this gets data from fom
    let {email, password,userName} = req.body
    // salt - is the delay that we place on hasded password
    // hash is the encrypted data 
let salt = 10
let pw=  await bcrypt.hash(password, salt)

// I am writing req.body.email so that you can see where the data is coming from 
let key = await User.find({email: req.body.email})
// this if is to check that the email is not exisiting
console.log(key);
if(key){
res.send("Your email is allready takin")
}  else{ 
  
let user = new User({
    name:userName,
    email,
    password: pw
})

let resoult =  await user.save()
console.log(resoult);

    res.send(req.body)
}
})

// navagation to regester
Router.get('/regester',(req,res)=>{
    res.render('users/regester.ejs')
})

// login 
Router.post('/enter',async (req,res)=>{
let {email, password} = req.body
let user = await User.findOne({email: req.body.email})

let pw = user.password

console.log(pw);
console.log(password);

let parPw = await bcrypt.compare(  req.body.password, pw)
console.log(parPw);
if(parPw){

     res.render('prods/index.ejs')
}else{
    res.send("here was a prolem")
}
})




// Navgation Rout to signup form
Router.get('/',(req,res)=>{



    res.render("users/login.ejs")
})

module.exports = Router;