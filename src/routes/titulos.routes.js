const express = require('express')
const router = express.Router()
const controller = require('../controllers/tituloController')

router.get('/', controller.getAll)

router.post('/', controller.createTitle)

router.delete('/:id/remove', controller.deleteTitulo)

module.exports = router