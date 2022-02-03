const express = require('express')
const router = express.Router()
const controller = require('../controllers/albums')

router.get('/', controller.readAll)
router.get('/:id', controller.readById)
router.post('/', controller.create)
router.put('/:id', controller.updateById)
router.delete('/:id', controller.deleteById)

module.exports = router
