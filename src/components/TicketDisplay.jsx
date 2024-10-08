import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import qrCode from '../assets/qr.png';
import logoOk from '../assets/logoOk.png';

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

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('ticket.pdf');
  };

  return (
    <div ref={ticketRef} className="ticket-display p-8 bg-white border-4 border-black rounded-lg max-w-4xl mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-center">
        <p className="text-3xl font-bold p-3 uppercase tracking-widest bg-[#000000be] text-white border-b-white border-b-8 border rounded-3xl mr-2">
          Wave Company
        </p>
        <img src={logoOk} alt="Icono" className="w-24 h-24" />
      </div>

      <h2 className="text-4xl font-bold text-center text-yellow-600">{event.name}</h2>
      <p className="mt-2 text-lg"><strong>Description:</strong> {event.description}</p>
      <p className="text-lg"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-lg"><strong>Location:</strong> {event.place.name}</p>
      <p className="text-lg"><strong>Price:</strong> ${event.ticketPrice}</p>
      <p className="text-lg"><strong>Quantity:</strong> {ticketQuantity}</p>
      <p className="text-lg"><strong>Total:</strong> ${event.ticketPrice * ticketQuantity}</p>
      <div className='flex items-center justify-evenly'>
      <button onClick={handleDownloadPDF} className="justify-center items-center">
        <img src={"./public/DOWNLOAD.PNG"} alt="Descargar Ticket" className="h-24 w-24" />
      </button>
      <div className=" w-32 h-32 bg-gray-300 rounded-md flex items-center justify-center shadow-lg">
        <img src={qrCode} alt="QR Code" />
      </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
