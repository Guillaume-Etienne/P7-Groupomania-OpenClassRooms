// my SQL : connexion : pourrait être une fonction unique (middle/db-config)

const mysql = require('mysql')
const MYSQL_SECRET = process.env.MYSQL_SECRET
const HOST_SECRET = process.env.HOST_SECRET
const USER_SECRET = process.env.USER_SECRET
const DATABASE_SECRET = process.env.DATABASE_SECRET

//Appeler et paramètrer la BDD mySQL

const db = mysql.createConnection({
    host: HOST_SECRET,
    user: USER_SECRET,
    password: MYSQL_SECRET,
    insecureAuth : true,
    database : DATABASE_SECRET
  })
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à MySQL dans connection.js !");
  })
  
  module.exports=db
