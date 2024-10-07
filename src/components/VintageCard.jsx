import React from 'react';

const VintageCard = ({ title, imageUrl, buttonText, fontFamily = "'Rubik Bubbles', cursive", hoverText, applyHover = false }) => {

  return (
    <a href="#" className={`group relative block ${applyHover ? 'hover:opacity-100' : ''}`}>
      {/* Imagen y título */}
      <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden">
        <h2
          className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl md:text-9xl font-bold text-white z-20"
          style={{
            fontFamily,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          {title}
        </h2>
        <img
          src={imageUrl}
          alt="Vintage"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10"
          style={{ padding: '0', boxSizing: 'border-box' }}
        />
      </div>

      {/* Texto que aparece al hacer hover */}
      <div className={`absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8 flex items-end justify-center text-center z-30 transition-all ${applyHover ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} group-hover:translate-y-0 group-hover:opacity-100`}>
        <p className="text-white text-sm sm:text-lg md:text-2xl">{hoverText}</p>
      </div>

      {/* Fondo negro semitransparente al hacer hover */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 z-10 ${applyHover ? 'opacity-50' : 'opacity-0'} group-hover:opacity-50`} />
    </a>
  );
};

export default VintageCard;
