import Person from './Person';

class KitchenStaff extends Person {
  constructor(name, contactInfo) {
    super(name, contactInfo);
  }

  prepareFood() {
    console.log(`${this.name} prepares food orders.`);
  }
}

export default KitchenStaff;
