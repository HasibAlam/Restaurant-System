import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SalesReceiptPage from './pages/SalesReceiptPage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import FrontStaffPage from './pages/FrontStaffPage';
import ManagerPage from './pages/ManagerPage';
import KitchenStaffPage from './pages/KitchenStaffPage';
import PaymentPage from './pages/PaymentPage';
import CashPage from './pages/CashPage';
import CardPage from './pages/CardPage';
import OrderPage from './pages/OrderPage';
import Login from './pages/Login';
import Managerhome from './pages/Managerhome';
import ManagerReservation from './pages/managereservation';
import SalesReportPage from './pages/SalesReportPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orderhistory" element={<OrderHistoryPage />} />
            <Route path="/salesreceipt" element={<SalesReceiptPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/frontstaff" element={<FrontStaffPage />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/kitchenstaff" element={<KitchenStaffPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/cash" element={<CashPage />} />
            <Route path="/card" element={<CardPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/managerhome" element={<Managerhome />} />
            <Route path="/managereservation" element={<ManagerReservation />} />
            <Route path="/salesreport" element={<SalesReportPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
