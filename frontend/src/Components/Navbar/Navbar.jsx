import React, { useContext, useRef, useState, } from 'react';
import './Navbar.css';
// import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png'

// importing images from src/Components/Assets
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import cart_icon from '../Assets/Frontend_Assets/cart.png';
import logo from '../Assets/Frontend_Assets/logo.png';

const Navbar = () => {
    
    const [menu,setMenu]=useState("shop")
    const {getTotalCartItems}= useContext(ShopContext);
    
    // for responsive app
    const menuRef= useRef();

    const dropdown_toggle =(e)=>{
        menuRef.current.classList.toggle("nav_menu_visible");
        e.target.classList.toggle("open");
}

  return (
    <div className='navbar px-5'>
        <div className="nav_logo">
            <img src={logo} alt="" height="60px" width="80px" />
            <p>SHOPPERS</p>
        </div>
        <img className="nav_dropdown" onClick={dropdown_toggle} src="" alt=""/>
            <ul ref={menuRef} className="nav_menu">
        
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none',color:'#626262'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none',color:'#626262'}} to='/mens'>Mens</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none',color:'#626262'}} to='/womens'>Womens</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none',color:'#626262'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav_login_cart">
            {localStorage.getItem('auth-token')
            ?<select onChange={(e) => {
                const value = e.target.value;
                if (value === 'profile') {
                  window.location.href = '/profile';
                } else if (value === 'logout') {
                  localStorage.removeItem('auth-token');
                  window.location.replace('/');
                }
              }}>
                <option value="">Account</option>
                <option value="profile">My Profile</option>
                <option value="logout">Logout</option>
              </select>
            : <Link to='/login'><button>Login</button></Link>}
           
            <Link to='/cart'><img src={cart_icon} alt="" height="50px" width="60px"/></Link>
            <div className="nav_cart_count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar