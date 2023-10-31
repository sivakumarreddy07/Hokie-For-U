import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/LoginApp.css'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, connect } from 'react-redux';
import { signinGoogle, signin } from "../redux/actions/auth";
import AuthGuard1 from "./AuthGuard1";

const LoginApp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()


  function handleGoogleLoginSuccess(tokenResponse) {

    const accessToken = tokenResponse.access_token;

    dispatch(signinGoogle(accessToken, navigate))
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(signin({ email, password }, navigate))
    }
  }
  return (
    <div className='app-login'>
      <div className="login-container">
        <form action="#" className='login-form'>
          <h1>Welcome back</h1>
          <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <div className='forgotContainer'>
            <div>
              <Link to="/hokieforu/forgot-password">Forgot Password</Link>
            </div>
          </div>
          <div className='sigin'>
            <button onClick={handleSubmit} className='signin-button'>Sign In</button>
          </div>
          {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
          <span>or</span>
          <div className="social-container">
            <button type="button" class="login-with-google-btn" onClick={() => login()} >
              Sign in with Google
            </button>
          </div>
          <div className='register-link'>
            Don't have an account? <Link to="/hokieforu/register" >Sign up here</Link>
          </div>
        </form>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    errorMessage: state.auth.errorMessage,
  };
};

export default connect(mapStateToProps)(AuthGuard1(LoginApp));