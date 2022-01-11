// my SQL : connexion : pourrait être une fonction unique (middle/db-config)

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
    console.log("Connecté à MySQL dans connection.js !");
  })
  
  module.exports=db
