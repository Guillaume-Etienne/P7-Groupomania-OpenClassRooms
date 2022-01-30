const express = require ('express')
const router = express.Router()
const articleCtrl = require ('../controllers/articles')

const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')


router.post('/', multer, articleCtrl.createarticles)
router.get('/', articleCtrl.getAllArticles)
router.delete('/:id',articleCtrl.deleteArticle)
/*

pour le post, get, faudra ajouter le auth bien sûr :
router.post('/', auth, multer, articleCtrl.createarticles)


router.get('/:id', auth, articleCtrl.getOnearticle)
router.put('/:id', auth, multer, articleCtrl.modifyarticle)
router.delete('/:id', auth, articleCtrl.deletearticle)

//commentaires ???
router.post('/:id/like', auth, articleCtrl.likearticle)

*/
module.exports = router