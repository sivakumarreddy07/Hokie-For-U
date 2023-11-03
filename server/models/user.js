const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: false },
  profilePicture: { type: String, required: false },
  createdJobs: { type: Array, required: false },
  pickedJobs: { type: Array, required: false },
  userId: { type: String, unique: true, required: true }
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema);

User.addJobToUser = async (userEmail, jobId, isPostedJob) => {
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error('User not found');
    }

    if (isPostedJob) {
      user.createdJobs.push(jobId);
    }
    else {
      user.pickedJobs.push(jobId);
    }

    await user.save();

    return user;
  } catch (error) {
    throw new Error('Error adding job to user');
  }
};

User.getUserJobs = async (userEmail, isPostedJob) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error('User not found');
    }

    if (isPostedJob) {
      jobsArray = user.createdJobs
    }
    else {
      jobsArray = user.pickedJobs
    }

    return jobsArray;
  } catch (error) {
    throw new Error('Error fetching jobs from user');
  }
};

module.exports = User;