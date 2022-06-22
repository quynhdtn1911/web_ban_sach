const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController')

router.post('/:idUser/add', orderController.add)
router.get('/:idUser', orderController.getListOrder)

module.exports = router