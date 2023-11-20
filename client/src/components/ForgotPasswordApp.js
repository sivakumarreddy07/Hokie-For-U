import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { sendEmail } from '../redux/actions/auth';
import '../css/ForgotPasswordApp.css'
import AuthGuard1 from './AuthGuard1';
import Notification from './Notification';


function ForgotPasswordApp() {
  const [email, setEmail] = useState()
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  //axios.defaults.withCredentials = true;

  function handleSubmit(e) {
    e.preventDefault()
    console.log(email)
    dispatch(sendEmail({ email }, navigate));
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  }

  return (
    <div className="forgot-password">
      {showNotification && (
          <Notification
            message="Email Sent Successfully!"
            onClose={() => setShowNotification(false)}
          />
        )}
      <div className="password-container">
        <form onSubmit={handleSubmit} className='forgot-form'>
          <h1>Password Reset</h1>
          <div className='enter-email'>
            <label htmlFor="email">
              <p>Enter your email to request a password reset.</p>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>

      </div>
    </div>
  )
}

export default AuthGuard1(ForgotPasswordApp);