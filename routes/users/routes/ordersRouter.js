
const express = require('express');
const router = express.Router();

const {
    addMyOrders,
    getMyOrders,
    deleteOrderedProduct,
    deleteAllOrderedProducts
} = require('../../../controllers/users/ordersControllers');

router.post('/my-orders/add', addMyOrders);
router.get('/my-orders', getMyOrders);
router.delete("/my-orders", deleteOrderedProduct)
router.delete("/my-orders/all", deleteAllOrderedProducts)

module.exports = router