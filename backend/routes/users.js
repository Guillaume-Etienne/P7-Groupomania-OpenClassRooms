const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/users')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/:id', userCtrl.getOneUser)
router.delete('/:id', userCtrl.deleteUser)

module.exports = router