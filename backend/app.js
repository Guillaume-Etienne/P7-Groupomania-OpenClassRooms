console.log("App.js lancé !")

const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')
const rateLimit = require("express-rate-limit")



  //définir un header pour toutes les requêtes pour contourner le CORS
  app.use((req, res, next) => {    
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })


const userRoutes = require('./routes/users')
const articleRoutes = require('./routes/articles')

//Pour se protéger des attaques de type bruteforce :
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20
})

app.use('/api/auth', apiLimiter, userRoutes)
app.use('/api/articles', articleRoutes)

app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app