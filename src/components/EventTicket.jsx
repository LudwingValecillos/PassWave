import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import qrCode from '../assets/qr.png';
import logoOk from '../assets/logoOk.png';
import download from '../assets/DOWNLOAD.PNG';

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
      <p className="text-3xl p-3 font-bold uppercase tracking-widest bg-[#000000be] text-white border-b-white border-b-8 border rounded-3xl mr-2">
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
const EventTicket = () => {
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
    window.scrollTo(0, 0);
  
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
  
  export default EventTicket;