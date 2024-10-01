import React from 'react';
import KitchenStaff from '../components/KitchenStaff';
import OrderHistory from '../components/OrderHistory';
import Footer from './Footer';
import Navbar from './Navbar'

const KitchenStaffPage = () => {
  return (
    <div>
      <OrderHistory />
      <Footer />
    </div>
  );
}

export default KitchenStaffPage;
