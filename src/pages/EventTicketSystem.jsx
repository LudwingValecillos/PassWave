import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

// Componente para la pasarela de pago
const PaymentGateway = ({ onPaymentComplete, ticketPrice }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1); // Estado para la cantidad de entradas
  const [totalPrice, setTotalPrice] = useState(ticketPrice); // Estado para el total a pagar

  const handleQuantityChange = (quantity) => {
    setTicketQuantity(quantity);
    setTotalPrice(quantity * ticketPrice); // Actualizar total al cambiar cantidad
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos el procesamiento del pago
    setTimeout(() => {
      onPaymentComplete(ticketQuantity); // Pasar la cantidad de entradas al completar el pago
    }, 1500); // Simulamos un proceso de pago exitoso después de 1.5 segundos
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
    >
      <h2 className="text-4xl font-bold mb-8 text-center text-yellow-600">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo para la cantidad de entradas */}
        <div>
          <label htmlFor="ticketQuantity" className="block text-lg font-medium text-gray-700">Cantidad de Entradas</label>
          <input
            type="number"
            id="ticketQuantity"
            value={ticketQuantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            min="1" // Al menos 1 entrada
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
            required
          />
        </div>
        
        {/* Mostrar el total a pagar */}
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
  const handlePrint = () => {
    window.print();
  };

  return (
    <div ref={ticketRef} className="ticket-display p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.place.name}</p>
      <p><strong>Price:</strong> ${event.ticketPrice}</p>
      <p><strong>Tickets Available:</strong> {event.ticketsAvailable}</p>
      <p><strong>Quantity:</strong> {ticketQuantity}</p> {/* Mostrar cantidad de entradas */}
      <p><strong>Total:</strong> ${event.ticketPrice * ticketQuantity}</p> {/* Mostrar total calculado */}
      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
      >
        Print Ticket
      </button>
    </div>
  );
};

// Componente principal del sistema de tickets
const EventTicketSystem = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1); // Estado para la cantidad de entradas
  const { id } = useParams();
  const eventId = Number(id);
  const selectedEvent = useSelector((state) => state.events.selectedEvent || state.events.events.find((event) => event.id === eventId));
  const ticketRef = useRef();

  if (!selectedEvent) {
    return <div className="text-center text-2xl mt-10">No event selected</div>;
  }

  const handlePaymentComplete = (quantity) => {
    setPaymentComplete(true);
    setTicketQuantity(quantity); // Actualizar la cantidad de entradas al completar el pago
  };

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
    const imgY = 30;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('event-ticket.pdf');
  };

  return (
    <div>
      {!paymentComplete ? (
        <PaymentGateway onPaymentComplete={handlePaymentComplete} ticketPrice={selectedEvent.ticketPrice} />
      ) : (
        <TicketDisplay event={selectedEvent} ticketRef={ticketRef} ticketQuantity={ticketQuantity} />
      )}
      {paymentComplete && (
        <motion.button
          onClick={handleDownloadPDF}
          className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          <Download className="mr-2" /> Descargar Ticket
        </motion.button>
      )}
    </div>
  );
};

export default EventTicketSystem;

