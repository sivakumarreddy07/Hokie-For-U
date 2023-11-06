const express = require("express")

const { signinController, signupController, forgotPasswordController, resetPasswordController, getUserDetailsController, updateUserDetailsController, upload } = require("../controllers/userController")

const router = express.Router()

router.post("/signin", signinController)
router.post("/signup", signupController)
router.post("/forgot-password", forgotPasswordController)
router.post("/reset-password/:id/:token", resetPasswordController)
router.post("/details",getUserDetailsController)
router.post("/update", upload.single('profilePicture'), updateUserDetailsController)


module.exports = router;