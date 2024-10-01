class Database {
    constructor() {
      this.orders = [];
      this.reservations = [];
      this.salesReports = [];
    }
  
    storeOrder(order) {
      this.orders.push(order);
      console.log('Order stored in the database:', order);
    }
  
    retrieveOrders() {
      return this.orders;
    }
  
    storeReservation(reservation) {
      this.reservations.push(reservation);
      console.log('Reservation stored in the database:', reservation);
    }
  
    retrieveReservations() {
      return this.reservations;
    }
  
    storeSalesReport(report) {
      this.salesReports.push(report);
      console.log('Sales report stored in the database:', report);
    }
  
    retrieveSalesReports() {
      return this.salesReports;
    }
  }
  
  export default Database;
  