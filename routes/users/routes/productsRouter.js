const express = require("express");
const { uploadProductImage } = require("../../../controllers/admin/productsControllers");
const router = express.Router()
const {
    addProduct, 
    placeBid,
    getMyBids,
    getProducts,
    getOneProduct,
    deleteBid
} = require('../../../controllers/users/productsControllers');

router.post("/add",addProduct)
router.post("/upload-image/:id",uploadProductImage)
router.post("/bid/:id",placeBid)
router.get("/bid",getMyBids )
router.get("/",getProducts)
router.get("/:id",getOneProduct)
router.delete("/bid/:id",deleteBid)
module.exports = router