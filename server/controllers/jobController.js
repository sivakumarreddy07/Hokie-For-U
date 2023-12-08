const { v4: uuidv4 } = require('uuid')
const Job = require("../models/job")
const User = require("../models/user")
const emailController = require("../controllers/emailController")

const postJobController = async (req, res) => {
  const { jobTitle, jobDescription, contactNumber, jobLocation, jobPay, jobDate, postedUser } = req.body;
  const jobId = uuidv4()
  const isPostedJob = true
  const userEmail = postedUser[0]
  try {
    if (jobTitle === "" || jobDescription === "" || contactNumber === "" || jobLocation === "" || jobDate === "") {
      return res.status(400).json({ message: "Invalid field!" })
    }
    const result = await Job.create({ jobTitle, jobDescription, contactNumber, jobLocation, jobDate, jobPay, jobId, postedUser })

    User.addJobToUser(userEmail, jobId, isPostedJob)
      .then((user) => {
        console.log('User updated:', user.email);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


    const subject = "Your job is successfully posted";
    const message = `<html>
    <head></head>
    <body>
        <div>
            <p>The job you have created is successfully posted. Please find the below details of the job:</p><br>
            <strong>Job Title: </strong>${jobTitle}<br>
            <strong>Job Description: </strong>${jobDescription}<br>
            <strong>Job Pay: </strong>${jobPay}<br>
            <strong>Job Location: </strong>${jobLocation}<br>
            <strong>Job Date: </strong>${jobDate}<br>
            <strong>Contact Information: </strong>${contactNumber}
        </div>
        <div>
            <p>Regards,<br>HokieForU</p>
        </div>
    </body>
    </html>`
    await emailController.sendNotificationMail(userEmail, subject, message);

    res
      .status(200)
      .json(result);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching job data');
  }
}

const editPostJobController = async (req, res) => {
  const { jobId, jobTitle, jobDescription, contactNumber, jobLocation, jobPay, jobDate, postedUser } = req.body;
  try {
    if (jobTitle === "" || jobDescription === "" || contactNumber === "" || jobLocation === "" || jobDate === "") {
      return res.status(400).json({ message: "Invalid field!" })
    }
    const jobRecord = await Job.findOne({ jobId });
    if (jobRecord.postedUser[0] !== postedUser[0]) {
      return res.status(400).json({ message: "Invalid Access for Editing the Job Details" })
    }

    jobRecord.jobTitle = jobTitle
    jobRecord.jobDescription = jobDescription
    jobRecord.contactNumber = contactNumber
    jobRecord.jobLocation = jobLocation
    jobRecord.jobPay = jobPay
    jobRecord.jobDate = jobDate

    const updatedJob = await jobRecord.save();
    return res.status(200).json(updatedJob);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating the job details');
  }
}

const deletePostJobController = async (req, res) => {
  const { jobId, postedUser, pickedUsers } = req.body;
  try {

    const jobRecord = await Job.findOne({ jobId });
    if (jobRecord.postedUser[0] !== postedUser[0]) {
      return res.status(400).json({ message: "Invalid Access for Deleting the Job Details" })
    }

    const postedUserRecord = await User.findOne({ email: postedUser[0] })
    if (postedUserRecord.createdJobs.includes(jobId)) {
      postedUserRecord.createdJobs = postedUserRecord.createdJobs.filter(item => item !== jobId);
    }
    
    pickedUsers.map(async user => {
      const pickedUserRecord = await User.findOne({ email: user })
      if (pickedUserRecord.pickedJobs.includes(jobId)) {
        pickedUserRecord.pickedJobs = pickedUserRecord.pickedJobs.filter(item => item !== jobId);
      }
      await pickedUserRecord.save();
    });

    await jobRecord.deleteOne();
    await postedUserRecord.save();

    return res.status(200).json({ message: "Job Deleted Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating the job details');
  }
}




const pickJobController = async (req, res) => {
  console.log(req);
  const { userEmail, jobId } = req.body;
  const isPostedJob = false
  try {
    if (userEmail === "" || jobId === "") {
      return res.status(400).json({ message: "Invalid field!" })
    }

    User.addJobToUser(userEmail, jobId, isPostedJob)
      .then((user) => {
        console.log('User updated:', user.email);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    Job.addUserToJob(userEmail, jobId, isPostedJob)
      .then((job) => {
        console.log('Job updated:', job.jobTitle);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    const job = await Job.findOne({ jobId });
    const user = await User.findOne({ email: userEmail });
    const toAddress = job.postedUser[0];
    const subject = 'Your job has been picked!!!';
    const content = `<html><head></head><body>
      <p>The job you have posted (${job.jobTitle}) has been picked</p>
      <h2>Picked User Details:</h2>
      <strong>Name: </strong>${user.firstName} ${user.lastName}<br>
      <strong>Email: </strong>${userEmail}<br>
      <strong>Contact Details: </strong>${user.phoneNumber}<br><br><br>
      Regards,<br>
      HokieForU
      </body></html>`;
    await emailController.sendNotificationMail(toAddress, subject, content);
    res.status(200).send('Job picked successfully!')
  }
  catch (error) {
    res.status(500).send('Error picking the job');
  }
}

const fetchAllJobsController = async (req, res) => {
  try {
    const result = await Job.find();
    res
      .status(200)
      .json(result)

  } catch (error) {
    res.status(500).send('Error fetching job data');
  }
}

const fetchJobByIdController = async (req, res) => {
  const {jobId} = req.body;
  try {
    const result = await Job.findOne({jobId});
    if(!result){
      return res.status(200).json({message: "Job details not found with Job ID: "+jobId});
    }
    return res.status(200).json(result)

  } catch (error) {
    res.status(500).send('Error fetching job data');
  }
}

const fetchUserPickedJobsController = async (req, res) => {
  const { userEmail } = req.body;
  const isPostedJob = false
  try {

    const pickedJobs = await User.getUserJobs(userEmail, isPostedJob);

    const result = await Job.find({ jobId: { $in: pickedJobs } }).exec();
    res
      .status(200)
      .json(result)

  } catch (error) {
    res.status(500).send('Error fetching user picked jobs');
  }

}

const fetchUserPostedJobsController = async (req, res) => {
  const { userEmail } = req.body;
  const isPostedJob = true
  try {

    const postedJobs = await User.getUserJobs(userEmail, isPostedJob);

    const result = await Job.find({ jobId: { $in: postedJobs } }).exec();
    res
      .status(200)
      .json(result)

  } catch (error) {
    res.status(500).send('Error fetching user posted jobs');
  }
}

module.exports = {
  postJobController,
  pickJobController,
  fetchAllJobsController,
  fetchUserPickedJobsController,
  fetchUserPostedJobsController,
  editPostJobController,
  deletePostJobController,
  fetchJobByIdController
}