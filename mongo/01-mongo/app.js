// All of the packages that I install
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// All of my variables
const port = 3000;

// connecting to mongodb "basketball collection"
async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/basketball")
    .then(() => {
      console.log("conected to Mongo");
    })
    .catch(() => {
      console.log("something in mongo whent wrong");
    });
}

main();

const userSchama = new mongoose.Schema({
  name: String,
  jersey: Number,
  role: String,
  team: String,
});

const User = mongoose.model("user", userSchama);

const Eli = new User({
  name: "Eli",
  jersey: 9,
  role: "Point Gard",
  team: "100 gates",
});

const addUser = async () => {
  let query = await Eli.save();
  console.log(query);
};

addUser()
  .then((data) => {
    console.log("We Are in");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`You are listining to port ${port}`);
});
