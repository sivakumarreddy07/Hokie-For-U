import React from 'react'
import '../css/HeaderApp.css';
import "@fontsource/luckiest-guy";
import { useEffect, useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { LOGOUT } from "../redux/const/actionTypes"
import { useNavigate } from "react-router-dom";

const HeaderApp = ({authenticated, handleLogOut}) => {

  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  //const [authenticated, setAuthenticated] = useState(false)

  const [color, setColor] = useState('transparent');
  const height = window.innerHeight;
  const location = useLocation();

  // Determine whether the current route is the home page
  const isHomePage = location.pathname === '/hokieforu';
  //const headerClass = isHomePage ? 'app-header' : 'header2';
  useEffect(() => {
    /*const localUser = JSON.parse(localStorage.getItem("user_info"));
    if (localUser) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }*/
    const handleScroll = () => {
      // Check if the scroll position is greater than 200 pixels
      const newColor = window.scrollY > height - 200 ? '#861f41' : 'transparent';

      // Update the background color state
      setColor(newColor);
    };

    console.log(authenticated)
    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  /*
  function handleLogOut(e) {
    e.preventDefault()
    navigate("/hokieforu");
    dispatch({ type: LOGOUT })
    
  }*/

  return (
    <div className='app-header' style={isHomePage ? { backgroundColor: `${color}` } : { backgroundColor: '#861f41' }}>
      <Link className='logo-and-title' to="/hokieforu">
        <img src='/images/logo.png' alt='logo'></img>
        <span>Hokie For U</span>
      </Link>

      <div>
        {authenticated ?
                <Link onClick={handleLogOut} className='login-button' to="/hokieforu">Logout</Link>
          :
          <Link to="/hokieforu/login" className='login-button'>Login</Link>
        }

      </div>
      
    </div>
  )
}

export default HeaderApp;


