import React, { useState, useEffect } from 'react';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Login from "./pages/Login";

import ReservaPage from "./pages/ReservaPage";
import Show from './pages/Show';
import Expositions from './pages/Expositions';
import Oratory from './pages/Oratory';
import Concerts from './pages/Concerts';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="Home" replace />} />
      <Route path="home" element={<Home />} />
      <Route path="concerts" element={<Concerts />} />
      <Route path="expositions" element={<Expositions />} />
      <Route path="oratory" element={<Oratory />} />

      <Route path="shows" element={<Show />} />


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
