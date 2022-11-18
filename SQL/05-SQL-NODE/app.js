const express = require("express");
const app = express();
const mysql = require("mysql");
const { join } = require("path");
// const { render } = require("ejs");

// this is to convert json

const port = 3000;

app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

// this line allows to connect all static assits
app.use(express.static(join(__dirname, "public")));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_db",
});

let cars = [
  ["Kia", "2017", 100000],
  ["Mitsubishi", "2017", 150000],
  ["Tesla", "2017", 250000],
];

let oldCars = [
  {
    brand: "Ford",
    model: "model T",
    year: 1988,
    color: 1,
  },
  {
    brand: "Chevrolet",
    model: "Camero",
    year: 1992,
    color: 1,
  },
  {
    brand: "Dodge",
    model: "Challenger",
    year: 1995,
    color: 1,
  },
];

// how to change Json
app.get("/changeGame", (req, res) => {
  let query = "SELECT games from games";

  connection.query(query, (err, resoult) => {
    if (err) console.log(err);

    let myJSON = resoult;

    let jsRes = JSON.parse(resoult);
    jsRes[0].games.board2 = "Monpuily";
    let newJson = JSON.stringify(jsRes);
    let backJSON = JSON.parse(newJson);
    let queryUpdtae = `UPDATE games
    SET games = ${backJSON}
    WHERE user_id = 2
    `;
  });
});

// endpoint to add games
app.post("/addGames/:user_id", (req, res) => {
  // thuis is to alllow for a new varable name
  let id = req.params.user_id;
  let games = JSON.stringify(req.body);
  let query = `INSERT INTO games(user_id, games) VALUES 
  (${id},'${games}')`;
  connection.query(query);
  res.render("games.ejs");
});

// a navagtion endpoint for Games
app.get("/addGame", (req, res) => {
  res.render("games.ejs");
});

let inserIntro = `INSERT INTO products(\`title\`, \`body\`, \`price\`, \`cat_id\`)
VALUES`;

let msg = "";

oldCars.forEach((car, index) => {
  let sign = index === oldCars.length - 1 ? ";" : ",";
  msg += `("${car.brand}","${car.model}", ${car.year},${car.color})${sign}`;
});
let builtQuer = inserIntro + msg;

let insertProcduct = () => {
  let inserFruit = builtQuer;
  connection.query(inserFruit, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};

// insertProcduct();

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

  let { title, body, pricem, catId } = req.body;
  let inserFruit = `INSERT INTO products(\`title\`, \`body\`, \`price\`, \`cat_id\`)
  VALUES(${title}, ${body}, ${pricem}, ${catId}),

  `;
  connection.query(inserFruit, (err, result) => {
    if (err) console.log(err);
    res.render("add.ejs");
  });

  return myFavFruits[rand];
};
// END pond to get carts of cart number
app.get("/cart/:cart_num", async (req, res) => {
  // user ID will be recived in login
  let userId = 2;
  // This is JS, This is desrtocution of an object
  let { cart_num } = req.params;
  //
  let stud = {
    name: "Eli",
    car: "Fiat",
    City: "Jerusalem",
  };

  let { name, car, City } = stud;

  let query = `SELECT total, prod_num, users.name, products.title, products.body FROM shoping_cart
   JOIN users
    ON shoping_cart.user_id = ${userId} 
    JOIN products 
    ON shoping_cart.prod_id = products.id 
    WHERE cart_num = ${cart_num};`;

  connection.query(query, (err, resoult) => {
    if (err) console.log(err);
    console.log(resoult);

    res.render("cart.ejs", { resoult });
  });
});

app.post("/list/:cartId/:prodId/:prodPrice", (req, res) => {
  let { cartId, prodId, prodPrice } = req.params;
  let { total_prod } = req.body;
  let totalCost = +prodPrice * +total_prod;
  // user ID will be recived in login
  let userId = 2;
  let query = `INSERT INTO shoping_cart (\`user_id\`, \`prod_id\`, \`total\`, \`prod_num\`,\`cart_num\` ) VALUES
(${userId},${prodId},${totalCost},${total_prod}, ${cartId});`;

  connection.query(query, (err, resoult) => {
    if (err) console.log(err);
    console.log(resoult);
  });
  res.redirect("/fruits");
});

app.get("/cart/:cartId/:prodId/:prodPrice", (req, res) => {
  let { cartId, prodId, prodPrice } = req.params;
  console.log(req.params);
  // console.log(cartId, prodId, prodPrice);
  let total = +prodPrice * 3;

  let query = `INSERT INTO shoping_cart (\`user_id\`, \`prod_id\`, \`total\`, \`prod_num\`,\`cart_num\` ) VALUES
(1,${prodId}, ${total},3, ${cartId});`;

  console.log(query);
  connection.query(query, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
});

app.post("/insertProd", (req, res) => {
  let { title, body, price, catagory } = req.body;
  let query = `INSERT INTO products (\`title\`, \`body\`, \`price\`, \`cat_id\`) VALUES
("${title}", "${body}", ${price}, ${catagory});`;

  connection.query(query, (err, result) => {
    if (err) console.log(err);
  });

  res.redirect("/fruits");
});

// update Product
app.post("/update/:id", (req, res) => {
  let id = req.params.id;
  let { title, body, price, catagory } = req.body;

  let query = `UPDATE products 
  SET \`title\` = "${title}", \`body\` ="${body}", \`price\`=  ${price},  \`cat_id\`=  ${catagory}
  WHERE \`id\` = ${id}
;`;
  connection.query(query, (err, resoult) => {
    if (err) throw err;
    console.log(resoult);
  });
  res.redirect("/fruits");
});
// update Navgation
app.get("/update/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM products
  WHERE \`id\` = ${id}
  `;
  connection.query(query, (err, resoult) => {
    if (err) console.log(err);
    console.log(resoult);
    res.render("update.ejs", { resoult });
  });
});
// delete
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let query = `DELETE FROM products
 WHERE \`id\` =  ${id};
 `;
  connection.query(query, (err, resoult) => {
    if (err) throw err;
    console.log(resoult);
  });
  res.redirect("/fruits");
});

// A navagation endpoint
app.get("/add", (req, res) => {
  res.render("addNew.ejs");
});

app.get("/fruits", async (req, res) => {
  let query = `SELECT * FROM products`;
  let cartQuery = `SELECT cart_num FROM shoping_cart`;
  await connection.query(query, (err, reoult) => {
    if (err) console.log(err);

    connection.query(cartQuery, (err, cartList) => {
      if (err) console.log(err);

      let unuiqeCarts = [];
      let unuiqeIndex = [];
      cartList.map((cart) => {
        if (!unuiqeIndex.includes(cart.cart_num)) {
          unuiqeIndex.push(cart.cart_num);
          unuiqeCarts.push(cart);
        }
      });
      console.log(unuiqeCarts);
      res.render("index.ejs", { reoult, unuiqeCarts });
    });
  });
});

// insertProcduct();
// selectProds();

app.listen(port, () => {
  console.log(`listining on port ${port}`);
});
