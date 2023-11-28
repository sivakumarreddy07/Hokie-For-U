import React, { useState } from "react";
import '../css/RegisterApp.css';
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, connect } from 'react-redux';
import { signup, signupGoogle } from "../redux/actions/auth";
import AuthGuard1 from "./AuthGuard1";
import Notification from "./Notification";



const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
}


const RegisterApp = (props) => {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm,
        setsForm] = useState(InitState)
        const [showNotification, setShowNotification] = useState(false);

    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });

    function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        dispatch(signupGoogle(accessToken, nagivate))
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.phoneNumber !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            dispatch(signup(sForm, nagivate))
            setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
                setsForm(InitState);
        }
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
    return (
        <div className='register'>
            {showNotification && (
                <Notification
                    message="Registered Successfully!"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="app-register">
                <div className='registerImage'>
                    <img src='/images/registerImage.jpeg' alt='logo' />
                </div>
                <div className='registerForm'>
                    <div className="title">Registration</div>
                    <div className="content">
                        <form action="#" className="register-form" onSubmit={handleOnSubmit}>
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
                                    <input type='tel' name='phoneNumber' pattern="[0-9]{10}" onChange={handleChange} placeholder="Enter your number" required />
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
                                <input type="submit" value="Register" />
                            </div>
                            {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
                            <span>or</span>
                            <div className="social-container-register">
                                <button type="button" class="register-with-google-btn" onClick={() => login()} >
                                    Sign up with Google
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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

export default connect(mapStateToProps)(AuthGuard1(RegisterApp));
