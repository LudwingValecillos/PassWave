// src/views/ReservaPage.jsx
import React from "react";
import CasetaSelector from "../components/CasetaSelector"; // Importar el componente CasetaSelector

const ReservaPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Reserva de Casetas</h1>
      <CasetaSelector />
    </div>
  );
};

export default ReservaPage;
