const express = require("express")

const { postJobController, pickJobController, fetchAllJobsController, fetchUserPickedJobsController, fetchUserPostedJobsController } = require("../controllers/jobController")


const router = express.Router()

router.post("/post-job", postJobController)
router.post("/pick-job", pickJobController)
router.get("/fetch-jobs", fetchAllJobsController)
router.post("/user-picked-jobs", fetchUserPickedJobsController)
router.post("/user-posted-jobs", fetchUserPostedJobsController)

module.exports = router;