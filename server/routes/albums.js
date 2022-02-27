const express = require('express')
const router = express.Router()
const controller = require('../controllers/albums')
const verify = require('../controllers/middleware/verifyToken')

router.get('/', controller.readAll)
router.get('/:id', controller.readById)
router.post('/', verify, controller.create)
router.put('/:id', verify, controller.updateById)
router.delete('/:id', verify, controller.deleteById)

module.exports = router
