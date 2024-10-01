class Person {
  constructor(name, contactInfo) {
    this.name = name;
    this.contactInfo = contactInfo;
    this.authenticated = false;
  }

  async login(username, password, accountType) {
    accountType = accountType.toLowerCase();
    if (accountType === 'manager') {
      return this.managerLogin(username, password);
    } else if (accountType === 'customer') {
      return this.customerLogin(username, password);
    } else if (accountType === 'frontstaff') {
      return this.frontStaffLogin(username, password);
    } else if (accountType === 'kitchenstaff') {
      return this.kitchenStaffLogin(username, password);
    } else {
      throw new Error('Invalid account type');
    }
  }
  

  async managerLogin(username, password) {
    if (this.manager) {
      await this.manager.authenticate(username, password);
      this.authenticated = this.manager.authenticated;
    } else {
      console.error('Manager instance not provided.');
    }
}

  async customerLogin(username, password) {
    throw new Error('customerLogin method must be implemented in subclass');
  }

  async frontStaffLogin(username, password) {
    throw new Error('frontStaffLogin method must be implemented in subclass');
  }

  async kitchenStaffLogin(username, password) {
    throw new Error('kitchenStaffLogin method must be implemented in subclass');
  }
}
export default Person;
