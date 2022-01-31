const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const commentCtrl = require('../controllers/commentcontrol')

router.post('/', auth, commentCtrl.createcomment)
router.get('/getbyarticle/:id',auth, commentCtrl.getbyarticle)
router.get('/',auth, commentCtrl.getAll)
router.delete('/:id', auth, commentCtrl.deleteOneComment)


module.exports = router