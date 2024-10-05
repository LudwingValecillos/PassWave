import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// Animaciones para los botones
const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } },
  pressed: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }
};





// Componente para el menú hamburguesa del usuario
function UserMenu() {
  const { client, status, error } = useSelector((state) => state.client);
console.log(client);
  return (
    <div className="absolute top-12 right-0 w-48 bg-white rounded-lg p-4 border-black border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <ul className="space-y-2">
        <li>
          <Link to="/my-purchases" className="block px-4 py-2 hover:bg-gray-100">
            My Purchases
          </Link>
          
        </li>
   
        <li onClick={() => localStorage.clear()}><Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Logout</Link></li>
        <li><Link to="/favorite" className="block px-4 py-2 hover:bg-gray-100">Favorites</Link></li>
        {client.email.includes("admin") ? <li><Link to="/createEvent" className="block px-4 py-2 hover:bg-gray-100">Create Event</Link></li> : null}
      </ul>
    </div>
  );
}

export default UserMenu;
