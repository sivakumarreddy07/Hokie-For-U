import React from 'react'
import '../css/HeaderApp.css';
import "@fontsource/luckiest-guy";
import { useEffect, useState } from 'react';
import { Link , useLocation} from 'react-router-dom';

const HeaderApp = ({authenticated, handleLogOut}) => {


  const [color, setColor] = useState('transparent');
  const height = window.innerHeight;
  const location = useLocation();

  // Determine whether the current route is the home page
  const isHomePage = location.pathname === '/hokieforu' ;
  useEffect(() => {
   
    const handleScroll = () => {
      // Check if the scroll position is greater than 200 pixels
      const newColor = window.scrollY > height - 200 ? '#861f41' : 'transparent';

      // Update the background color state
      setColor(newColor);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  

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


