const db = require ('./connection.js')

exports.insertUser = (newby) => {
 return new Promise ((resolve, reject) =>{
    db.query('INSERT INTO users SET ?', newby, (error, result, fields) =>{
        if (error) {
          console.error('Problème création user :' + error)
          return reject(error)
          }
        const id = result.resultId
        console.log('result : '+ result)
        resolve(id)
      }
      )
 }) 
 
}




/*
// qui a marché
const newby = {
    email: 'toto@toto.com',
    password: 'azerty',
    name: 'Toto de totocity',
    moderator : true
  }
  
  db.query('INSERT INTO users SET ?', newby, (error, result, fields) =>{
    if (error) {
      console.error('Problème création user :' + error)
      }
    const id = result.resultId
    console.log('result : '+ result)
  }
  )
  */