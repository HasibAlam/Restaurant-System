import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationService from '../services/ReservationService';

const Reservation = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const navigate = useNavigate();

  const handleCreateReservation = async () => {
    if (!customerName.trim()) {
      console.error('Customer name is required.');
      return;
    }
  
    const reservationService = new ReservationService();
    try {
      console.log('Attempting to create reservation...');
      await reservationService.createReservation({
        customerName,
        date,
        time,
        numberOfGuests
      });
      console.log('Reservation created successfully!');
      setShowMessageBox(true);
      setTimeout(() => {
        navigate('/managereservation');
      }, 2000);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };  

  const handleCloseMessageBox = () => {
    setShowMessageBox(false);
  };

  return (
    <div className="container mx-auto py-8">
      {showMessageBox && (
        <div className="reservation-successful-popup border border-green-500 bg-green-100 p-4 rounded relative text-black text-center">
          <h2>Reservation Successfully Sent!</h2>
          <p>Your reservation for {customerName} on {date} at {time} for {numberOfGuests} guests has been successfully sent to the admin.<br /> You will be notified once it has been accepted.</p>
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-red-500"
            onClick={handleCloseMessageBox}
          >
            &times;
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="border border-navy p-8 rounded w-1/3 mx-4 text-white">
          <h3 className="text-2xl font-bold text-navy">Create Reservation</h3>
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            type="text"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
          />
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
          />
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Time"
          />
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            type="number"
            name="numberOfGuests"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            placeholder="Number of Guests"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={handleCreateReservation}>Create Reservation</button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
