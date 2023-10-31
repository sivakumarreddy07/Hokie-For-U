const express = require("express")

const { signinController, signupController, forgotPasswordController, resetPasswordController } = require("../controllers/userController")

const router = express.Router()

router.post("/signin", signinController)
router.post("/signup", signupController)
router.post("/forgot-password", forgotPasswordController)
router.post("/reset-password/:id/:token", resetPasswordController)


module.exports = router;