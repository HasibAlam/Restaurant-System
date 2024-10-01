class Payment {
  constructor(order, total) {
    this.order = order;
    this.total = total;
  }

  processTransaction(method) {
    const orderDetails = {
      order: this.order,
      total: this.total,
      method: method
    };
    console.log('Payment processed for order:', orderDetails);
  }
}

export default Payment;
