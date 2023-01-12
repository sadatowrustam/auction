const express = require('express')
const router = express.Router()
const { login, protect, updateMe, sendMe} = require("../../controllers/admin/adminControllers")
router.post("/login", login)
router.post("/edit", protect, updateMe)
router.get("/get-me", protect, sendMe)
router.use('/categories', require('./routes/categoriesRouter')); //delete test etmeli
router.use("/subcategories", require("./routes/subcategoriesRouter")) //test edildi
router.use("/products", require("./routes/productsRouter")) //test etmeli
router.use("/users", protect, require("./routes/usersRouter"))
module.exports = router 