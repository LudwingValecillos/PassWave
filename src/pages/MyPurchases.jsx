import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from '../redux/actions/clientActions'; 
import CardForm from '../components/CardForm';

export default function PerfilUsuario() {
  const dispatch = useDispatch();
  const { client, status, error } = useSelector((state) => state.client);

  const [activeTab, setActiveTab] = useState("perfil");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    dispatch(loadClient());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4" onMouseMove={handleMouseMove}>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden border-black border-[1px]">
      <div className="relative pb-20 bg-gradient-to-r from-[#f2bb13] to-[#f28d35] text-white">


        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <img 
              src="https://d3n32ilufxuvd1.cloudfront.net/635fde9e3d2caa0029c91035/4190189/Image-0157de3b-2ef9-45c1-ba67-9bad1e1925fb.gif" 
              alt="Wave Center" 
              className="w-32 h-32 rounded-full border-4 border-grey-500 object-cover"
            />
          </div>
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold">{client.firstName} {client.lastName}</h2>
            <p className="text-xl text-gray-200">Member of Wave Center</p>
          </div>

          {/* Descripción de bienvenida */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold mb-2">So Glad You're Here! 🌟</h3>
            <p className="text-lg text-gray-100 max-w-xl mx-auto">
              Discover a place where culture, creativity, and community come together. At Wave Center, we invite you to enjoy music 🎵, art 🎨, captivating exhibitions, and unique events. Join our vibrant community and experience something new every time you visit. The center is yours!
            </p>
          </div>
        </div>

        <div className="pt-20 px-4">
          <div className="grid grid-cols-4 gap-4 text-center mb-8">
            <button className={`py-2 ${activeTab === "perfil" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("perfil")}>Perfil</button>
            <button className={`py-2 ${activeTab === "tickets" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("tickets")}>Tickets</button>
            <button className={`py-2 ${activeTab === "stands" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("stands")}>Stands</button>
            <button className={`py-2 ${activeTab === "tarjetas" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("tarjetas")}>Tarjetas</button>
          </div>

          {activeTab === "perfil" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email: {client.email}</span>
                <span className="border px-2 py-1 rounded-md">ID: {client.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Nombre: {client.firstName}</span>
                <span>Apellido: {client.lastName}</span>
              </div>
            </div>
          )}

          {activeTab === "tickets" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tus Tickets Reservados:</h3>
              {client.orderTickets.map((ticket) => (
                <div key={ticket.id} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold">{ticket.event}</h4>
                  <p>Fecha de compra: {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                  <p>Cantidad: {ticket.quantity}</p>
                  <span className="border px-2 py-1 rounded-md">{ticket.hashCode}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stands" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tus Stands Reservados:</h3>
              {client.rents.map((stand) => (
                <div key={stand.id} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold">{stand.name}</h4>
                  <p>{stand.description}</p>
                  <p>Posiciones: {stand.rentedPositions.join(', ')}</p>
                  <span className="border px-2 py-1 rounded-md">{stand.hashCode}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tarjetas" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tus Tarjetas:</h3>
              {client.cards.map((card) => (
                <div key={card.id} className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                  <div className="text-2xl text-blue-500">💳</div>
                  <div>
                    <p className="font-bold">{card.networkType} {card.type}</p>
                    <p>**** **** **** {card.number.slice(-4)}</p>
                    <p>Válida hasta: {card.thruDate}</p>
                    <p>{card.cardHolder}</p>
                  </div>
                </div>
              ))}
              <CardForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
