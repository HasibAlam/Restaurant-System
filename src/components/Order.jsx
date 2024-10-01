import React, { useEffect, useState } from 'react';
import MenuService from '../services/MenuService'; 
import { Link, useNavigate } from 'react-router-dom'; 

const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

class Menu {
  constructor(menuService) {
    this.menuService = menuService;
    this.menuItems = [];
  }

  async fetchMenuItems() {
    try {
      this.menuItems = await this.menuService.getMenuItems();
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  }

  getMenuItems() {
    return this.menuItems;
  }
}

const OrderComponent = () => {
  const navigate = useNavigate();
  const [menu] = useState(new Menu(new MenuService()));
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      await menu.fetchMenuItems();
      setMenuItems(menu.getMenuItems());
    };

    fetchMenuItems();
  }, [menu]);

  const addToOrder = (menuItem) => {
    const updatedOrder = [...order, menuItem];
    setOrder(updatedOrder);
    setTotal(calculateTotal(updatedOrder));
  };

  const removeFromOrder = (index) => {
    const updatedOrder = [...order];
    updatedOrder.splice(index, 1);
    setOrder(updatedOrder);
    setTotal(calculateTotal(updatedOrder));
  };

  const calculateTotal = (order) => {
    return order.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const handleProceedToPayment = async () => {
    try {
      const orderedItems = order.map(item => item.item_name).join(', '); 
      const response = await fetch('https://swe30003-assignment3-express.vercel.app/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order,
          total_amount: total,
          status: 'pending',
          ordered_items: orderedItems, 
        }),
      });

      if (response.ok) {
        console.log('Order successfully posted to the backend');
        navigate('/payment', { state: { order, total } });
      } else {
        console.error('Failed to post order to the backend');
      }
    } catch (error) {
      console.error('Error posting order to the backend:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 flex-grow">
      <h2 className="text-3xl font-bold text-crimson text-center mb-8" style={{ fontFamily: 'Pacifico, cursive' }}>Order Now</h2>
      <div className="grid grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.item_id} className="border border-mediumslateblue p-4 rounded text-center">
            <h3 className="text-xl font-bold text-mediumslateblue" style={{ fontFamily: 'Pacifico, cursive' }}>{item.item_name}</h3>
            <img src={images[`itemmenu${item.item_id}.png`]} alt={item.item_name} className="w-full h-auto mb-4" />
            <p className="text-black">{item.description}</p>
            <p className="text-blue-900 font-bold">${parseFloat(item.price).toFixed(2)}</p>
            <button onClick={() => addToOrder(item)} className="mt-2 px-4 py-2 bg-navy text-white rounded-md hover:bg-yellow-500" style={{ transition: 'background-color 0.3s ease' }}>
              Add to Order
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-3xl font-bold text-crimson text-center mb-4" style={{ fontFamily: 'Pacifico, cursive' }}>Order Details</h3>
        <div className="grid grid-cols-3 gap-4">
          {order.map((item, index) => (
            <div key={index} className="border border-mediumslateblue p-4 rounded text-center">
              <h3 className="text-xl font-bold text-mediumslateblue" style={{ fontFamily: 'Pacifico, cursive' }}>{item.item_name}</h3>
              <img src={images[`itemmenu${item.item_id}.png`]} alt={item.item_name} className="w-full h-auto mb-4" />
              <p className="text-black">{item.description}</p>
              <p className="text-blue-900 font-bold">${parseFloat(item.price).toFixed(2)}</p> 
              <button onClick={() => removeFromOrder(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-3xl font-bold text-crimson" style={{ fontFamily: 'Pacifico, cursive' }}>Total: ${total.toFixed(2)}</h3>
          {total > 0 && (
            <button onClick={handleProceedToPayment} className="mt-4 px-6 py-3 text-2xl bg-mediumslateblue text-white rounded-md hover:bg-fuchsia hover:text-black" style={{ fontFamily: 'Pacifico, cursive' }}>
              Proceed to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
