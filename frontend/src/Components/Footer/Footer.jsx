import React from 'react';
import instagram_icon from '../Assets/Frontend_Assets/instagram_icon.png';
import footer_logo from '../Assets/Frontend_Assets/logo_big.png';
import pintester_icon from '../Assets/Frontend_Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/Frontend_Assets/whatsapp_icon.png';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
         <ul className="footer_links">
             <li><a className='text-dark text-decoration-none' href="https://www.instagram.com/shoppershop.1?igsh=d2M0Y2lwMWJoNzR2">Company</a></li>
             <li><a className='text-dark text-decoration-none' href="/">Products</a></li>
             <li><a className='text-dark text-decoration-none' href="#">Offices</a></li>
             <li><a className='text-dark text-decoration-none' href="/about">About</a></li>
             <li><a className='text-dark text-decoration-none' href="/contact">Contact</a></li>
         </ul>
         <div className="footer_social_icon">
             <div className="footer_icon_container">
              <a href="https://www.instagram.com/shoppershop.1?igsh=d2M0Y2lwMWJoNzR2" target="_blank">
                 <img src={instagram_icon} alt="" />
                 </a>
             </div>
             <div className="footer_icon_container">
              <a href="https://in.pinterest.com/" target="_blank">
                 <img src={pintester_icon} alt="" />
                 </a>
             </div>
             <div className="footer_icon_container">
              <a href="https://wa.me/8528952310" target='blank'>
                 <img src={whatsapp_icon} alt="" />
                 </a>
             </div>
             
         </div>
         <div className="footer_copyright">
            <hr/>
            <p>&copy; Copyright 2025 - All Right Reserved. Designed by <a href="https://dayananddubey.netlify.app/" className='text-success text-decoration-none' target='blank'>Coder Daya...</a></p>
         </div>
    </div>
  )
}

export default Footer