import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Payment from '../components/Payment'; 
import success from '../assets/images/success.jpeg'; 

function SalesReceipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, total } = location.state || {};

  const [paymentProcessor, setPaymentProcessor] = useState(null);

  useEffect(() => {
    if (!order || total === undefined) {
      navigate('/');
    } else {
      const payment = new Payment(order, total);
      setPaymentProcessor(payment);
      payment.processTransaction('receipt'); 
    }
  }, [order, total, navigate]);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [document.getElementById('sales-receipt-content').innerText], 
      {type: 'text/plain'}
    );
    element.href = URL.createObjectURL(file);
    element.download = "SalesReceipt.txt";
    document.body.appendChild(element); 
    element.click();
  };

  const handleSendEmail = () => {
    alert('Email functionality not implemented yet.');
  };

  if (!order || total === undefined) {
    return null;
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${success})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <div 
          id="sales-receipt-content" 
          className="p-16 max-w-2xl w-full border-2 border-black bg-lightsalmon rounded shadow-lg text-center"
        >
          <h1 className="text-5xl font-bold mb-2 text-green-500" style={{ fontFamily: 'Pacifico, cursive' }}>
            Payment Successful
          </h1>
          <h2 className="text-3xl font-bold mb-6 text-black" style={{ fontFamily: 'Pacifico, cursive' }}>
            Order Confirmed
          </h2>
          <div className="sales-report-page">
            <h1 className="text-4xl font-bold mb-6 text-purple-700" style={{ fontFamily: 'Pacifico, cursive' }}>
              Sales Receipt
            </h1>
            <div className="order-details mb-6">
              <h2 className="text-3xl font-bold mb-4 text-red-600">Order Details:</h2>
              <ul className="text-left text-2xl">
                {order.map((item, index) => (
                  <li key={index} className="text-black">
                    {item.item_name} - 
                    <span className="font-bold">
                      ${parseFloat(item.price).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mb-6 font-bold text-2xl text-red-600">
              Total: ${parseFloat(total).toFixed(2)}
            </p>
            <p className="mb-2 font-bold text-xl text-black">Restaurant: The Relaxing Koala</p>
            <p className="font-bold text-xl text-black">Thank you for ordering!</p>
          </div>
        </div>
        <div className="mt-8 flex space-x-8">
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white py-4 px-8 rounded text-2xl hover:bg-blue-700"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalesReceipt;
