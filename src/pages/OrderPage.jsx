import React, { useEffect, useState } from 'react';
import MenuService from '../services/MenuService';
import Order from '../components/Order';
import Footer from '../pages/Footer'; 

const OrderPage = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuService = new MenuService();
        const items = await menuService.getMenuItems();
        setMenu(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-mistyrose">
      <div className="flex-grow">
        <Order menu={menu} />
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
