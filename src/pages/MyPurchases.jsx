import React, { useState, useEffect } from 'react'
import CardForm from '../components/CardForm';

export default function PerfilUsuario() {
  const [activeTab, setActiveTab] = useState("perfil")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const userData = {
    id: 1,
    firstName: "Ludwing",
    lastName: "Valecillos",
    email: "ludwingval@gmail.com",
    orderTickets: [
      {
        id: 1,
        purchaseDate: "2024-10-02T10:25:53.98645",
        quantity: 2,
        hashCode: "WAVE759715",
        event: "Beach Party VIP Admission",
        eventId: 16
      }
    ],
    rents: [
      {
        id: 1,
        name: "Stand 1",
        description: "Beach VIP Stand",
        hashCode: "WAVE871857",
        rentedPositions: [1, 2],
        renDate: "2024-10-02T10:25:54.183961"
      }
    ],
    cards: [
      {
        id: 1,
        cvv: 123,
        number: "1234-5678-9012-3456",
        thruDate: "2028-10-02",
        type: "DEBIT",
        networkType: "VISA",
        cardHolder: "Ludwing Valecillos"
      }
    ]
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4" onMouseMove={handleMouseMove}>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden border-black border-[1px]">
        <div className="relative pb-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 rounded-full border-4 border-white flex justify-center items-center text-2xl font-bold bg-gray-300">
              {userData.firstName[0]}{userData.lastName[0]}
            </div>
          </div>
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold">{userData.firstName} {userData.lastName}</h2>
            <p className="text-xl text-gray-200">Miembro de Wave Center</p>
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
                <span>Email: {userData.email}</span>
                <span className="border px-2 py-1 rounded-md">ID: {userData.id}</span>
              </div>
            </div>
          )}

          {activeTab === "tickets" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tus Tickets Reservados:</h3>
              {userData.orderTickets.map((ticket) => (
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
              {userData.rents.map((stand) => (
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
              {userData.cards.map((card) => (
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
              <CardForm/>
            </div>
          )}
        </div>
      </div>
    </div>
    
  )
}
