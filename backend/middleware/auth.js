const jwt = require('jsonwebtoken')

const MY_APP_SECRET = process.env.APP_SECRET


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, MY_APP_SECRET) //
        const userId = decodedToken.userId
        req.auth = {userId: userId} // raccourcis JS : req.auth = {userId}    parce que variable du même nom
            next()         
    } catch (error) {
        res.status(401).json ({ error : error | 'Requête (Token) non authentifié dans le middleware auth.js !'})
    }
}
