import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animaciones para los botones
const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } },
  pressed: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

// Componente para el menú hamburguesa del usuario
function UserMenu() {
  return (
    <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/my-purchases" className="block px-4 py-2 hover:bg-gray-100">
            My Purchases
          </Link>
          <ul className="pl-4">
            <li><Link to="/tickets" className="block px-4 py-1 hover:bg-gray-100">Tickets</Link></li>
            <li><Link to="/stand" className="block px-4 py-1 hover:bg-gray-100">Stand</Link></li>
          </ul>
        </li>
        <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
        <li onClick={() => localStorage.clear()}><Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Logout</Link></li>
      </ul>
    </div>
  );
}

export default UserMenu;
