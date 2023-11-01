const {v4 : uuidv4} = require('uuid')
const Job = require("../models/job")

const postJobController = async (req, res) => {
    const { jobTitle, jobDescription, contactNumber, jobLocation, jobPay, postedUser } = req.body;
    const jobId = uuidv4()
    try {
        if ( jobTitle === "" || jobDescription === "" || contactNumber === "" || jobLocation === "" ){
            return res.status(400).json({ message: "Invalid field!" })
        }
        const result = await Job.create({ jobTitle, jobDescription, contactNumber, jobLocation, jobPay, jobId, postedUser})
        res
            .status(200)
            .json(result)
      } catch (error) {
        res.status(500).send('Error fetching job data');
      }
}

module.exports = {
    postJobController
}