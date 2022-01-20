const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordValidator = require('password-validator')

const dotenv = require("dotenv")
dotenv.config()
const MY_APP_SECRET = process.env.APP_SECRET

const modelUser = require("../models/users")

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


//création au signup

exports.signup = (req, res, next) => {
  console.log(" Tapé dans le Back ! Signup dans contollers users !")
  console.log("CORS Lancé mec !")
  if (schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = {
            email : req.body.email,
            password: hash,
            name : req.body.name,
            moderator : 0 //personne ne devrait, on en placerait 1 à la main dans la Db.
        }
        modelUser.insertUser(user)
          .then((id) => res.status(201).json({message : ' Utilisateur : ' + id + '  P7 créé !'}))
          .catch(error => res.status(400).json({ error}))
    })
    .catch(error => res.status(500).json({ error}))
  }
  else {    
    res.status(403).json({ message : ' Le mot de passe choisi nest pas assez sécurisé, il doit avoir :' + schema.validate(req.body.password, { list: true })}) //va afficher les détails vérifiés du MDP
  }        
}


//Login

exports.login = (req, res, next) => {
  console.log(" Tapé dans le Back ! Login dans contollers users !")
  if ( !req.body.email || !req.body.password ) {
    return res.status(400).json({message: "il manque l'adresse mail et/ou le mot de passe"})
  }
  modelUser.findUser(req.body.email)
  .then((user) => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur (email) non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.userid,
              token: jwt.sign(
                {userId : user.userid},
                MY_APP_SECRET,
                { expiresIn: '23h'}
                //renvoyer : nom ? Mail ?  IsAdmin ?
              )
            });
          })    
      })
  .catch(error => res.status(400).json({ error}))
  }


  