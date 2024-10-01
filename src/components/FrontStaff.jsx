import Person from './Person';

class FrontStaff extends Person {
  constructor(name, contactInfo) {
    super(name, contactInfo);
  }

  manageOrders() {
    console.log(`${this.name} manages orders.`);
  }

  manageReservations() {
    console.log(`${this.name} manages reservations.`);
  }
}

export default FrontStaff;

