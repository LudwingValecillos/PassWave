import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReservaPage from "./pages/ReservaPage";
import Tide from './pages/Tide';
import Crest from './pages/Crest';
import Drift from './pages/Drift';
import AllEvents from "./pages/AllEvents";
import AboutView from "./pages/About";

import EventDetails from "./components/EventDetails";
import AdminEventForm from "./components/AdminEventForm";

import MyPurchases from './pages/MyPurchases';  

import EventTicketSystem from "./pages/EventTicketSystem";
import FavoriteEvents from "./components/FavoriteEvents";
import PaymentPdf from "./components/PaymentPdf";



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter ClassName="App">

    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="Home" replace />} />
      <Route path="home" element={<Home />} />
      <Route path="crest" element={<Crest />} />
      <Route path="tide" element={<Tide />} />
      <Route path="drift" element={<Drift/>} />
      <Route path="allevents" element={<AllEvents />} />

      {/* <Route path="event/:id" element={<EventDetails />} />
       */}
      <Route path="event/:id" element={<EventDetails />} />

      <Route path="/reserva/:id" element={<ReservaPage />} />
      <Route path="/my-purchases" element={<MyPurchases />} />

      <Route path="/createEvent" element={<AdminEventForm />} />

      <Route path="/event-ticket-system" element={<EventTicketSystem />} /> 

      <Route path="/about" element={<AboutView />} /> 


      <Route path="/favorite" element={<FavoriteEvents />} /> 
      <Route path="/paymentPdf" element={<PaymentPdf />} /> 



      </Route>
      <Route path="login" element={<Login />} />

      <Route path="/register" element={<Register />} />

    </Routes>

       
      </BrowserRouter>
    </>
  );
}

export default App;
