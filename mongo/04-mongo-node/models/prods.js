const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  title: String,
  descrip: String,
  cost: { type: Number, require: true },
  seller: String,
});

prodSchema.pre('save', function (next) {
  const product = this;
  console.log(product);
  if (product.cost < 0) {
    product.cost = 1;
  }

  next();
});

const Product = mongoose.model("product", prodSchema);

module.exports = Product;
