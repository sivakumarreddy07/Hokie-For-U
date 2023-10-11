import React from 'react'
import '../css/HeaderApp.css';
import "@fontsource/luckiest-guy";
import { useEffect,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderApp=()=> {

  const [color, setColor] = useState('transparent');
  const height = window.innerHeight;
  const location = useLocation();

  // Determine whether the current route is the home page
  const isHomePage = location.pathname === '/';
  const headerClass = isHomePage ? 'app-header' : 'header2';
  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than 200 pixels
      console.log(window.scrollY)
      const newColor = window.scrollY > height-200 ? '#861f41' : 'transparent';

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
    <div className='app-header' style={isHomePage?{backgroundColor: `${color}`}:{backgroundColor:'#861f41'}}>
        <Link className='logo-and-title' to="/">
          <img src='/images/logo.png' alt='logo'></img>
            <span>Hokie For U</span>
        </Link>
        <Link to="/login" className='login-button'>Login</Link>
      </div>
  )
}

export default HeaderApp


