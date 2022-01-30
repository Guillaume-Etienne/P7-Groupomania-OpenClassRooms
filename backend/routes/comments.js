const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/commentcontrol')

router.post('/', commentCtrl.createcomment)
router.get('/getbyarticle/:id', commentCtrl.getbyarticle)
router.get('/', commentCtrl.getAll)
router.delete('/:id', commentCtrl.deleteOneComment)


module.exports = router