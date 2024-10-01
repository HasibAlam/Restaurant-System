import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationService from '../services/ReservationService';
import Footer from './Footer';

const ManagerReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modifiedCustomerName, setModifiedCustomerName] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [modifiedTime, setModifiedTime] = useState('');
  const [modifiedNumberOfGuests, setModifiedNumberOfGuests] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const reservationService = new ReservationService();
      const reservations = await reservationService.getAllReservations();
      console.log('Fetched reservations:', reservations);
      setReservations(reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      const reservationService = new ReservationService();
      await reservationService.deleteReservation(reservationId);
      fetchReservations(); 
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const openModifyModal = (reservation) => {
    setSelectedReservation(reservation);
    setModifiedCustomerName(reservation.customer_name);
    setModifiedDate(reservation.reservation_date.split('T')[0]);
    setModifiedTime(reservation.reservation_time);
    setModifiedNumberOfGuests(reservation.num_guests);
    setShowModifyModal(true);
  };

  const closeModifyModal = () => {
    setShowModifyModal(false);
    setSelectedReservation(null);
  };

  const handleSaveChanges = async () => {
    try {
      const reservationService = new ReservationService();
      await reservationService.updateReservation(selectedReservation.reservation_id, {
        customerName: modifiedCustomerName,
        date: modifiedDate,
        time: modifiedTime,
        numberOfGuests: parseInt(modifiedNumberOfGuests)
      });
      closeModifyModal();
      fetchReservations();
    } catch (error) {
      console.error('Error modifying reservation:', error);
    }
  };

  const handleConfirmReservation = async (reservationId) => {
    try {
      const reservationService = new ReservationService();
      await reservationService.confirmReservation(reservationId);
      fetchReservations();
    } catch (error) {
      console.error('Error confirming reservation:', error);
    }
  };

  const navigateToCreateReservation = () => {
    navigate('/reservation');
  };



  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'mistyrose' }}>
      <div className="flex-grow container mx-auto py-8">
        <h2 className="text-2xl font-bold text-navy text-center" style={{ fontFamily: 'Cursive' }}>Manager Reservations</h2>
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.reservation_id} className="border border-gray-300 p-4 mb-2 rounded">
              <div style={{ color: 'black' }}>
                <p>Customer Name: {reservation.customer_name}</p>
                <p>Date: {new Date(reservation.reservation_date).toLocaleDateString()} at {new Date(`1970-01-01T${reservation.reservation_time}Z`).toLocaleTimeString()}</p>
                <p>Number of Guests: {reservation.num_guests}</p>
                <p>Confirmed: {reservation.status === 'confirmed' ? 'Yes' : 'No'}</p>
              </div>
              <div className="flex justify-end">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleConfirmReservation(reservation.reservation_id)}>Confirm</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => openModifyModal(reservation)}>Modify</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteReservation(reservation.reservation_id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        {showModifyModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
              <h3 className="text-2xl font-bold text-navy">Modify Reservation</h3>
              <input
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                type="text"
                name="modifiedCustomerName"
                value={modifiedCustomerName}
                onChange={(e) => setModifiedCustomerName(e.target.value)}
                placeholder="Customer Name"
              />
              <input
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                type="date"
                name="modifiedDate"
                value={modifiedDate}
                onChange={(e) => setModifiedDate(e.target.value)}
                placeholder="Date"
              />
              <input
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                type="time"
                name="modifiedTime"
                value={modifiedTime}
                onChange={(e) => setModifiedTime(e.target.value)}
                placeholder="Time"
              />
              <input
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                type="number"
                name="modifiedNumberOfGuests"
                value={modifiedNumberOfGuests}
                onChange={(e) => setModifiedNumberOfGuests(e.target.value)}
                placeholder="Number of Guests"
              />
              <div className="flex justify-end">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSaveChanges}>Save</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModifyModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded" onClick={navigateToCreateReservation}>Create Reservation</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManagerReservation;
