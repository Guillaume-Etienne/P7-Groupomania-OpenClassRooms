const db = require ('./connection.js')

//insert arcticle

exports.insertArticle = (newby) => {
    //console.log('insertArticl dans le articles model.js lancé')
    return new Promise ((resolve, reject) =>{
       db.query('INSERT INTO articles SET ?', newby, (error, result, fields) =>{
           if (error) {
             console.log('Problème création article dans le articlesmodels.js :' + error)
             return reject(error)
           }
           const id = result.insertId
           //console.log('resultat : result: '+ result + ' result.insterId : ' + id)
           resolve(id)
       })
    })  
   }

   exports.getAllArticle = () => {
    //console.log('getAllArticle dans le articles model.js lancé')
    return new Promise ((resolve, reject) =>{
       db.query('SELECT a.*, u.name FROM articles a, users u WHERE a.userid=u.userid', (error, result, fields) =>{
           if (error) {
             console.log('Problème récupération de tous les articles dans le articlesmodels.js :' + error)
             return reject(error)
           }
           const id = result
           //console.log('resultat : result: '+ result + ' result.insterId : ' + id[0].articleid)
           resolve(id)
       })
    })  
   }

   exports.deleteArticle = (articleToDelete) => {
    return new Promise ((resolve, reject) =>{
      db.query('DELETE FROM articles WHERE articleid=?', [articleToDelete], (error, result, fields) =>{
          if (error) {
            console.log('Problème effacement dans commentsmodels.js  :' + error)
            return reject(error)
          }
          const id = result
                     
          resolve(id)
      })
   })  
   }