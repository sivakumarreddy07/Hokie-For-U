import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postJob, updateJobDetails } from "../redux/actions/auth";
import { getJobDetailsById } from "../redux/actions/auth";
import { useLocation } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import Notification from "./Notification";
import "../css/PostJobApp.css"

const InitState = {
  jobTitle: "",
  jobLocation: "",
  jobDescription: "",
  jobPay: "",
  jobDate: "",
  contactNumber: "",
  postedUser: []
}

const PostJobApp = (props) => {
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const [sForm,
    setsForm] = useState(InitState)
  const [showNotification, setShowNotification] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('jobId');

  const handleChange = (e) => setsForm({
    ...sForm,
    [e.target.name]: e.target.value
  });

  async function fetchJobData() {
    const response = await dispatch(getJobDetailsById({ jobId }, nagivate));
    setsForm(response, () => console.log(sForm));

  }

  useEffect(() => {
    if (jobId) {
      fetchJobData()
    }
  }, [jobId]);

  useEffect(() => {
    if (sForm.jobDate) {
      const currentDate = new Date(sForm.jobDate);
      setsForm((prevForm) => ({
        ...prevForm,
        jobDate: currentDate.toISOString().split('T')[0],
      }));
    }
  }, [sForm.jobDate]);

  // Handle form submission
  function handleOnSubmit(e) {
    e.preventDefault();
    const userEmail = JSON.parse(localStorage.getItem("user_info")).result.email;
    const updatedForm = {
      ...sForm,
      postedUser: [userEmail],
    };

    if (sForm.jobDescription !== "" && sForm.jobLocation !== "" && sForm.jobDate !== "" && sForm.jobTitle !== "" && sForm.jobLocation !== "" && sForm.contactNumber !== "") {
      dispatch(postJob(updatedForm, nagivate));
      setsForm(InitState);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };
  function handleOnUpdate(e) {
    e.preventDefault();
    const userEmail = JSON.parse(localStorage.getItem("user_info")).result.email;
    const updatedForm = {
      jobId: jobId,
      jobTitle: sForm.jobTitle,
      jobDescription: sForm.jobDescription,
      contactNumber: sForm.contactNumber,
      jobDate: sForm.jobDate,
      jobLocation: sForm.jobLocation,
      jobPay: sForm.jobPay,
      postedUser: [userEmail],
    };

    if(sForm.jobDescription !== "" && sForm.jobLocation !== "" && sForm.jobDate !== "" && sForm.jobTitle !== "" && sForm.jobLocation !== "" && sForm.contactNumber !== "") {
      dispatch(updateJobDetails(updatedForm,nagivate));
      setsForm(InitState)
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    else{
      alert("Please fill all the details");
    }
  }
  return (
    <div className="app-postjob">
      {showNotification && (
        <Notification
          message="Job Posted Successfully!"
          onClose={() => setShowNotification(false)}
        />
      )}{showAlert && (
        <Notification
          message="Job Updated Successfully!"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="postjob-img">
        <img src="/images/bg-2.jpeg" alt="" />
      </div>
      <form className="postjob-form" onSubmit={handleOnSubmit}>
        <h1>Compose a Job</h1>
        <div className="input-job">
          <span className="details">Job Title</span>
          <input type="text" name="jobTitle" value={sForm.jobTitle} placeholder="Enter job title" onChange={handleChange} required />
        </div>
        <div className="input-job">
          <span className="details">Job Description</span>
          <textarea
            name='jobDescription' onChange={handleChange} value={sForm.jobDescription} placeholder="Enter Job Description" required />
        </div>
        <div className="input-job">
          <span className="details">Contact Details</span>
          <input type="tel" name="contactNumber" placeholder="Enter Phone Number" value={sForm.contactNumber} onChange={handleChange} required />
        </div>
        <div className="input-job">
          <span className="details">Job Date</span>
          <input type="date" placeholder="Choose a Date" name="jobDate" value={sForm.jobDate} onChange={handleChange} required />
        </div>
        <div className="input-job">
          <span className="details">Job Location</span>
          <input type="text" name="jobLocation" placeholder="Enter Job Location" value={sForm.jobLocation} onChange={handleChange} required />
        </div>
        <div className="input-job">
          <span className="details">Job Pay</span>
          <input type="number" name="jobPay" placeholder="Enter Job Pay" value={sForm.jobPay} onChange={handleChange} required />
        </div>
        {
          jobId ?
            <input type="button" onClick={handleOnUpdate} className="post-button" value='Update' /> :
            <button type="submit" className="post-button">Post the Job</button>
        }

      </form>
    </div>
  );
}


export default AuthGuard(PostJobApp);