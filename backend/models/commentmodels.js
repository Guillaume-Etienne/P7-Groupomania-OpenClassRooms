const db = require ('./connection.js')

//insert arcticle

exports.insertComment = (newby) => {
    console.log('insertComment dans le commentmodels.js lancé')
    return new Promise ((resolve, reject) =>{
       db.query('INSERT INTO comment SET ?', newby, (error, result, fields) =>{
           if (error) {
             console.log('Problème création article dans le articlesmodels.js :' + error)
             return reject(error)
           }
           const id = result.insertId
           console.log('resultat : result: '+ result + ' result.insertId : ' + id)
           resolve(id)
       })
    })  
   }


   exports.getAllComments = () => {  //que le titre pour le moment
    console.log('getAllArticle dans le articles model.js lancé')
    return new Promise ((resolve, reject) =>{
       db.query('SELECT * FROM articles', (error, result, fields) =>{
           if (error) {
             console.log('Problème récupération de tous les articles dans le articlesmodels.js :' + error)
             return reject(error)
           }
           const id = result
           console.log('resultat : result: '+ result + ' result.insterId : ' + id[0].articleid)
           resolve(id)
       })
    })  
   }