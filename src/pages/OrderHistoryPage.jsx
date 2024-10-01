import React from 'react';
import OrderHistory from '../components/OrderHistory';
import Footer from './Footer';

const OrderHistoryPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-mistyrose">
      <div className="flex-grow container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Order History</h2>
        <OrderHistory />
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistoryPage;
