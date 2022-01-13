const db = require ('./connection.js')

//insert arcticle

exports.insertArticle = (newby) => {
    console.log('insertArticl dans learticles model.js lancé')
    return new Promise ((resolve, reject) =>{
       db.query('INSERT INTO articles SET ?', newby, (error, result, fields) =>{
           if (error) {
             console.log('Problème création article dans le articlesmodels.js :' + error)
             return reject(error)
           }
           const id = result.insertId
           console.log('resultat : result: '+ result + ' result.insterId : ' + id)
           resolve(id)
       })
    })  
   }