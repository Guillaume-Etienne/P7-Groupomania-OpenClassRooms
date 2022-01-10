const dotenv = require("dotenv")
dotenv.config()

const mysql = require('mysql')
const MYSQL_SECRET = process.env.MYSQL_SECRET

//Appeler et paramètrer la BDD mySQL


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: MYSQL_SECRET,
  insecureAuth : true,
  database : "p7bdd"
})

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
   /*db.query("CREATE DATABASE P7bdd", function (err, result) {
        if (err) throw err;
        console.log("Base de données créée !");
      });
      */
  })

