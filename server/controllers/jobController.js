const { v4: uuidv4 } = require('uuid')
const Job = require("../models/job")
const User = require("../models/user")
const emailController = require("../controllers/emailController")

const postJobController = async (req, res) => {
  const { jobTitle, jobDescription, contactNumber, jobLocation, jobPay, postedUser } = req.body;
  const jobId = uuidv4()
  const isPostedJob = true
  const userEmail = postedUser[0]
  try {
    if (jobTitle === "" || jobDescription === "" || contactNumber === "" || jobLocation === "") {
      return res.status(400).json({ message: "Invalid field!" })
    }
    const result = await Job.create({ jobTitle, jobDescription, contactNumber, jobLocation, jobPay, jobId, postedUser })

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

const pickJobController = async (req, res) => {
  console.log(req);
  const { userEmail, jobId } = req.body;
  const isPostedJob = false
  console.log(userEmail+' '+jobId);
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
      const toAddress = job.postedUser[0];
      const subject = 'Your job has been picked!!!';
      const content = `<html><head></head><body>
      <p>The job you have posted (${job.jobTitle}) has been picked</p>
      <h2>Picked User Details:</h2>
      <strong>User Email: </strong>${job.pickedUsers}<br><br><br>
      Regards,<br>
      HokieForU
      </body></html>`;
      await emailController.sendNotificationMail(toAddress,subject, content);
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
  fetchUserPostedJobsController
}