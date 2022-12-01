const express = require('express')
const app = express()
const port = 3000
const { join } = require("path");
const mongoose = require('mongoose')

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");
app.use(express.static(__dirname + '/public'));


async function main() {
    await mongoose
      .connect("mongodb://localhost:27017/prodClass")
      .then(() => {
        console.log("conected to Mongo");
      })
      .catch(() => {
        console.log("something in mongo whent wrong");
      });
  }
  
  main();

const UserRout = require('./routs/users')

app.use('/user',UserRout)


app.listen(port, ()=>{
    console.log(`listining to port ${port}`);
})