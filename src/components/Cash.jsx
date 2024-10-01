class Cash {
  constructor(order, total) {
    this.order = order;
    this.total = total;
  }

  processPayment(cashAmount) {
    console.log('Processing cash payment with amount:', cashAmount);
    console.log('Order:', this.order);
    console.log('Total:', this.total);

    return true; 
  }
}

export default Cash;
