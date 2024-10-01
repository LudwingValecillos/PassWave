import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import ReservaPage from "./pages/ReservaPage";
import Crest from "./pages/Crest";
import Tide from "./pages/Tide";
import Drift from "./pages/Drift";
import AllEvents from "./pages/allEvents";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            <Route index element={<Navigate to="Home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="crest" element={<Crest />} />
            <Route path="tide" element={<Tide />} />
            <Route path="drift" element={<Drift />} />
            <Route path="allevents" element={<AllEvents />} />
            <Route path="/reserva" element={<ReservaPage />} />

          </Route>

          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
