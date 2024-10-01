import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/tailwind.css";
import icon2 from '../assets/images/icon2.png'; 

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-lightsalmon to-peachpuff border-b-2 border-maroon py-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/">
              <img src={icon2} alt="Icon2" className="h-20 w-30" />
            </Link>
          </li>
          <li><Link to="/" className="text-maroon hover:text-crimson">Home</Link></li>
          <li><Link to="/order" className="text-maroon hover:text-crimson">Order</Link></li>
          <li><Link to="/reservation" className="text-maroon hover:text-crimson">Reservation</Link></li>        </ul>
        <ul className="flex space-x-4">
          <li><Link to="/login" className="text-maroon hover:text-crimson">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
