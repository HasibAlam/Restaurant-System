import React from 'react';
import { Bar } from 'react-chartjs-2';
import SalesReport from '../components/SalesReport';
import Footer from './Footer';
import background from '../assets/images/sales.png';
import 'chart.js/auto';

const SalesReportPage = () => (
  <SalesReport>
    {({ orderHistory, itemSales, loading, error, getChartData }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

      return (
        <div 
          className="min-h-screen flex flex-col"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex-grow flex flex-col justify-center items-center bg-white bg-opacity-75 p-4">
            <h1 className="text-2xl font-bold text-navy my-4 font-cursive">Sales Report</h1>
            <div style={{ width: '80%', margin: '0 auto' }}>
              <Bar data={getChartData()} />
            </div>
            <h2 className="text-2xl font-bold text-navy my-4 font-cursive">Order History</h2>
            <div className="flex flex-wrap justify-center">
              {Object.keys(itemSales).map((item) => (
                <div key={item} className="border border-gray-300 p-4 m-4 rounded text-black">
                  <p>{item}</p>
                  <p>Ordered: {itemSales[item]} times</p>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      );
    }}
  </SalesReport>
);

export default SalesReportPage;
