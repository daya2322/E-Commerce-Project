import React from 'react';
import exclusive_image from '../Assets/Frontend_Assets/exclusive_image.png';
import './Offers.css';

const Offers = () => {
  return (
    <div className='offers'>
       <div className="offers_left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUUCTS</p>
        {/* <h3>Check Now Below</h3> */}
       </div>
       <div className="offers_right">
          <img src={exclusive_image} alt="" height='450px' />
       </div>

    </div>
  )
}

export default Offers