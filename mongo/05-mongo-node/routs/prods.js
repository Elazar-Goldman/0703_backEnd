const express = require("express");
const app = express();
const Router = require("express").Router();
const Product = require("../models/prods");
const User = require("../models/users");
// const session = require('express-session')
// const { all } = require("./users");

// A Dema rout for testing geting sessions
Router.get("/myCars", (req, res) => {
  const { oldCar } = req.session;
  res.send(oldCar);
});
// A Dema rout for testing setting sessions
Router.get("/cars", (req, res) => {
  req.session.oldCar = "Fiat";
  req.session.newCar = "BMW";
  console.log(req.session.newCar);
  console.log(req.session.oldCar);
  res.send(req.cookies.name);
});

// A Dema rout for testing getting cookies
Router.get("/monster", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies.cart);
});

// A Dema rout for testing setting cookies
Router.get("/cookie", (req, res) => {
  // saving sting to cookie
  res.cookie("name", "Eli");
  // saving Object to cookie
  res.cookie("cart", {
    apple: 12,
    bananna: 9,
    orange: 6,
  });
  // set time out
  res.cookie("Testing", "time", {
    expires: new Date(Date.now() + 2000),
  });

  res.send("in cookie");
});

// this end point is to Delete a single product by ID
Router.get("/delete/:id", async (req, res) => {
  let prodId = req.params.id;
  try {
    let deletedProd = await Product.deleteOne({ _id: prodId });

    res.redirect("/prods");
  } catch (err) {
    console.log(err);
  }
});

// this end point is to Delete a single product by ID
Router.post("/update/:id", async (req, res) => {
  let prodId = req.params.id;
  let { title, descrip, cost, seller } = req.body;
  let updateProd = await Product.updateOne(
    { _id: prodId },
    { title, descrip, cost, seller }
  );

  res.redirect("/prods");
});

// Navgation rout for updadte
Router.get("/update/:id", async (req, res) => {
  let prodId = req.params.id;
  let prod = await Product.findById(prodId);

  let allUsers = await User.find();

  res.render("prods/update.ejs", { allUsers, prod });
});

// this end point is to find all product by a specific seller
Router.get("/showSelected/:id", async (req, res) => {
  let sellerId = req.params.id;
  let allProds = await Product.find({ seller: sellerId });

  res.send(allProds);
});

Router.post("/addProd", async (req, res) => {
  // geting the varables from the request
  let { title, descrip, cost, seller } = req.body;

  cost = typeof parseInt(cost) != "number" ? 1 : parseInt(cost);

  let myProd = new Product({
    title,
    descrip,
    cost,
    seller,
  });
  try {
    let myRes = await myProd.save();
    console.log(myRes);
    res.redirect("/prods");
  } catch (err) {
    console.log(err);
  }
});

// This is a navagation endpoint

Router.get("/add", async (req, res) => {
  let allUsers = await User.find({});
  console.log(allUsers);
  res.render("prods/addProd.ejs", { allUsers });
});
// Main rout for the index view
Router.get("/", async (req, res) => {
  try {
    let allProds = await Product.find({});
    console.log(allProds);
    res.render("prods/index.ejs", { allProds });
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
