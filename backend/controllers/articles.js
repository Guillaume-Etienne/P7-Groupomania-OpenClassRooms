const Article = require("../models/articlesmodel")
const fs = require("fs")
const modelArticle = require("../models/articlesmodel")

exports.createarticles = (req, res, next) => {
  const articlecreated = req.file ? {
    userid : req.auth.userId,
    articlecontent : req.body.articlecontent,
    picture : `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    creationdate : new Date() 
  } : {
    userid : req.auth.userId,
    articlecontent : req.body.articlecontent,
    picture : "no picture",
    creationdate : new Date() 
}
modelArticle.insertArticle(articlecreated)
  .then((id) => res.status(201).json({message : ' Article ' + id + '  P7 créé !'}))
  .catch(error => res.status(400).json({ error}))
}


exports.getAllArticles = (req, res, next) => {
  console.log("getAllArticle lancé dans controllers.articles")
  modelArticle.getAllArticle()
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(400).json({ error }));
}

exports.deleteArticle = (req, res, next) => {  
  if (req.user.admin) {
    modelArticle.deleteArticle(req.params.id)
  .then((articles) => res.status(200).json(articles))
  .catch((error) => res.status(400).json({ error }));
  }
  else {
    modelArticle.deleteArticle(req.params.id, req.auth.userId)
  .then((articles) => res.status(200).json(articles))
  .catch((error) => res.status(400).json({ error }));
  }
  
}

/*



exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //sécurisation supplémentaire de la modification. (un postman avec copie du token pouvait coutourner)
    .then((sauce) => {
      if (sauce.userId === req.auth.userId) {
        const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
    
      }
      else {
        res.status(403).json({ message : ' Modification non autorisée (à la vérification du auth.userId)'})
      }      
    })
    .catch((error) => res.status(500).json({ error }));
  }
  

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })     
    .then((sauce) => {
      if (sauce.userId === req.auth.userId) {   //sécurisation supplémentaire
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
            .catch((error) => res.status(400).json({ error }));
        })        
      }
      else {
        res.status(403).json({ message : ' Suppression non autorisée (à la vérification du auth.userId) :  403'})
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  // trouver la sauce, si l'user a déla liké / disliké / rien du tout   Agir en conséquence
  Sauce.findOne({ _id: req.params.id }) //trouver la sauce
    .then((sauce) => {
      if (sauce.usersLiked.includes(req.auth.userId)) {
        //si l'utilisateur a déjà liké ... il ne peut QUE enlever son like        
        if (req.body.like === 0) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersLiked: req.auth.userId },
              $inc: { likes: -1 },
            }
          )
            .then((sauce) =>
              res.status(200).json({ message: "Un like ENLEVE" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      } else if (sauce.usersDisliked.includes(req.auth.userId)) {
        //si l'utilisateur a déjà disliké ... il ne peut QUE enlever son dislike
        if (req.body.like === 0) {          
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.auth.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((sauce) =>
              res.status(200).json({ message: "Un dislike ENLEVE" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      } else {
        // le user ne s'est pas encore prononcé, il peut ajouter un like ou un dislike
        if (req.body.like === 1) {
          //Ajout d'un like (et enregistrement dans la liste des users likers)
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: +1 },
              $push: { usersLiked: req.auth.userId },
            }
          )
            .then((sauce) =>
              res.status(200).json({ message: "Un like de plus !" })
            )
            .catch((error) => res.status(400).json({ error }));
        } else if (req.body.like === -1) {
          // Ajout d'un dislike
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: +1 },
              $push: { usersDisliked: req.auth.userId },
            }
          )
            .then((sauce) =>
              res.status(200).json({ message: "Un dislike de plus !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
*/