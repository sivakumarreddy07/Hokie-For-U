import React from "react";
import { Link } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import Notification from './Notification';
import '../css/AccountApp.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pickJob } from "../redux/actions/auth";
import { getAllJobDetails } from "../redux/actions/auth";
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns';

const AccountApp = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobTitleSearchQuery, setJobTitleSearchQuery] = useState('');
  const [jobDescriptionSearchQuery, setJobDescriptionSearchQuery] = useState('');
  const [jobLocationSearchQuery, setJobLocationSearchQuery] = useState('');
  const userEmail = JSON.parse(localStorage.getItem("user_info")).result.email;
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchJobData();
  }, []);

  async function fetchJobData() {
    const response = await dispatch(getAllJobDetails());
    setJobs(response)

  }

  const filteredJobs = jobs.filter(
    (job) => job.postedUser[0] !== userEmail && !job.pickedUsers.includes(userEmail) &&
      (job.jobTitle.toLowerCase().includes(jobTitleSearchQuery.toLowerCase()) &&
        job.jobLocation.toLowerCase().includes(jobLocationSearchQuery.toLowerCase()) &&
        job.jobDescription.toLowerCase().includes(jobDescriptionSearchQuery.toLowerCase()))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const indexOfLastPost = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentPosts = filteredJobs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const dateFormat = (date) => {
    if (!date) {
      return "Not Provided"
    }
    const currentDate = new Date(date)
    const nextDayDate = new Date(currentDate);
    nextDayDate.setDate(currentDate.getDate() + 1);
    return nextDayDate.toLocaleDateString()
  }

  const handleOnSubmit = (e, jobId) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to proceed?")) {
      dispatch(pickJob({ jobId, userEmail }, nagivate));
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  }
  return (
    <div className='app-account'>
      <div className="image-container">
      </div>
      <div className="search-jobs">
        <p>Open Jobs, People need help from you</p>
        <div className="search-buttons">
          <input
            type="text"
            placeholder="Search for Job Title"
            value={jobTitleSearchQuery}
            onChange={(e) => setJobTitleSearchQuery(e.target.value)}
          /><input
            type="text"
            placeholder="Search for Job Description"
            value={jobDescriptionSearchQuery}
            onChange={(e) => setJobDescriptionSearchQuery(e.target.value)}
          /><input
            type="text"
            placeholder="Search for Job Location"
            value={jobLocationSearchQuery}
            onChange={(e) => setJobLocationSearchQuery(e.target.value)}
          />
        </div>

      </div>

      <div className="jobs-container">
        {showNotification && (
          <Notification
            message="Job Picked Successfully!"
            onClose={() => setShowNotification(false)}
          />
        )}
        <div className="buttons">
          <h1>Available Jobs</h1>
          <Link to="/hokieforu/account/post-a-job">Post a job</Link>
        </div>
        <div className="app-jobs">
          {currentPosts.map((job) => (
            <div key={job._id} className="job-grid">
              <h2>{job.jobTitle}</h2>
              <div className="job-location"><i className="fa fa-map-marker-alt" />&nbsp;{job.jobLocation}</div>
              <div className="job-pay">
                <div>Pay&nbsp;<i className="fa fa-dollar-sign" />: {job.jobPay}/hour</div>
                <div>Ph&nbsp;<i className="fa fa-phone-alt" />: {job.contactNumber}</div>
              </div>
              <div className="job-date">
                Job Date&nbsp;<i className="fa fa-calendar" />:{dateFormat(job.jobDate)}
              </div>
              <div className="job-posted-user">
                <strong>Posted By:</strong> {job.postedUser[0]}
              </div>
              <div className="job-description">
                <strong>Job Details:</strong> {job.jobDescription}
              </div>
              <div className="apply-btn">
                <button onClick={(e) => handleOnSubmit(e, job.jobId)}>Apply this Job</button>
              </div>

            </div>

          ))}
        </div>

        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(filteredJobs.length / jobsPerPage)}
          previousLabel={'<<'}
          nextLabel={'>>'}
          containerClassName={'pagination'}
          pageLinkClassName={'page-number'}
          previousLinkClassName={'page-number'}
          nextLinkClassName={'page-number'}
          activeLinkClassName={'active'}
        />
      </div>


    </div>
  )
}

export default AuthGuard(AccountApp);
