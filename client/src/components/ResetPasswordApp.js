import React from 'react'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import '../css/ResetPasswordApp.css'
import { createNewPassword } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';
import AuthGuard1 from './AuthGuard1';

function ResetPasswordApp() {
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, token } = useParams()

  //axios.defaults.withCredentials = true;
  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     axios.post(`http://localhost:3000/reset-password/${id}/${token}`, {password})
  //     .then(res => {
  //         if(res.data.Status === "Success") {
  //             navigate('/hokieforu/login')

  //         }
  //     }).catch(err => console.log(err))
  // }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(password)
    dispatch(createNewPassword({ password, id, token }, navigate))
  }

  return (
    <div className="reset-password">
      <div className="reset-container">
        <form onSubmit={handleSubmit} className='reset-form'>
          <h1>Password Reset</h1>
          <div className='enter-password'>
              <p>Welcome! Please enter your new password.</p>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="reset-button">
            Update
          </button>
        </form>

      </div>
    </div>
  )
}

export default AuthGuard1(ResetPasswordApp);