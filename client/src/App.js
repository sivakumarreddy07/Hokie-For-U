import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { LOGOUT } from "../src/redux/const/actionTypes";
import './css/App.css';
import HomeApp from './components/HomeApp';
import HeaderApp from './components/HeaderApp'
import Login from "./components/Login";
import NotFoundPage from "./components/NotFoundPage";
import Register from "./components/Register";
import AccountApp from "./components/AccountApp"
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";



function App() {
  const [authenticated, setAuthenticated] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('user_info') !== null;
    setAuthenticated(isAuthenticated);
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
        <Route path='/hokieforu/login' Component={Login} />
        <Route path='/hokieforu/account/home' Component={AccountApp} />
        <Route path="/hokieforu/register" Component={Register} />
        <Route path="/hokieforu/forgot-password" Component={ForgotPassword}></Route>
        <Route path="/hokieforu/reset-password/:id/:token" Component={ResetPassword}></Route>
        <Route path="*" Component={NotFoundPage} />

      </Routes>
    </div>
  );
}

export default App;