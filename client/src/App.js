import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { AUTH_ERROR, LOGOUT } from "../src/redux/const/actionTypes";
import './css/App.css';
import HomeApp from './components/HomeApp';
import HeaderApp from './components/HeaderApp'
import LoginApp from "./components/LoginApp";
import NotFoundPage from "./components/NotFoundPage";
import RegisterApp from "./components/RegisterApp";
import AccountApp from "./components/AccountApp"
import ForgotPasswordApp from "./components/ForgotPasswordApp";
import ResetPasswordApp from "./components/ResetPasswordApp";
import PostJobApp from "./components/PostJobApp";
import ProfileApp from "./components/ProfileApp";
import FetchJobApp from "./components/FetchJobApp";



function App() {
  const [authenticated, setAuthenticated] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('user_info') !== null;
    setAuthenticated(isAuthenticated);
    dispatch({ type: AUTH_ERROR, errorMessage: null });
  });
  const handleLogOut = (e) => {
    // Clear the authentication token from local storage
    e.preventDefault()
    navigate("/hokieforu/login");
    dispatch({ type: LOGOUT })

    // Update the state to indicate logged out
    setAuthenticated(false);
  };
  return (
    <div className="App">
      <HeaderApp authenticated={authenticated} handleLogOut={handleLogOut} />
      <Routes>
        <Route path="/hokieforu" Component={HomeApp} />
        <Route path="/" element={<Navigate to="/hokieforu" replace />} />
        <Route path='/hokieforu/login' Component={LoginApp} />
        <Route path='/hokieforu/account/home' Component={AccountApp} />
        <Route path="/hokieforu/register" Component={RegisterApp} />
        <Route path="/hokieforu/forgot-password" Component={ForgotPasswordApp}></Route>
        <Route path="/hokieforu/reset-password/:id/:token" Component={ResetPasswordApp}></Route>
        <Route path="/hokieforu/account/post-a-job" Component={PostJobApp} />
        <Route path="/hokieforu/account/myprofile" Component={ProfileApp} />
        <Route path="/hokieforu/account/myjobs" Component={FetchJobApp} /> 
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </div>
  );
}

export default App;