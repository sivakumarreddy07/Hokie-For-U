const express = require("express")

const { postJobController, pickJobController, fetchAllJobsController, fetchUserPickedJobsController, fetchUserPostedJobsController, editPostJobController, deletePostJobController, fetchJobByIdController } = require("../controllers/jobController")


const router = express.Router()

router.post("/post-job", postJobController)
router.post("/pick-job", pickJobController)
router.get("/fetch-jobs", fetchAllJobsController)
router.post("/user-picked-jobs", fetchUserPickedJobsController)
router.post("/user-posted-jobs", fetchUserPostedJobsController)
router.post("/edit-job-details",editPostJobController)
router.post("/delete-job-details",deletePostJobController)
router.post("/fetch-jobById",fetchJobByIdController)

module.exports = router;