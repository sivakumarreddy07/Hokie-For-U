import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import '../css/Login.css'
import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {signinGoogle, signin} from "../redux/actions/auth";

const Login = () => {
  const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate ()
    const dispatch = useDispatch()


    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signinGoogle(accessToken,navigate))
    }
    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    function handleSubmit(e){
        e.preventDefault();
        if(email !== "" && password !== ""){
            dispatch(signin({email,password}, navigate))
        }

    }
  return (
    <div className='app-login'>

      <div className="login-container">
        <form action="#" className='login-form'>
          <h1>Welcome back</h1>
          <input type="email" onChange={e=> setEmail(e.target.value)} placeholder="Email" />
          <input type="password" onChange={e=> setPassword(e.target.value)} placeholder="Password" />
          <div className='forgotContainer'>
            <div className='remember'>
            Remember Me<input type="checkbox" /> 
            </div>
            <div>
              <a href="#">Forgot your password?</a>
            </div>
          </div>
          <div className='sigin'>
          <button onClick={handleSubmit} className='signin-button'>Sign In</button></div>
          <span>or</span>
          <div className="social-container">
          Sign in with
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <Link onClick={() => login()} class="social"><i class="fab fa-google-plus-g"></i></Link>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <div className='register-link'>
            Don't have an account? <Link to="/hokieforu/register" >Sign up here</Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login
