const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  contactNumber: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobPay: { type: String, required: false },
  postedUser: { type: Array, required: true },
  pickedUsers: { type: Array, required: false },
  jobId: { type: String, unique: true, required: true }
}, {
  timestamps: true,
})

module.exports = mongoose.model("Job", jobSchema)