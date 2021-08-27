const express = require('express')
const router = express.Router()
const controller = require('../controllers/estudioController')

router.get('/', controller.getAll)

router.post('/', controller.createStudio)

router.delete('/:id/remove', controller.deleteEstudio)

module.exports = router