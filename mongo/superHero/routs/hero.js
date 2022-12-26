const express = require("express");
const app = express();
const Router = require("express").Router();
const mongoose = require('mongoose')
const Hero = require('../modles/hero')

async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/heroDB")
    .then(() => {
      console.log("conected to Mongo");
    })
    .catch(() => {
      console.log("something in mongo whent wrong");
    });
}

main();

Router.get("/addPower", async (req, res) => {
  let allHero =await Hero.find({});

  res.render("hero/index.ejs", { allHero });
});

// To make a post we will need EJS or POSTMAN
Router.post("/addPower", async (req, res) => {
  const { name, country, superPower, partner } = req.body
  let hero = new Hero({
name, country, superPower, partner
  })

 let resoults = await hero.save();
 console.log(resoults);
  res.render('index.ejs');
});

// Navgaatiion rout - To make nagation we will need EJS
Router.get("/addOne", (req, res) => {
  res.render("addHero.ejs");
});

Router.get("/", (req, res) => {
  res.send("No wayyyyy I maide it");
});
module.exports = Router;
