import React from 'react';
import hand_icon from '../Assets/Frontend_Assets/hand_icon.png';
import './Hero.css';
// import arrow_icon from '../Assets/Frontend_Assets/arrow.png';
import hero_image from '../Assets/Frontend_Assets/hero_image.png';

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero_left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero_hand_icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            {/* <div className='hero_latest_btn'>
                <h1>Latest Collection Below</h1>
                <img src={arrow_icon} alt="" />
            </div> */}
        </div>
        <div className="hero_right">
        <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero