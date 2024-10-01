import Person from './Person';

class Customer extends Person {
  constructor(name, contactInfo) {
    super(name, contactInfo);
  }

  placeOrder(order) {
    console.log(`${this.name} placed an order:`, order);
  }

  makeReservation(reservation) {
    console.log(`${this.name} made a reservation:`, reservation);
  }
}

export default Customer;