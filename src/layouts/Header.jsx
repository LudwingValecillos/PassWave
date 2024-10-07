import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import UserMenu from "../components/UserMenu"; 

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  pressed: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const status = useSelector((state) => state.client.status);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="w-full flex h-40 z-50 sticky top-0">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-full p-10">
        <div className="flex h-full items-center justify-between p-8 border-black border-4 rounded-3xl bg-[#f5f5f5e5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Logo y menú hamburguesa en pantallas pequeñas */}
          <div className="flex items-center justify-between w-full md:hidden">
            <Link to="/home" className="flex items-center">
              <img src="/src/assets/logoOk.png" alt="Logo" className="h-16" />
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMenu}
                className="rounded bg-gray-100 p-2 text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Icono de usuario o login */}
              {status === "success" ? (
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="pressed"
                >
                  <button
                    onClick={toggleUserMenu}
                    className="rounded bg-gray-100 p-2 text-gray-600 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {showUserMenu && <UserMenu />} {/* Mostrar menú de usuario */}
                </motion.div>
              ) : (
                <Link to="/login" className="ml-4">
                  <button className="rounded bg-gray-100 p-2 text-gray-600">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Navegación completa en pantallas grandes */}
          <div className="hidden md:flex md:items-center w-full justify-between">
            <Nav />
          </div>

          {/* Menú desplegable en pantallas pequeñas */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4">
              <ul className="flex flex-col items-center gap-4">
                <li>
                  <Link to="/crest" className="text-lg font-bold">
                    CREST
                  </Link>
                </li>
                <li>
                  <Link to="/tide" className="text-lg font-bold">
                    TIDE
                  </Link>
                </li>
                <li>
                  <Link to="/drift" className="text-lg font-bold">
                    DRIFT
                  </Link>
                </li>
                <li>
                  <Link to="/allEvents" className="text-lg font-bold">
                    EVENTS
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-lg font-bold">
                    ABOUT
                  </Link>
                </li>
                {status !== "success" && (
                  <li>
                    <Link to="/login" className="text-lg font-bold">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
