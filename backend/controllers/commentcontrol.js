const comment = require("../models/commentmodels")



exports.createcomment = (req, res, next) => {
  const commentcreated = {
    userid : req.body.userid,
    articleid : req.body.articleid,
    content : req.body.commentcontent,
    creationdate : new Date() 
}
comment.insertComment(commentcreated)
  .then((id) => res.status(201).json({message : ' Commentaire ' + id + '  P7 créé !'}))
  .catch(error => res.status(400).json({ error}))
}


exports.getAll = (req, res, next) => {  
  comment.getAll(req.params.id)
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(400).json({ error }));
}

exports.getbyarticle = (req, res, next) => {
  //console.log("getbyarticles lancé dans controllers.Comments")
  comment.getCommentsByArticle(req.params.id)
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(400).json({ error }));
}

exports.deleteOneComment = (req, res, next) => {  
  comment.deleteComment(req.params.id)
  .then((articles) => res.status(200).json(articles))
  .catch((error) => res.status(400).json({ error }));
}

