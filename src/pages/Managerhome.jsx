import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import editMenu from '../assets/images/editmenu.png';
import salesReport from '../assets/images/salesReport.png';
import reservation from '../assets/images/reservation.png';
import managerbackground from '../assets/images/managerbackground.png'; 

const Managerhome = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${managerbackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-grow container mx-auto py-8">
        <h1 className="text-5xl font-bold mb-32 text-blue-900 text-center" style={{ fontFamily: 'Pacifico, cursive' }}>
          Manager Hub
        </h1>
        <div className="flex justify-center space-x-16">
          <div className="text-center">
            <img src={editMenu} alt="Edit Menu" className="w-72 h-auto mx-auto mb-8" />
            <Link to="/manager">
              <button className="bg-transparent text-black text-2xl py-2 px-4 rounded hover:text-red-500" style={{ fontFamily: 'Pacifico, cursive' }}>
                Edit Menu
              </button>
            </Link>
          </div>
          <div className="text-center">
            <img src={salesReport} alt="Sales Report" className="w-72 h-auto mx-auto mb-8" />
            <Link to="/salesreport">
            <button className="bg-transparent text-black text-2xl py-2 px-4 rounded hover:text-red-500" style={{ fontFamily: 'Pacifico, cursive' }}>
              Sales Report
            </button>
            </Link>
          </div>
          <div className="text-center">
            <img src={reservation} alt="Reservation" className="w-72 h-auto mx-auto mb-8" />
            <Link to="/managereservation">
              <button className="bg-transparent text-black text-2xl py-2 px-4 rounded hover:text-red-500" style={{ fontFamily: 'Pacifico, cursive' }}>
                Reservation
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Managerhome;
