const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordValidator = require('password-validator')

const dotenv = require("dotenv")
dotenv.config()
const MY_APP_SECRET = process.env.APP_SECRET

/*
const dbc = require('../middleware/db-config')
const db = dbc.getDB()

console.log('coucou : ' + db.query)
*/


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
    console.log("Connecté à MySQL chez users.js !");
  })



var schema = new passwordValidator(); //pour définir une niveau minimum de sécurité des mots de passe
schema
.is().min(4)                                    // Minimum length 4 (8 nomalement)
/*
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
*/
exports.signup = (req, res, next) => {
  console.log(" signup est lancé !")
  return res.status(401).json({ error: 'Utilisateur non trouvé !' });     
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                {userId : user._id},
                MY_APP_SECRET,
                { expiresIn: '23h'}
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };