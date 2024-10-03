import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from '../redux/actions/clientActions';
import CardForm from './CardForm';
import Swal from 'sweetalert2';
import Aos from 'aos';

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
    Aos.init({ duration: 1000 });
    dispatch(loadClient());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center p-4"  onMouseMove={handleMouseMove}>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border-gray-200 border-2 transition-all duration-300 hover:shadow-3xl" data-aos="fade-up">
      <div className="relative pb-20 bg-gradient-to-r from-[#f2bb13] to-[#f28d35] text-white">
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <img 
              src="https://d3n32ilufxuvd1.cloudfront.net/635fde9e3d2caa0029c91035/4190189/Image-0157de3b-2ef9-45c1-ba67-9bad1e1925fb.gif" 
              alt="Wave Center" 
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text-center mt-8 p-6">
            <h2 className="text-4xl font-bold mb-2">{client.firstName} {client.lastName}</h2>
            <p className="text-xl text-gray-200">Member of Wave Center</p>
          </div>
          <div className="mt-6 text-center px-4">
            <h3 className="text-3xl font-semibold mb-4 text-yellow-300">So Glad You're Here! 🌟</h3>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
              Discover a place where culture, creativity, and community come together. At Wave Center, we invite you to enjoy music 🎵, art 🎨, captivating exhibitions, and unique events. Join our vibrant community and experience something new every time you visit. The center is yours!
            </p>
          </div>
        </div>

        <div className="pt-24 px-6 pb-6 w-full">
          <div className="flex justify-center space-x-4 mb-8">
            {["perfil", "tickets", "stands", "tarjetas"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-lg font-medium rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md" data-aos="fade-up">
            {activeTab === "perfil" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="text-xl font-semibold text-gray-800">
                    {client.firstName} {client.lastName}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    ID: {client.id}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{client.email}</span>
                </div>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Reserved Tickets</h3>
                {client.orderTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-xl font-semibold text-blue-600 mb-2">{ticket.event}</h4>
                    <p className="text-gray-600">Purchase Date: {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">Quantity: {ticket.quantity}</p>
                    <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {ticket.hashCode}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "stands" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Reserved Stands</h3>
                {client.rents.map((stand) => (
                  <div key={stand.id} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-xl font-semibold text-green-600 mb-2">{stand.name}</h4>
                    <p className="text-gray-600 mb-2">{stand.description}</p>
                    <p className="text-gray-600">Positions: {stand.rentedPositions.join(', ')}</p>
                    <span className="inline-block mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {stand.hashCode}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "tarjetas" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Cards</h3>
                {client.cards.map((card) => (
                  <div key={card.id} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center space-x-4">
                    <div className="text-4xl text-blue-500">💳</div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{card.networkType} {card.type}</p>
                      <p className="text-gray-600">**** **** **** {card.number.slice(-4)}</p>
                      <p className="text-gray-600">Valid until: {card.thruDate}</p>
                      <p className="text-gray-600">{card.cardHolder}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-8">
                  <CardForm />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}