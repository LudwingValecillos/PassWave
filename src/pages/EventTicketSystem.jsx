import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import qrCode from '../assets/qr.png';
import logoOk from '../assets/logoOk.png';
import download from '../assets/DOWNLOAD.PNG';


// Componente para la pasarela de pago
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
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
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
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
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
              className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
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
              className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
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
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
        >
          Pay Now
        </motion.button>
      </form>
    </motion.div>
  );
};

// Componente para mostrar el ticket
const TicketDisplay = ({ event, ticketRef, ticketQuantity }) => {
  const handleDownloadPDF = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = (pdfHeight - imgHeight * ratio) / 2;
    
    // Agregar imagen al PDF sin el botón de descarga
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('ticket.pdf');
  };

  return (
    <div
      ref={ticketRef}
      className="ticket-display p-8 bg-white border-4 border-yellow-400 rounded-lg shadow-lg relative max-w-4xl mx-auto"
    >
      <div className="relative p-4 sm:p-6 lg:p-8">
  <div className="flex items-center justify-center">
    <p className="text-3xl font-bold uppercase tracking-widest bg-[#000000be] text-white border-b-white border-b-8 border rounded-3xl mr-2">
      Wave Center
    </p>
    <img src={logoOk} alt="Icono" className="w-24 h-24" />


  </div>
</div>

      <h2 className="text-4xl font-bold text-center text-yellow-600">{event.name}</h2>
      <p className="mt-2 text-lg"><strong>Description:</strong> {event.description}</p>
      <p className="text-lg"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-lg"><strong>Location:</strong> {event.place.name}</p>
      <p className="text-lg"><strong>Price:</strong> ${event.ticketPrice}</p>
      <p className="text-lg"><strong>Quantity:</strong> {ticketQuantity}</p>
      <p className="text-lg"><strong>Total:</strong> ${event.ticketPrice * ticketQuantity}</p>
      
      {/* Espacio para el QR en la parte inferior derecha */}
      <div className="absolute right-8 bottom-8 w-32 h-32 bg-gray-300 rounded-md flex items-center justify-center shadow-lg style={{ display: 'inline-block', '@media print': { display: 'none' } }}">
        <img src={qrCode} alt="QR Code" />
      </div>

      
      <button 
  onClick={handleDownloadPDF} 
  className="justify-center items-center"
>
  <img 
    src={download}
    alt="Descargar Ticket" 
    className="h-24 w-24"
  />
</button>
    </div>
  );
};

// Componente principal del sistema de tickets
const EventTicketSystem = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const { id } = useParams();
  const eventId = Number(id);
  const selectedEvent = useSelector((state) => state.events.selectedEvent || state.events.events.find((event) => event.id === eventId));
  const ticketRef = useRef();

  const handlePaymentComplete = (quantity) => {
    setPaymentComplete(true);
    setTicketQuantity(quantity);
  };

  return (
    <div className="event-ticket-system p-8 bg-gray-100">
      <h1 
  className="text-6xl text-center text-yellow-600 mb-8 flex justify-center items-center" 
  style={{ fontFamily: "'Rubik Bubbles', cursive" }}>
  Get your tickets now!
  <img
    src="https://images-ext-1.discordapp.net/external/ZISg29RoNgQ_B-qxo-ZId9uT9IR5Q8fXaUPsdlqAacM/%3Fe%3Dwebp%26nll%3Dtrue/https/d2kq0urxkarztv.cloudfront.net/635fde9e3d2caa0029c91035/4190189/image-53a51ac6-5739-40e3-b809-b9cca16ef4dc.png?format=webp&quality=lossless"
    alt="Logo"
    className="h-24 w-24 ml-4"
  />
</h1>


      {!paymentComplete ? (
        <PaymentGateway onPaymentComplete={handlePaymentComplete} ticketPrice={selectedEvent.ticketPrice} />
      ) : (
        <TicketDisplay event={selectedEvent} ticketRef={ticketRef} ticketQuantity={ticketQuantity} />
      )}
    </div>
  );
};

export default EventTicketSystem;
