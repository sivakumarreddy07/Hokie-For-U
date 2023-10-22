import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { sendEmail } from '../redux/actions/auth';
import '../css/ForgotPassword.css'


function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    //axios.defaults.withCredentials = true;

    function handleSubmit(e){
      e.preventDefault()
      console.log(email)
      dispatch(sendEmail({email},navigate))
    }

    return(
        <div className="forgot-password">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ForgotPassword;