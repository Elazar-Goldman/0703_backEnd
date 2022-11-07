const express = require("express");
const app = express();
const mysql = require("mysql");
const { join } = require("path");

// this is to convert json

const port = 3000;

app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_db",
});

let insertProcduct = () => {
  let inserFruit = `INSERT INTO products(\`title\`, \`body\`, \`price\`, \`cat_id\`)
VALUES("Banana", "A Banan that is good for the boddy", 7.88, 1),
("Apple", "A Apple that is good for the boddy", 4.99, 1)
`;
  connection.query(inserFruit, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};

const selectProds = async () => {
  let query = `SELECT * FROM products`;

  let data = await connection.query(query, (err, reoult) => {
    if (err) console.log(err);
    console.log(reoult);
  });
  console.log(data);
  return data;
};

//  selectProds()
let myFavFruits = ["Pomala", "Banana", "Orange", "watermalon", "pineappel"];
let choseFruit = () => {
  let rand = Math.floor(Math.random() * 5);
  return myFavFruits[rand];
};

app.get("/fruits", async (req, res) => {
  let myArr;
  let query = `SELECT * FROM products`;
  await connection.query(query, (err, reoult) => {
    if (err) console.log(err);
    myArr = reoult;
    res.render("index.ejs", { reoult });
  });
});

// insertProcduct();
// selectProds();

app.listen(port, () => {
  console.log(`listining on port ${port}`);
});
