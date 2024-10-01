import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer'; 
import cashbg from '../assets/images/cashbg.jpeg'; 

function CashPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, total } = location.state || {};

  const [cashAmount, setCashAmount] = useState('');
  const [changeAmount, setChangeAmount] = useState(0);
  const [acceptedCash, setAcceptedCash] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleCashAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    setCashAmount(amount);
  };

  const handleAcceptCash = () => {
    if (cashAmount >= total) {
      setChangeAmount(cashAmount - total);
      setAcceptedCash(true);
    } else {
      alert('Please enter an amount equal to or greater than the total.');
    }
  };

  const handleConfirmPayment = () => {
    setPaymentComplete(true);
    setTimeout(() => {
      navigate('/salesreceipt', { state: { order, total } });
    }, 2000);
  };

  if (!order || total === undefined) {
    navigate('/');
    return null;
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${cashbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto py-8 flex-grow text-center flex flex-col justify-center items-center">
        <div className="cash-page bg-white bg-opacity-80 p-8 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4 text-black">Cash Payment</h1>
          <div className="mb-4">
            <p className="text-black">Total Amount: ${total.toFixed(2)}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="cashAmount" className="block text-black">Enter Cash Amount:</label>
            <input
              type="number"
              id="cashAmount"
              value={cashAmount}
              onChange={handleCashAmountChange}
              className="w-64 p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {!acceptedCash && (
            <button
              onClick={handleAcceptCash}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-2"
            >
              Accept Cash
            </button>
          )}
          {acceptedCash && (
            <div>
              <p className="mb-4 text-black">Change Amount: ${changeAmount.toFixed(2)}</p>
              <button
                onClick={handleConfirmPayment}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Confirm Payment
              </button>
            </div>
          )}
          {paymentComplete && (
            <p className="mt-4 text-green-500 font-bold">Payment Completed. Redirecting...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CashPage;
