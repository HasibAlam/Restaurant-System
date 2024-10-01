import React, { useEffect, useState } from 'react';
import MenuService from '../services/MenuService';
import Manager from '../components/Manager';

const ManagerPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedItems, setUpdatedItems] = useState({});
  const manager = new Manager('John Doe', 'contact@example.com', 'managerUsername', 'managerPassword');
  const [editItemId, setEditItemId] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const menuData = await new MenuService().getMenuItems();
      setMenuItems(menuData);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'An error occurred while loading data.');
      setLoading(false);
    }
  };

  const handleModify = (itemId) => {
    setEditItemId(itemId);
    setUpdatedItems({ ...updatedItems, [itemId]: { ...menuItems.find(item => item.item_id === itemId) } });
  };

  const handleSave = async (itemId) => {
    try {
      const updatedItemForId = updatedItems[itemId];
      await manager.modifyMenuItem(itemId, updatedItemForId);
      setUpdatedItems({ ...updatedItems, [itemId]: null });
      loadData();
    } catch (error) {
      console.error('Error modifying item:', error);
    }
  };

  const handleInputChange = (itemId, event) => {
    const { name, value } = event.target;
    setUpdatedItems({
      ...updatedItems,
      [itemId]: { ...updatedItems[itemId], [name]: value }
    });
  };

  const handleDelete = async (itemId) => {
    try {
      await manager.deleteMenuItem(itemId);
      loadData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const newItem = {
        item_name: newItemName,
        description: newItemDescription,
        price: newItemPrice,
      };
      await manager.addMenuItem(newItem);
      loadData();
      setNewItemName('');
      setNewItemDescription('');
      setNewItemPrice(0);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-lavenderblush">
      <div className="flex-grow container mx-auto py-8 text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-900" style={{ fontFamily: 'Pacifico, cursive' }}>Manager Admin</h2>
        <h2 className="text-4xl font-bold mb-4 text-blue-900" style={{ fontFamily: 'Pacifico, cursive' }}>Edit Menu</h2>
        <div className="text-center mb-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddItem}>Add Item</button>
        </div>
        {loading ? (
          <p className="text-xl" style={{ fontFamily: 'Pacifico, cursive' }}>Loading...</p>
        ) : error ? (
          <p className="text-xl text-red-500" style={{ fontFamily: 'Pacifico, cursive' }}>Error: {error}</p>
        ) : (
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-3 gap-4">
              {menuItems.map((menuItem) => (
                <div key={menuItem.item_id} className="border border-gray-300 p-4 rounded text-center">
                  {updatedItems[menuItem.item_id] ? (
                    <>
                      <input
                        type="text"
                        name="item_name"
                        placeholder="New Name"
                        value={updatedItems[menuItem.item_id].item_name || ''}
                        onChange={(event) => handleInputChange(menuItem.item_id, event)}
                        className="mb-2 px-2 py-1 border border-gray-400 rounded"
                      />
                      <textarea
                        name="description"
                        placeholder="New Description"
                        value={updatedItems[menuItem.item_id].description || ''}
                        onChange={(event) => handleInputChange(menuItem.item_id, event)}
                        className="mb-2 px-2 py-1 border border-gray-400 rounded"
                      ></textarea>
                      <input
                        type="number"
                        name="price"
                        placeholder="New Price"
                        value={updatedItems[menuItem.item_id].price || ''}
                        onChange={(event) => handleInputChange(menuItem.item_id, event)}
                        className="mb-2 px-2 py-1 border border-gray-400 rounded"
                      />
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleSave(menuItem.item_id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>{menuItem.item_name}</h3>
                      <p className="text-gray-600 mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>{menuItem.description}</p>
                      <p className="text-blue-900 font-bold mb-4" style={{ fontFamily: 'Pacifico, cursive' }}>${parseFloat(menuItem.price).toFixed(2)}</p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleModify(menuItem.item_id)}>Modify</button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleDelete(menuItem.item_id)}>Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerPage;
