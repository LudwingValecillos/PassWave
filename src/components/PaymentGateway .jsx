import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentGateway = ({ onPaymentComplete, ticketPrice }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(ticketPrice);

  const handleQuantityChange = (quantity) => {
    setTicketQuantity(quantity);
    setTotalPrice(quantity * ticketPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      onPaymentComplete(ticketQuantity);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white p-8 border-4 border-black rounded-2xl shadow-lg"
    >
      <h2 className="text-4xl font-bold mb-8 text-center text-yellow-600">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="ticketQuantity" className="block text-lg font-medium text-gray-700">Total Tickets</label>
          <input
            type="number"
            id="ticketQuantity"
            value={ticketQuantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            min="1"
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm text-lg"
            required
          />
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-700">Total a Pagar: ${totalPrice.toFixed(2)}</p>
        </div>
        <div>
          <label htmlFor="cardNumber" className="block text-lg font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm text-lg"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-lg font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm text-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-lg font-medium text-gray-700">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm text-lg"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Cardholder Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm text-lg"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-yellow-600 hover:bg-yellow-700"
        >
          Pay Now
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PaymentGateway;
