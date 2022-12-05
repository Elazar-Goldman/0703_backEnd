const express = require("express");
const app = express();
const Router = require("express").Router();
const Product = require("../models/prods");
// this end point is to find all product by a specific seller
Router.get("/showSelected/:id", async (req, res) => {
  let sellerId = req.params.id;
  let allProds = await Product.find({ seller: sellerId });

  res.send(allProds);
});

Router.get("/showAll", async (req, res) => {
  let allProds = await Product.find({});

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
    res.send(myRes);
  } catch (err) {
    console.log(err);
  }
});

Router.get("/", (req, res) => {
  res.send("we are so so cool");
});

module.exports = Router;
