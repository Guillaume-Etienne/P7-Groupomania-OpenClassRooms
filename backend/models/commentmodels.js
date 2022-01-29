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
   exports.getAll = () => {  //a tester / pas uttilié en réalité
    console.log('getALL dans le commentmodel.js lancé sans variable ')
    return new Promise ((resolve, reject) =>{
       db.query('SELECT * FROM comment', (error, result, fields) =>{
           if (error) {
             console.log('Problème récupération de comments dans getAll commentsmodels.js  :' + error)
             return reject(error)
           }
           const id = result
                      
           resolve(id)
       })
    })  
   }

   exports.getCommentsByArticle = (ArticleIdTested) => {    
    return new Promise ((resolve, reject) =>{      
      db.query('SELECT * FROM comment WHERE articleid = ?', [ArticleIdTested], (error, result, fields) =>{
          if (error) {
            console.log('Problème récupération de comments dans commentsmodels.js  :' + error)
            return reject(error)
          }
          const arrayReturned = result                          
          resolve(arrayReturned)
      })
    })  
   }