import React, { useState, useEffect } from 'react';

const BackgroundWithArrows = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      <div
        className="absolute w-10 h-10 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('https://pixabay.com/es/vectors/flecha-negro-silueta-direcciones-39526/')",
          left: mousePosition.x - 20, // Ajusta según el tamaño de la flecha
          top: mousePosition.y - 20, // Ajusta según el tamaño de la flecha
          transform: 'translate(-50%, -50%)', // Centra la flecha
        }}
      />
      {/* Puedes agregar más flechas si deseas */}
    </div>
  );
};

export default BackgroundWithArrows;
