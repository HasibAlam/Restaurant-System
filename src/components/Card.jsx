class Card {
  constructor(order, total) {
    this.order = order;
    this.total = total;
  }

  processPayment({ cardNumber, expiryDate, cvv }) {
    // Simulate payment processing
    console.log('Processing payment with card details:', { cardNumber, expiryDate, cvv });
    console.log('Order:', this.order);
    console.log('Total:', this.total);

    // Here, you would normally integrate with a payment gateway API
    // For now, we will simulate a successful payment
    return true;
  }
}

export default Card;
