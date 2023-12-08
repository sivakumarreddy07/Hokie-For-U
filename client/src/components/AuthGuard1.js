import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthGuard1(Component) {
  return function WrappedComponent(props) {
    const isAuthenticated = localStorage.getItem('user_info') !== null; // Adjust this based on your Redux state
    const navigate = useNavigate();

    if (isAuthenticated) {
      // User is already logged in, redirect to the home page
      navigate('/hokieforu/account/home');
      return null;
    }
    return <Component {...props} />;
  };
}

export default AuthGuard1;