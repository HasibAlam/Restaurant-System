import Person from './Person';
import ManagerService from '../services/ManagerService';
import MenuService from '../services/MenuService';

class Manager extends Person {
  constructor(name, contactInfo, username, password) {
    super(name, contactInfo);
    this.username = username;
    this.password = password;
    this.authenticated = false;
    this.managerService = new ManagerService();
    this.menuService = new MenuService();
  }

  async authenticate(username, password) {
    try {
      const success = await this.managerService.authenticateManager(username, password);
      this.authenticated = success;
      console.log(`${this.name} authenticated.`);
    } catch (error) {
      console.error('Error during manager login:', error);
    }
  }

  async modifyMenuItem(itemId, updatedItem) {
    try {
      const result = await this.menuService.modifyMenuItem(itemId, updatedItem);
      console.log(`Item with ID ${itemId} modified successfully.`);
      return result;
    } catch (error) {
      console.error('Error modifying menu item:', error);
    }
  }

  async deleteMenuItem(itemId) {
    try {
      const result = await this.menuService.deleteMenuItem(itemId);
      console.log(`Item with ID ${itemId} deleted successfully.`);
      return result;
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  }

  async addMenuItem(newItem) {
    try {
      const result = await this.menuService.addMenuItem(newItem);
      console.log(`New item added successfully.`);
      return result;
    } catch (error) {
      console.error('Error adding new menu item:', error);
    }
  }
}

export default Manager;
