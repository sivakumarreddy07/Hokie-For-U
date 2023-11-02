const express = require("express")

const { postJobController } = require("../controllers/jobController")


const router = express.Router()

router.post("/post-job", postJobController)

module.exports = router;