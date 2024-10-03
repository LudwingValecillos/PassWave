import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, CreditCard, Ticket, Store } from 'lucide-react'

export default function PerfilUsuario() {
  const [activeTab, setActiveTab] = useState("perfil")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove as any)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any)
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
    <div className="flex justify-center items-center min-h-screen bg-[#F2F2F2] p-4" onMouseMove={handleMouseMove}>
      <Card className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden border-black border-[1px]">
        <CardHeader className="relative pb-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Avatar del usuario" />
              <AvatarFallback>{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{userData.firstName} {userData.lastName}</CardTitle>
          <CardDescription className="text-xl text-gray-200">Miembro de Wave Center</CardDescription>
        </CardHeader>
        <CardContent className="pt-20">
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="perfil" onClick={() => setActiveTab("perfil")}>Perfil</TabsTrigger>
              <TabsTrigger value="tickets" onClick={() => setActiveTab("tickets")}>Tickets</TabsTrigger>
              <TabsTrigger value="stands" onClick={() => setActiveTab("stands")}>Stands</TabsTrigger>
              <TabsTrigger value="tarjetas" onClick={() => setActiveTab("tarjetas")}>Tarjetas</TabsTrigger>
            </TabsList>
            <TabsContent value="perfil" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="text-blue-500" />
                  <span>Email: {userData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">ID: {userData.id}</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tickets" className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tus Tickets Reservados:</h3>
              {userData.orderTickets.map((ticket) => (
                <div key={ticket.id} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold">{ticket.event}</h4>
                  <p>Fecha de compra: {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                  <p>Cantidad: {ticket.quantity}</p>
                  <Badge>{ticket.hashCode}</Badge>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="stands" className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tus Stands Reservados:</h3>
              {userData.rents.map((stand) => (
                <div key={stand.id} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold">{stand.name}</h4>
                  <p>{stand.description}</p>
                  <p>Posiciones: {stand.rentedPositions.join(', ')}</p>
                  <p>Fecha de renta: {new Date(stand.renDate).toLocaleDateString()}</p>
                  <Badge>{stand.hashCode}</Badge>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="tarjetas" className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tus Tarjetas:</h3>
              {userData.cards.map((card) => (
                <div key={card.id} className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                  <CreditCard className="text-blue-500" />
                  <div>
                    <p className="font-bold">{card.networkType} {card.type}</p>
                    <p>**** **** **** {card.number.slice(-4)}</p>
                    <p>Válida hasta: {card.thruDate}</p>
                    <p>{card.cardHolder}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 mt-6">
          <Button variant={activeTab === "tickets" ? "default" : "outline"} onClick={() => setActiveTab("tickets")}>
            <Ticket className="mr-2 h-4 w-4" /> Ver Tickets
          </Button>
          <Button variant={activeTab === "stands" ? "default" : "outline"} onClick={() => setActiveTab("stands")}>
            <Store className="mr-2 h-4 w-4" /> Ver Stands
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}