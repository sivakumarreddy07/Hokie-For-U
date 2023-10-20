import React from 'react'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import '../css/ResetPassword.css'
import { createNewPassword } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id, token} = useParams()

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

    function handleSubmit(e){
      e.preventDefault()
      console.log(password)
      dispatch(createNewPassword({password,id,token},navigate))
    }

    return(
        <div className="reset-password">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ResetPassword;