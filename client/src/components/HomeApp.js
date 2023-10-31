import React from 'react'
import '../css/HomeApp.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import AuthGuard1 from './AuthGuard1';
// ..
AOS.init();

const HomeApp = () => {
  const [scrollY, setScrollY] = useState(localStorage.getItem('scrollPosition') || 0);;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      localStorage.setItem('scrollPosition', currentScrollY);
      setScrollY(window.scrollY);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  // Adjust the position of your parallax elements based on the scroll position
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`, // Adjust the multiplier to control the parallax effect
  };
  return (
    <div className='app-home'>
      <div className="parallax-bg" style={parallaxStyle}>
        <p>Connecting Hokies with communities ,Creating Change</p>
        <button className='cta-button'><Link to="/hokieforu/register">Join Us</Link></button></div>
      <div className='app-intro'>
        <div className='story1'>
          <img data-aos="fade-right" src='images/story1.jpeg' alt='story1' className='story-image' data-aos-offset="100" data-aos-duration="500" data-aos-delay="300" />
          <div data-aos="fade-left" className='story-text' data-aos-offset="100" data-aos-duration="500" data-aos-delay="400">
            <p>I was impressed by how quickly I found a local job that matched my needs and schedule on this platform. The convenience and the satisfaction of a job well done make this site a go-to for Virginia Tech students!"</p>
            <p className='user-type'>- Delighted VT Student</p>
          </div>
        </div>
        <div className='story2'>
          <img data-aos="fade-right" src='images/story2.jpeg' alt='story1' className='story-image' data-aos-offset="100" data-aos-duration="500" data-aos-delay="300" />
          <div data-aos="fade-left" className='story-text' data-aos-offset="100" data-aos-duration="500" data-aos-delay="400">
            <p>"I needed help with household chores, and this website connected me with a responsible and hardworking Virginia Tech student. The service exceeded my expectations, and I couldn't be happier!"</p>
            <p className='user-type'> - Ecstatic Local Resident</p>
          </div>
        </div>
        <div className='story3'>
          <img data-aos="fade-right" src='images/story3.jpeg' alt='story1' className='story-image' data-aos-offset="100" data-aos-duration="500" data-aos-delay="300" />
          <div data-aos="fade-left" className='story-text' data-aos-offset="100" data-aos-duration="500" data-aos-delay="400">
            <p>I found the perfect help for a small field work in my vegetable garden on this site. Posting a job was a breeze, and the student who helped me did an excellent job. I'm highly satisfied!"</p>
            <p className='user-type'> - Happy Local Resident</p>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li><a href="#">Phone Number <i class="fa fa-phone-alt"></i> : <br />+1 540558XXXX</a></li>
                <li><a href="#">Email <i class="fa fa-envelope"></i> : <br />hokieforu@gmail.com</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>get help</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Related Links</h4>
              <ul>
                <li><Link to="/hokieforu">Home</Link></li>
                <li><Link to="/hokieforu/register">Register</Link></li>
                <li><Link to="/hokieforu/login">Login</Link></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>follow us</h4>
              <div class="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

          </div><div className='copyright'>
            Copyright &copy;, 2023 HokieForU.com
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AuthGuard1(HomeApp);