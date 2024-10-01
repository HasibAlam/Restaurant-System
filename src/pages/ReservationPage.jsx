import React from 'react';
import Reservation from '../components/Reservation';
import Footer from './Footer';

const ReservationPage = () => {
  const managerId = 1;
  return (
    <div className="flex flex-col min-h-screen bg-mistyrose">
      <div className="flex-grow container mx-auto py-8">
        <Reservation managerId={managerId} />
      </div>
      <Footer />
    </div>
  );
}

export default ReservationPage;
