import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import Footer from './Footer';
import menubackground from '../assets/images/menubackground.png';

const MenuPage = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${menubackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto py-8 flex-grow text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-700" style={{ fontFamily: 'Pacifico, cursive' }}>
          Menu
        </h2>
        <Menu />
        <Link to="/order">
          <button 
            className="mt-8 px-6 py-3 text-2xl bg-mediumslateblue text-white rounded-md hover:bg-crimson hover:text-black" 
            style={{ fontFamily: 'Pacifico, cursive', transition: 'background-color 0.3s ease, color 0.3s ease' }}
          >
            Order Now
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default MenuPage;
