import React from 'react';
import { motion } from 'framer-motion';

const VintageCard = ({ title, imageUrl, buttonText, backgroundColor, fontFamily = "'Rubik Bubbles', cursive" }) => {
  return (
    <div
      className="relative w-full h-[500px] overflow-hidden"
      style={{ backgroundColor }} // Aplicar el color de fondo
    >
      <img
        src={imageUrl}
        alt="Vintage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ padding: '16px', boxSizing: 'border-box' }} // Padding uniforme
      />

      {/* Título de la izquierda */}
      <motion.h2
        className="absolute bottom-12 left-0 w-full text-left text-2xl font-serif text-white z-10 px-4" // Asegura que ocupe el ancho total
        initial={{ x: '-100%' }} // Comienza fuera de la pantalla a la izquierda
        animate={{ x: ['-100%', '100%'] }} // Se mueve de izquierda a derecha
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }} // Movimiento continuo
        style={{ fontFamily }} // Aplicar la fuente
      >
        {title}
      </motion.h2>

      {/* Título de la derecha */}
      <motion.h2
        className="absolute bottom-4 right-0 w-full text-right text-2xl font-serif text-white z-10 px-4" // Asegura que ocupe el ancho total
        initial={{ x: '100%' }} // Comienza fuera de la pantalla a la derecha
        animate={{ x: ['100%', '-100%'] }} // Se mueve de derecha a izquierda
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }} // Movimiento continuo
        style={{ fontFamily }} // Aplicar la fuente
      >
        {title}
      </motion.h2>

      <button className="absolute bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded z-10">
        {buttonText}
      </button>
    </div>
  );
};

export default VintageCard;
