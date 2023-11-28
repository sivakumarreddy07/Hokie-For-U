import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postJob } from "../redux/actions/auth";
import AuthGuard from "./AuthGuard";
import Notification from "./Notification";
import "../css/PostJobApp.css"

const InitState = {
  jobTitle: "",
  jobLocation: "",
  jobDescription: "",
  jobPay: "",
  jobDate:"",
  contactNumber: "",
  postedUser: []
}

const PostJobApp = (props) => {
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const [sForm,
    setsForm] = useState(InitState)
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => setsForm({
    ...sForm,
    [e.target.name]: e.target.value
  });

  // Handle form submission
  function handleOnSubmit(e) {
    e.preventDefault();
    const userEmail = JSON.parse(localStorage.getItem("user_info")).result.email;
    const updatedForm = {
      ...sForm,
      postedUser: [userEmail],
    };

    console.log(updatedForm);

    if (sForm.jobDescription !== "" && sForm.jobLocation !== "" && sForm.jobDate!=="" && sForm.jobTitle !== "" && sForm.jobLocation !== "" && sForm.contactNumber !== "") {
      dispatch(postJob(updatedForm, nagivate));
      setsForm(InitState);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }

  };
  return (
    <div className="app-postjob">
      {showNotification && (
          <Notification
            message="Job Posted Successfully!"
            onClose={() => setShowNotification(false)}
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
        <button type="submit" className="post-button">Post the job</button>
      </form>
    </div>
  );
}


export default AuthGuard(PostJobApp);