const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const verify = require('../controllers/middleware/verifyToken')

router.get('/', controller.readEntry)
router.get('/login', controller.readLogin)
router.post('/login', controller.login)
router.get('/:id', verify, controller.readById)
router.put('/:id', verify, controller.updateById)

module.exports = router
