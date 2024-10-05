import React, { useEffect } from 'react';
import PerfilUsuario from '../components/UserPerfil'; // Ajusta la ruta si es necesario

import Chatbot from '../components/chatBot';
import { use } from 'framer-motion/client';
import { useDispatch } from 'react-redux';
import { loadClient } from '../redux/actions/clientActions';




export default function MyPurchases() {
  const client = useSelector((state) => state.client.client);
  const dispatch = useDispatch();
  useEffect(() => {
    if (client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
  })
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
     
        <PerfilUsuario />

        <Chatbot />


    </div>
  );
}
