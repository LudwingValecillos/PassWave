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
        style={{ width: '400px' }} // Estilo para el ticket
      >
        <h1 className="text-xl font-bold">Ticket de Evento</h1>
        <p><strong>Nombre del Evento:</strong> Concierto de Música</p>
        <p><strong>Fecha:</strong> 25 de diciembre de 2024</p>
        <p><strong>Hora:</strong> 18:00</p>
        <p><strong>Lugar:</strong> Auditorio Nacional</p>
        <p><strong>Precio:</strong> $50.00</p>
        <p>¡Gracias por tu compra!</p>
      </div>
      <button 
        onClick={handleDownloadPDF} 
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Descargar Ticket
      </button>
    </div>
  );
};

export default TicketPage;
