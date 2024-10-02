import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EventDetails() {
    const { id } = useParams();
    const eventId = Number(id); // Convertimos el id a número
    const event = useSelector((state) =>
        state.events.events.find((event) => event.id === eventId)
    );
    console.log(event.images[0]);
    

    
    return (
        <div>
        <img src="./public/bElectronica5.jpg" alt="PRUEBAAA" />
            <img src="./public/aInnovation1.jpg" alt="" />
            {event ? (
                <div>
                    <img src={event.images[0]} alt="ss" />
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                    {/* Aquí puedes agregar más detalles del evento */}
                </div>

            ) : (
                <p>No se encontró el evento</p>
            )}
        </div>
    );
}

export default EventDetails;
