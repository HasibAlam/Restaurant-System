import axios from 'axios';

class MenuService {
  constructor() {
    this.url = 'https://swe30003-assignment3-express.vercel.app/menuitems';
  }

  async getMenuItems() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async modifyMenuItem(item_id, updatedItem) {
    try {
      const response = await axios.put(`${this.url}/${item_id}`, updatedItem);
      return response.data;
    } catch (error) {
      throw new Error(`Error modifying menu item: ${error.message}`);
    }
  }

  async deleteMenuItem(item_id) {
    try {
      const response = await axios.delete(`${this.url}/${item_id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting menu item: ${error.message}`);
    }
  }

  async addMenuItem(newItem) {
    try {
      const response = await axios.post(this.url, newItem);
      return response.data;
    } catch (error) {
      throw new Error(`Error adding menu item: ${error.message}`);
    }
  }
}

export default MenuService;
