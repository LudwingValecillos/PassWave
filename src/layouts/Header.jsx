import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'; // Asegúrate de que esto esté importado
import Nav from "../components/Nav";

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } },
  pressed: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

const Header = () => {
  return (
    <header className=" w-full h-32 z-50 sticky top-0 ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-full p-10 ">
        <div className="flex h-full items-center justify-between p-8 border-black border-4 rounded-3xl bg-[#f5f5f5af] ">
          {/* Logo section */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to="/home" className="flex justify-center items-center gap-5">
              <img src="/src/assets/waveLogo.png" alt="Logo" className="h-24" />
              <div className="relative inline-block">
                <img
                  src="/src/assets/WaveCen.gif"
                  alt="WaveCenter Logo"
                  className="inline-block w-36 h-auto"
                />
              </div>
            </Link>
          </div>

          {/* Navigation and User Icon */}
          <div className="md:flex md:items-center md:gap-12">
            <Nav /> {/* Asumiendo que el componente Nav está definido */}
            <div className="flex items-center gap-4">
              <motion.a
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="pressed"
              >
           
              </motion.a>
            </div>

            {/* Botón para el menú hamburguesa en pantallas pequeñas */}
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;