const express = require("express");
const app = express();

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

});

// userSchama.pre("save", async function (next) {
//   const user = this;
//   this.favColor = "green";
//   console.log("please show me this" + this);
//   next();
// });

// userSchama.pre('deleteOne', function (next) {
//   const user = this;
//   console.log(user.email);

//   if (user.email == "tona@gmail.com") {
//     console.log("what is up");
//     console.log("I am tuna");
//     throw new error("we do not harm tona");
//   } else {
//     next();
//   }
// });

const User = mongoose.model("user", userSchema);

module.exports = User;
