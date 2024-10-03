import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserMenu from './UserMenu'; // Importamos el menú de usuario
import { useSelector } from "react-redux";

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } },
  pressed: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [showUserMenu, setShowUserMenu] = useState(false); // Estado para mostrar menú
  const status = useSelector((state) => state.client.status);


  const handleUserIconClick = () => {
    setShowUserMenu(!showUserMenu); // Alternar menú de usuario
  };

  return (
    <nav aria-label="Global" className="hidden md:block nav-container relative">
      <ul className="flex flex-wrap justify-center items-center font-bold gap-6 md:gap-8 lg:gap-12">
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <Link to="/crest" className="bg-[#04bf9d] text-white px-4 py-2 rounded-full shadow-lg transition">
              CREST
            </Link>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed">
          
            <Link to="/tide" className="bg-[#05c7f2] text-white px-4 py-2 rounded-full shadow-lg transition">
              TIDE
            </Link>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <Link to="/drift" className="bg-[#f2d22e] text-white px-4 py-2 rounded-full shadow-lg transition">
              DRIFT
            </Link>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <Link to="/allEvents" className="bg-[#f20505] text-white px-4 py-2 rounded-full shadow-lg transition">
              ALL-EVENTS
            </Link>
          </motion.div>
        </li>
        <li>
          {status === "success" ? (
            <div className="relative">
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="pressed"
              >
                <button onClick={handleUserIconClick}>
                  <img src="/src/assets/user.png" className="w-6" alt="User" />
                </button>
              </motion.div>
              {showUserMenu && <UserMenu />} {/* Mostramos el menú de usuario */}
            </div>
          ) : (
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="pressed"
            >
              <Link to="/login" className="text-blue-500 px-4 py-2 rounded-full shadow-lg transition bg-[#ffffff]">
                SIGN
              </Link>
            </motion.div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
