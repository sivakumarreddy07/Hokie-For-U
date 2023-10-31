import React from "react";
import { Link } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import '../css/AccountApp.css'

const AccountApp = () => {
  return (
    <div className='app-account'>
      <div className="search-jobs">
        <h1>Open Jobs, People need help from you</h1>
        <i className="fa fa-search"></i>
        <input type="text" name="search jobs" placeholder="Search Jobs or communities" />
        <div className="buttons">
          <button type="submit">Search Jobs</button>
          <Link to="/hokieforu/account/post-a-job">Post a job</Link>
        </div>
      </div>
      <div className="search-job-img">
        <img src="/images/searchJobs.jpg" alt="" />
      </div>
    </div>
  )
}

export default AuthGuard(AccountApp);
