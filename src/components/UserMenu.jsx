import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Asegúrate de que esta importación esté presente
import { useSelector } from "react-redux";

// Variantes de animación para el menú
const menuVariants = {
  hidden: { opacity: 0, y: -10 }, // Estado oculto
  visible: { opacity: 1, y: 0 }, // Estado visible
};

function UserMenu() {
  const { client, status, error } = useSelector((state) => state.client);

  return (
    <motion.div
      initial="hidden" // Inicia oculto
      animate="visible" // Cambia a visible al desplegar
      exit="hidden" // Vuelve a ocultar al cerrar
      variants={menuVariants}
      transition={{ duration: 0.3 }} // Duración de la animación
      className="absolute top-12 right-0 w-48 bg-white rounded-lg p-4 border-black border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      <ul className="space-y-2">
        <li>
          <Link to="/my-purchases" className="block px-4 py-2 hover:bg-gray-100">
            My Purchases
          </Link>
        </li>
        <li onClick={() => localStorage.clear()}>
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
        </li>
        <li>
          <Link to="/favorite" className="block px-4 py-2 hover:bg-gray-100">Favorites</Link>
        </li>
        {client.email.includes("admin") ? (
          <li>
            <Link to="/createEvent" className="block px-4 py-2 hover:bg-gray-100">Create Event</Link>
          </li>
        ) : null}
      </ul>
    </motion.div>
  );
}

export default UserMenu;
