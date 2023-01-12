const express = require('express');
const {
    getOneProduct,
    getProducts,
} = require('../../../controllers/public/productsControllers');

const router = express.Router();
router.get("/", getProducts)
router.get("/:id", getOneProduct)

module.exports = router;