import React from 'react';
import './Navbar.css'


// importing images from src/Components/Assets
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
    
  return (
    <div className='navbar'>
        
            <img src={navlogo} alt="" className='nav_logo' />
            <img src={navProfile} alt="" height="60px" width="80px" className='nav_profile' />
            
     </div>

)}

export default Navbar;
        