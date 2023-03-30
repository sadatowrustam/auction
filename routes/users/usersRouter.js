const express = require('express');
const {
    login,
    signup,
    forgotPassword,
    protect,
    verify_code,
    verify_code_forgotten,
} = require('../../controllers/users/authController');
const {
    getMe,
    updateMyPassword,
    updateMe,
    deleteMe,
    likeProduct,
    dislikeProduct,
    uploadUserImage,
    getUsersLikedProducts,
} = require('../../controllers/users/usersControllers');
const router = express.Router();
router.use("/products", protect, require("./routes/productsRouter"))
router.patch('/forgot-password', verify_code_forgotten, forgotPassword);
router.post('/signup', verify_code, signup);
router.get("/get-me", protect, getMe)
router.post('/login', login);
router.get('/my-account', protect, getMe);
router.patch('/update-me', protect, updateMe);
router.delete('/delete-me', protect, deleteMe);
router.post("/upload-image", protect, uploadUserImage)
router.patch('/update-my-password', protect, updateMyPassword);
router.get("/like",getUsersLikedProducts) 
router.post("/like", protect, likeProduct)
router.delete("/like/:id", protect, dislikeProduct)
module.exports = router;