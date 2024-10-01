import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import background from '../assets/images/background.jpeg';
import textbackground from '../assets/images/textbackground.png';
import Footer from './Footer';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col justify-between"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
     
      <div className="relative text-center flex-grow flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div 
          className="relative z-20 p-8 bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `url(${textbackground})`,
            backgroundColor: 'rgba(255, 255, 255, 0.55)', 
            backgroundBlendMode: 'overlay',
          }}
        >
          <h2 className="text-4xl text-black font-bold mb-8">Welcome to Our Restaurant</h2>
          <p className="text-2xl text-black mb-8">
            Welcome to The Relaxing Koala! Nestled on the bustling Glenferrie Road,<br />
            our café/restaurant has been a beloved spot for locals and visitors alike.<br />
            Known for our cozy atmosphere and delicious menu, we have recently<br />
            expanded to better serve our valued customers.
          </p>
          <p className="text-2xl text-black mb-8">
            Discover delicious dishes and delightful dining experiences!
          </p>
          <Link to="/order">
            <button className="bg-maroon text-white py-2 px-4 rounded-lg hover:bg-crimson">
              Order Now
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
