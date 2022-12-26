const express = require("express");
const app = express();
const port = 3000;
const { join } = require("path");

const MyHero = require("./routs/hero.js");

app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");
app.use(express.static(__dirname + "/public"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/hero", MyHero);

app.get("/", (req, res) => {
  res.send("WE have started");
});

app.listen(port, () => {
  console.log(`you are listining to port ${port}`);
});
