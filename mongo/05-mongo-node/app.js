const express = require("express");
const app = express();
const port = 3000;
const { join } = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// EJS
app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");
app.use(express.static(__dirname + "/public"));
// Cookies & sessions

const sessionConfig = {
  secret: "iHaveASecrete",
  resave: false,
  saveUninitialized: false,
};

app.use(cookieParser("mySecretKeyShh!"));
app.use(session(sessionConfig));

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

// this require recives all data that was exported from the file of the path
// the path is the argument that require recevied
const UserRout = require("./routs/users");
const ProdsRout = require("./routs/prods");

// the applicaiton will alwayes use the varable (e.g UserRout) when a http request for the path
// the varable is the second argument
// path is the first arguemnt
// hint == press ctl + click on the variablem, and it will lead you to the file
app.use("/user", UserRout);
app.use("/prods", ProdsRout);

app.listen(port, () => {
  console.log(`listining to port ${port}`);
});
