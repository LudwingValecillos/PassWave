import React from 'react';
import PerfilUsuario from '../components/UserPerfil'; // Ajusta la ruta si es necesario

import Chatbot from '../components/chatBot';




export default function MyPurchases() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
     
        <PerfilUsuario />

        <Chatbot />


    </div>
  );
}
