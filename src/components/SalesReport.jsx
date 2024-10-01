// SalesReport.jsx
import React, { Component } from 'react';

class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderHistory: [],
      itemSales: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchOrderHistory();
  }

  fetchOrderHistory = () => {
    fetch('https://swe30003-assignment3-express.vercel.app/orders')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ orderHistory: data }, this.calculateItemSales);
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
        this.setState({ error, loading: false });
      });
  };

  calculateItemSales = () => {
    const { orderHistory } = this.state;
    const itemSales = orderHistory.reduce((acc, order) => {
      if (order.ordered_items) {
        order.ordered_items.split(',').forEach((item) => {
          const trimmedItem = item.trim();
          acc[trimmedItem] = (acc[trimmedItem] || 0) + 1;
        });
      }
      return acc;
    }, {});

    this.setState({ itemSales, loading: false });
  };

  getChartData = () => {
    const { itemSales } = this.state;
    const labels = Object.keys(itemSales);
    const data = Object.values(itemSales);

    return {
      labels,
      datasets: [
        {
          label: 'Number of Times Ordered',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  };

  render() {
    const { children } = this.props;
    const { orderHistory, itemSales, loading, error } = this.state;

    return children({
      orderHistory,
      itemSales,
      loading,
      error,
      getChartData: this.getChartData,
    });
  }
}

export default SalesReport;
