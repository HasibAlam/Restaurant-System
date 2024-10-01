import React, { Component } from 'react';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderHistory: [],
    };
  }

  componentDidMount() {
    this.fetchOrderHistory();
  }

  fetchOrderHistory = () => {
    fetch('https://swe30003-assignment3-express.vercel.app/orders')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ orderHistory: data });
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
      });
  };

  markAsCompleted = (orderId) => {
    fetch(`https://swe30003-assignment3-express.vercel.app/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'completed' }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          orderHistory: prevState.orderHistory.map((order) =>
            order.order_id === orderId ? { ...order, status: 'completed' } : order
          ),
        }));
      })
      .catch((error) => {
        console.error('Error marking order as completed:', error);
      });
  };

  render() {
    const { orderHistory } = this.state;
  
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-mistyrose">
        <h2 className="text-2xl font-bold text-navy my-4 font-cursive">Order History</h2>
        <div className="flex flex-wrap justify-center">
          {orderHistory.map((order) => (
            <div key={order.order_id} className="border border-gray-300 p-4 m-4 rounded text-black">
              <p>Order ID: {order.order_id}</p>
              <p>Status: {order.status}</p>
              {order.ordered_items === null ? (
                <p>No items ordered</p>
              ) : (
                <div>
                  <p>Ordered Items:</p>
                  {order.ordered_items.split(',').map((item, index) => (
                    <p key={index}>{item.trim()}</p>
                  ))}
                </div>
              )}
              {order.status !== 'completed' && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => this.markAsCompleted(order.order_id)}
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OrderHistory;
