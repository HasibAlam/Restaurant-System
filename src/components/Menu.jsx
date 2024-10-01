import React, { useEffect, useState } from 'react';
import MenuService from '../services/MenuService';

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
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

const MenuComponent = () => {
  const [menu] = useState(new Menu(new MenuService()));
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      await menu.fetchMenuItems();
      setMenuItems(menu.getMenuItems());
    };

    fetchMenuItems();
  }, [menu]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-3 gap-4">
        {menuItems.map(item => (
          <div key={item.item_id} className="border border-mediumslateblue p-4 rounded text-center">
            <h3 className="text-xl font-bold text-mediumslateblue" style={{ fontFamily: 'Pacifico, cursive' }}>{item.item_name}</h3>
            <img src={images[`itemmenu${item.item_id}.png`]} alt={item.item_name} className="w-full h-auto mb-4" />
            <p className="text-black">{item.description}</p>
            <p className="text-blue-900 font-bold">${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuComponent;
