import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TicketDisplay from "../components/TicketDisplay";
import PaymentGateway from "../components/PaymentGateway ";

const EventTicketSystem = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const { id } = useParams();
  const eventId = Number(id);
  const selectedEvent = useSelector(
    (state) =>
      state.events.selectedEvent ||
      state.events.events.find((event) => event.id === eventId)
  );
  const ticketRef = useRef();

  const handlePaymentComplete = (quantity) => {
    setPaymentComplete(true);
    setTicketQuantity(quantity);
  };

  window.scrollTo(0, 0);

  return (
    <div className="event-ticket-system p-8 bg-gray-100">
      <h1 className="text-6xl text-center text-yellow-600 font-extrabold mb-10">
        {paymentComplete ? "Your receipt" : "Purchase Ticket"}
      </h1>

      {paymentComplete ? (
        <TicketDisplay
          event={selectedEvent}
          ticketRef={ticketRef}
          ticketQuantity={ticketQuantity}
        />
      ) : (
        <PaymentGateway
          onPaymentComplete={handlePaymentComplete}
          ticketPrice={selectedEvent.ticketPrice}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventTicketSystem;
