import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
//import AuthGuard from "./AuthGuard";
import { Link, useNavigate } from "react-router-dom";
import { deleteJobDetails, getJobDetails, getJobDetailsById } from "../redux/actions/auth";
import { getUserPickedJobs } from '../redux/actions/auth';
import AuthGuard from './AuthGuard';
import '../css/FetchJobApp.css'
import Notification from './Notification';

const FetchJobApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [pickedJobs, setPickedJobs] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('user_info'));
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchJobData();
    fetchPickedJobData();
  }, []);
  async function fetchJobData() {
    const response = await dispatch(getJobDetails({ userEmail: userDetails.result.email }, navigate));
    setJobs(response)

  }

  async function fetchPickedJobData() {
    const picked = await dispatch(getUserPickedJobs({ userEmail: userDetails.result.email }, navigate));
    setPickedJobs(picked)
  }


  const dateFormat = (date) => {
    if (!date) {
      return "Not Provided"
    }
    const currentDate = new Date(date)
    const nextDayDate = new Date(currentDate);
    nextDayDate.setDate(currentDate.getDate() + 1);
    return nextDayDate.toLocaleDateString()
  }

  const handleOnDelete = async (e, jobId) => {
    const response = await dispatch(getJobDetailsById({ jobId }, navigate));
    console.log(response)
    if (window.confirm("Are you sure you want to delete the job?")) {
      dispatch(deleteJobDetails({ jobId, postedUser: response.postedUser, pickedUsers: response.pickedUsers }, navigate));
      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }

  }

  return (
    <div className='fetch-jobs-container'>
      {showNotification && (
        <Notification
          message="Job Deleted Successfully!. Please reload to see the changes"
          onClose={() => setShowNotification(false)}
        />
      )}
      <h1>Posted Jobs</h1>
      <div className="jobs">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <div className='job-title'>
              <h3>{job.jobTitle}</h3>
              <div className='editAndDeleteIcons'>
                <Link to={
                  `/hokieforu/account/post-a-job?jobId=${job.jobId}`
                }><i className='fa fa-pencil-alt' /></Link>
                <Link onClick={(e) => handleOnDelete(e, job.jobId)}><i className='fa fa-trash-alt' /></Link>
              </div>
            </div>

            <div className="location-job"><i className="fa fa-map-marker-alt"></i>&nbsp;{job.jobLocation}</div>

            <div className='job-pay'>
              <div>
                Pay&nbsp;<i className="fa fa-dollar-sign"></i>: {job.jobPay}/hour
              </div>
              <div className="job-date">
                Job Date&nbsp;<i className="fa fa-calendar" />:{dateFormat(job.jobDate)}
              </div>
            </div>
            <div className="job-description">
              <strong>Job Details: </strong>
              {job.jobDescription}
            </div>
          </div>
        ))}
      </div>

      <h1>Picked Jobs</h1>
      <div className='picked-jobs'>
        {pickedJobs.map((job) => (
          <div key={job._id} className="job-card">
            <h2>{job.jobTitle}</h2>
            <div className="job-location"><i className="fa fa-map-marker-alt" />&nbsp;{job.jobLocation}</div>
            <div className="job-pay">
              <div>Pay&nbsp;<i className="fa fa-dollar-sign" />: {job.jobPay}/hour</div>
              <div>Ph&nbsp;<i className="fa fa-phone-alt" />: {job.contactNumber}</div>
            </div>

            <div className="job-date">
              Job Date&nbsp;<i className="fa fa-calendar" />:{dateFormat(job.jobDate)}
            </div>
            <div className='posted-user'>
              <strong>Posted By:</strong> {job.postedUser[0]}
            </div>
            <div className="job-description">
              <strong>Job Details:</strong> {job.jobDescription}
            </div>


          </div>
        ))}

      </div>

    </div>
  )
}
export default AuthGuard(FetchJobApp);
