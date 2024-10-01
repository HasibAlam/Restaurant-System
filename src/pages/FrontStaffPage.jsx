import React, { useState, useEffect } from 'react';
import ReservationService from '../services/ReservationService';
import Footer from './Footer';
import front1 from '../assets/images/front1.png';
import front2 from '../assets/images/front2.png';
import OrderHistory from '../components/OrderHistory'; 

const FrontStaffPage = () => {
  const [showReservations, setShowReservations] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modifiedCustomerName, setModifiedCustomerName] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [modifiedTime, setModifiedTime] = useState('');
  const [modifiedNumberOfGuests, setModifiedNumberOfGuests] = useState('');
  const [showOrderHistory, setShowOrderHistory] = useState(false);

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

  const toggleShowReservations = () => {
    setShowReservations(!showReservations);
  };

  const toggleShowOrderHistory = () => {
    setShowOrderHistory(!showOrderHistory);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'mistyrose' }}>
      <div className="flex-grow container mx-auto py-8">
        <h1 className="text-5xl font-bold mb-4 text-deepskyblue text-center" style={{ fontFamily: 'Pacifico, cursive' }}>
          Front Staff Page
        </h1>
        <div className="flex">
          <div className="w-1/4 flex flex-col items-center">
            <div className="mb-8">
              <img src={front1} alt="Reservations" className="w-full mb-2" />
              <button
                className="bg-deepskyblue hover:bg-mediumslateblue text-white font-bold py-2 px-4 rounded"
                style={{ fontFamily: 'Cursive', marginLeft: '138px' }}
                onClick={toggleShowReservations}
              >
                Reservations
              </button>
            </div>
            <div>
              <img src={front2} alt="Order Status" className="w-full mb-2" />
              <button 
                className="bg-deepskyblue hover:bg-mediumslateblue text-white font-bold py-2 px-4 rounded"
                style={{ fontFamily: 'Cursive', marginLeft: '130px' }}
                onClick={toggleShowOrderHistory} 
              >
                Order Status
              </button>
            </div>
          </div>
          {showReservations && (
            <div className="w-3/4">
              <div className="flex-grow container mx-auto py-8">
                <h2 className="text-2xl font-bold text-navy text-center" style={{ fontFamily: 'Cursive' }}>Front Staff Reservations</h2>
                <ul>
                  {reservations.map(reservation => (
                    <li key={reservation.reservation_id} className="border border-gray-300 p-4 mb-2 rounded">
                      <div style={{ color: 'black' }}>
                        <p>Customer Name: {reservation.customer_name}</p>
                        <p>Date: {new Date(reservation.reservation_date).toLocaleDateString()} at {reservation.reservation_time}</p>
                        <p>Number of Guests: {reservation.num_guests}</p>
                        <p>Confirmed: {reservation.confirmed ? <span style={{ color: 'lime', fontWeight: 'bold' }}>Yes</span> : 'No'}</p>
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
              </div>
            </div>
          )}
          {showOrderHistory && <OrderHistory />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FrontStaffPage;
