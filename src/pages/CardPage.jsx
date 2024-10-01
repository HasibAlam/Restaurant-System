import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Footer from './Footer'; 
import cardbg from '../assets/images/cardbg.jpeg'; 

function CardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, total } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('credit');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);
  const handleCardTypeChange = (e) => setCardType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { default: Card } = await import('../components/Card');
    const cardPayment = new Card(order, total);
    const success = cardPayment.processPayment({ cardNumber, expiryDate, cvv });

    if (success) {
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Payment Complete');
        setTimeout(() => {
          navigate('/salesreceipt', { state: { order, total } });
        }, 2000);
      }, 2000); 
    }
  };

  if (!order || total === undefined) {
    navigate('/');
    return null;
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${cardbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto py-8 flex-grow text-center flex flex-col justify-center items-center">
        <div className="card-page bg-white bg-opacity-80 p-8 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4 text-black">Card Payment</h1>
          <form onSubmit={handleSubmit} className="text-left">
            <FormControl component="fieldset" className="mb-4">
              <FormLabel component="legend" className="text-black">Card Type</FormLabel>
              <RadioGroup row value={cardType} onChange={handleCardTypeChange}>
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label={<div className="flex items-center text-black"><CreditCardIcon className="mr-2" />Credit Card</div>}
                />
                <FormControlLabel
                  value="debit"
                  control={<Radio />}
                  label={<div className="flex items-center text-black"><AccountBalanceIcon className="mr-2" />Debit Card</div>}
                />
              </RadioGroup>
            </FormControl>
            <div className="mb-4">
              <TextField
                label="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                fullWidth
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Expiry Date"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                fullWidth
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="CVV"
                value={cvv}
                onChange={handleCvvChange}
                fullWidth
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              Pay ${total.toFixed(2)}
            </Button>
          </form>
          {loading && (
            <div className="mt-4 flex flex-col items-center">
              <CircularProgress />
              <p className="mt-2 text-black">Please stay with us, processing the payment...</p>
            </div>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500 font-bold">{successMessage}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CardPage;
