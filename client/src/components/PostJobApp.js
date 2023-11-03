import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postJob } from "../redux/actions/auth";
import "../css/PostJobApp.css"

const InitState = {
  jobTitle: "",
  jobLocation: "",
  jobDescription: "",
  jobPay: "",
  contactNumber: "",
  postedUser: []
}

const PostJobApp = (props) => {
  const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm,
      setsForm] = useState(InitState)

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
  
    if (sForm.jobDescription !== "" && sForm.jobLocation !== "" && sForm.jobTitle !== "" && sForm.jobLocation !== "" && sForm.contactNumber !== "" ) {
      dispatch(postJob(updatedForm, nagivate))
  }
  setsForm(InitState);

  };
    return (
      <div className="app-postjob">
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
              name='jobDescription' onChange={handleChange} value={sForm.jobDescription} placeholder="Enter Job Description" required/>
          </div>
          <div className="input-job">
            <span className="details">Contact Details</span>
            <input type="tel" name="contactNumber" placeholder="Enter Phone Number" value={sForm.contactNumber} onChange={handleChange} required />
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


export default PostJobApp;