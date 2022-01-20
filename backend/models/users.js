//const { use } = require('../app.js')
const db = require ('./connection.js')

exports.insertUser = (newby) => {
 return new Promise ((resolve, reject) =>{
    db.query('INSERT INTO users SET ?', newby, (error, result, fields) =>{
        if (error) {
          console.error('Problème création user :' + error)
          return reject(error)
        }
        const id = result.insertId
        console.log('resultat -result- de insertUser (dans models/users.js): result: '+ result + ' result.insterId : ' + id)
        resolve(id)
    })
 })  
}


exports.findUser = (userTested) => {
    return new Promise ((resolve, reject) =>{
        db.query('SELECT * FROM users WHERE email=?', userTested, (error, result, fields) =>{
            if (error) {
                console.error('erreur de requête dans le models/user.js : ' + error)
                return reject(error)
            }
            const id = result[0]
            if (!id) {
                console.log('Aucun utilisateur trouvé sous ce nom')
            }
            else{
                console.log('email trouvé ! resultat -result- de findUser (dans models/users.js) : '+ id.password)                              
            }
            resolve(id)            
        })
    })
}



exports.findUserDetails = (userTested) => {
    return new Promise ((resolve, reject) =>{
        db.query('SELECT * FROM users WHERE userid=?', userTested, (error, result, fields) =>{
            if (error) {
                console.error('erreur de requête dans le models/user.js : ' + error)
                return reject(error)
            }
            const id = result[0]
            if (!id) {
                console.log('Aucun utilisateur trouvé sous ce nom')
            }
            else{
                console.log('email trouvé ! resultat -result- de findUser (dans models/users.js) : '+ id.password)                              
            }
            resolve(id)            
        })
    })
}
