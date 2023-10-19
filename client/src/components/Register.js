import React, {useState} from "react";
import '../css/Register.css';
import {Link,useNavigate} from "react-router-dom";

import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {signup, signupGoogle} from "../redux/actions/auth";



const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    phone:'',
    password: '',
    confirmPassword: ''
}


const Register = () => {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm,
        setsForm] = useState(InitState)

    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });

    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signupGoogle(accessToken,nagivate))
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.phone!=="" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            dispatch(signup(sForm,nagivate))
        }
    }

    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
    return (

        <div className='register'>
            <div className="app-register">
                <div className='registerImage'>
                    <img src='/images/registerImage.jpeg' alt='logo'/>
                </div>
                <div className='registerForm'>
                    <div className="title">Registration</div>
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">First Name</span>
                                    <input onChange={handleChange} name='firstName' type="text" placeholder="Enter your first name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Last name</span>
                                    <input type="text" name="lastName" onChange={handleChange} placeholder="Enter your last name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input type='tel' name='phone' onChange={handleChange} placeholder="Enter your number" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm your password" required />
                                </div>
                            </div>
                            <div className='login-link'>
                                Already a user?&nbsp;<Link to="/hokieforu/login">Login here</Link>
                            </div>
                            <div class="button">
                                <input type="submit" onClick={handleOnSubmit} value="Register" />
                            </div>
                            <span>or</span>
                            <div className="social-container-register">
                            Sign in with
                                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                <Link onClick={() => login()}  class="social"><i class="fab fa-google-plus-g"></i></Link>
                                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
