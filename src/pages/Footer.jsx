import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/tailwind.css";
import icon2 from '../assets/images/icon2.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-lightsalmon to-peachpuff border-t-2 border-maroon py-4 w-full">
      <div className="container mx-auto grid grid-cols-4 gap-4 items-center">
        <div className="flex justify-center">
          <Link to="/">
            <img src={icon2} alt="Icon2" className="h-20 w-30" />
          </Link>
        </div>
        <div className="flex justify-center">
          <a href="mailto:103810516@student.swin.edu.au" className="text-maroon hover:text-crimson">Hasib Alam</a>
        </div>
        <div className="flex justify-center">
          <a href="mailto:103842975@student.swin.edu.au" className="text-maroon hover:text-crimson">Ahnaf Islam</a>
        </div>
        <div className="flex justify-center">
          <a href="mailto:102725583@student.swin.edu.au" className="text-maroon hover:text-crimson">Jesse owen</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
