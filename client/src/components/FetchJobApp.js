import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
//import AuthGuard from "./AuthGuard";
import { useNavigate } from "react-router-dom";
import { getJobDetails } from "../redux/actions/auth";
import '../css/FetchJobApp.css'

const FetchJobApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetchJobData();
  }, []);
  async function fetchJobData()
  {
    const userDetails = JSON.parse(localStorage.getItem('user_info'));
    const response = await dispatch(getJobDetails({ userEmail: userDetails.result.email }, navigate));
    console.log(response);
    setJobs(response)
  }
  return (
    <div className='fetch-jobs'>
      <div className="search-jobs">
      {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.jobTitle}</h3>
            {/* <p>{job.jobDescription}</p> */}
            {/* <p>Contact: {job.contactNumber}</p>
            <p>Location: {job.jobLocation}</p> */}
            <p>Location: {job.jobLocation} Pay: ${job.jobPay}</p>
            <p>Posted by: {job.postedUser[0]}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  )
}
export default FetchJobApp;
//export default AuthGuard(AccountApp);
