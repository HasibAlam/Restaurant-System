import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Payment from '../components/Payment'; 
import background from '../assets/images/background.jpeg';
import { AttachMoney, CreditCard } from '@mui/icons-material';
import Footer from './Footer';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const total = location.state?.total;

  const [paymentProcessor, setPaymentProcessor] = useState(null);

  useEffect(() => {
    if (!order || total === undefined) {
      navigate('/');
    } else {
      const convertedOrder = order.map(item => ({
        ...item,
        price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
      }));
      const payment = new Payment(convertedOrder, total);
      setPaymentProcessor(payment);
      console.log('Order:', convertedOrder);
    }
  }, [order, total, navigate]);
  

  const handlePayment = (method) => {
    if (paymentProcessor) {
      paymentProcessor.processTransaction(method);
      if (method === 'cash') {
        navigate('/cash', { state: { order, total } });
      } else if (method === 'card') {
        navigate('/card', { state: { order, total } });
      }
    }
  };

  if (!order || total === undefined) {
    return null;
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="payment-page bg-white bg-opacity-90 p-12 rounded shadow-lg text-center max-w-lg w-full">
          <h2 className="text-4xl font-bold mb-6 text-purple-700" style={{ fontFamily: 'Pacifico, cursive' }}>
            Payment Page
          </h2>
          <div className="order-details mb-6">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Order Details:</h2>
            <ul className="text-left text-lg">
              {order.map((item, index) => {
                const convertedPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                return (
                  <li key={index} className="text-black">
                    {item.item_name} - <span className="font-bold">{typeof convertedPrice === 'number' ? `$${convertedPrice.toFixed(2)}` : 'Price not available'}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mb-6 font-bold text-xl text-red-600">Total: ${total.toFixed(2)}</p>
          <div className="flex justify-center space-x-4">
            <button 
              className="bg-green-500 text-white py-3 px-6 rounded flex items-center hover:bg-green-700" 
              onClick={() => handlePayment('cash')}>
              <AttachMoney className="mr-2" /> Pay with Cash
            </button>
            <button 
              className="bg-blue-500 text-white py-3 px-6 rounded flex items-center hover:bg-blue-700" 
              onClick={() => handlePayment('card')}>
              <CreditCard className="mr-2" /> Pay with Card
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentPage;
