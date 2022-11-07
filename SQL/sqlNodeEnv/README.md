## Setting up SQL enviorment for node

- Right in CMD the commenedm

* npm init --y

- this will open package jason in project

* Open terminal to :
* bash
  Or
* comanded propmt
  Or any other not Power shell

- Right
  the commends:

* npm i express

* npm i mysql

* open a app.js (main) file

* change in packege json the value of "main" : app.js

===== Express =====

- exaciute express two stages
- requre
- const express = require('express')
- app = express()

\*\* code:

const express = require('express')
const app = express();

app.listen(port,()=>{
console.log(`listining on port ${port}`);
})

# now we will conact SQL:

- require mysql

- mysql reateing the conecction

- my a connaction and save into a variable
  let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "<Your db name>",
  });

- make a string qurey saved in a variable

- connection.query(<name of variable>, ()=>{})

### now conecting EJS

- npm i ejs
- open a foldoer called "views"
- THE FOLDERS NAME MUST BE views

- add the set line
- app.set("view engien", "ejs");

- connect views to any path buy using join

-app.set("views", join(\_\_dirname, "views"));

- inorder to use join, it needs to be required

- const { join } = require("path");

Extantion 
EJS language support


* making life easer
- nodemon - you will not need to killl server and bring up server. 

