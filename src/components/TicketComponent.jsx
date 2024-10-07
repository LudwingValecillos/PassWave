// TicketPage.js
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


const TicketPage = () => {
  const ticketRef = useRef();

  const handleDownloadPDF = async () => {
    const element = ticketRef.current;

    // Captura el elemento y convierte a canvas
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    // Agrega la imagen al PDF
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('ticket.pdf');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        ref={ticketRef}
        className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg text-center"
        style={{ width: '400px' }} // Style for the ticket
      >
        <h1 className="text-xl font-bold">Event Ticket</h1>
        <p><strong>Event Name:</strong> Music Concert</p>
        <p><strong>Date:</strong> December 25, 2024</p>
        <p><strong>Time:</strong> 18:00</p>
        <p><strong>Location:</strong> National Auditorium</p>
        <p><strong>Price:</strong> $50.00</p>
        <p>Thank you for your purchase!</p>
      </div>
      <button 
        onClick={handleDownloadPDF} 
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download Ticket
      </button>
    </div>
  );
};  
    

export default TicketPage;
