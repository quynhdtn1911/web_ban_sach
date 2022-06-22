const express = require('express')
const router = express.Router()
const cartController = require('../controller/CartController')

router.post('/:idUser/add', cartController.addToCart)
router.get('/:idUser', cartController.getCart)
router.post('/:idUser/delete', cartController.deleteFromCart)

module.exports = router