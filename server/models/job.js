const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  contactNumber: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobDate: {type: Date, required: true},
  jobPay: { type: String, required: false },
  postedUser: { type: Array, required: true },
  pickedUsers: { type: Array, required: false },
  jobId: { type: String, unique: true, required: true }
}, {
  timestamps: true,
})

const Job = mongoose.model("Job", jobSchema)

Job.addUserToJob = async (userEmail, jobId, isPostedJob) => {
  try {
    const job = await Job.findOne({ jobId });

    

    if (!job) {
      throw new Error('Job not found');
    }
    
      job.pickedUsers.push(userEmail);
      
    await job.save();
    return job;

  } catch (error) {
    throw new Error(error);
  }
};

module.exports = Job;