import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

// Menú Toggle para animar el ícono
const MenuToggle = ({ toggle }) => (
  <button onClick={toggle} className="focus:outline-none">
    <svg width="23" height="18" viewBox="0 0 23 18" className="cursor-pointer">
      <motion.path
        d="M 2 2.5 L 20 2.5"
        fill="transparent"
        strokeWidth="3"
        stroke="white"
        strokeLinecap="round"
        initial={{ d: "M 2 2.5 L 20 2.5" }}
        animate={{ d: "M 2 2.5 L 20 2.5" }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M 2 9.423 L 20 9.423"
        fill="transparent"
        strokeWidth="3"
        stroke="white"
        strokeLinecap="round"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M 2 16.346 L 20 16.346"
        fill="transparent"
        strokeWidth="3"
        stroke="white"
        strokeLinecap="round"
        initial={{ d: "M 2 16.346 L 20 16.346" }}
        animate={{ d: "M 2 16.346 L 20 16.346" }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  </button>
);

// Componente principal que renderiza el menú hamburguesa
export const MenuHamburguesa = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      <motion.nav
        className={`fixed top-0 right-0 bg-white h-full w-2/3 md:w-1/3 z-50 overflow-hidden transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
      >
        <ul className="flex flex-col items-center justify-center h-full space-y-6">
          <li className="text-lg"><Link to="/portfolio">Portfolio</Link></li>
          <li className="text-lg"><Link to="/about">About</Link></li>
          <li className="text-lg"><Link to="/contact">Contact</Link></li>
          <li className="text-lg"><Link to="/search">Search</Link></li>
        </ul>
      </motion.nav>
    </div>
  );
};