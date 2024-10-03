import React from 'react';
import ImageComponent from './ImageComponent';

const VintageCard = ({ title, imageUrl, buttonUrl, fontFamily = "'Rubik Bubbles', cursive", hoverText }) => {
  return (
    <a href="#" className="group relative block">
      {/* Imagen y título */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <h2
          className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-white z-20"
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
        />

        {/* Colocar ImageComponent como botón */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30">
          <ImageComponent buttonUrl={buttonUrl} />
        </div>
      </div>

      {/* Texto que aparece al hacer hover */}
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex items-end justify-center text-center z-30">
        <div className="translate-y-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-white text-2xl">{hoverText}</p>
        </div>
      </div>

      {/* Fondo negro semitransparente al hacer hover */}
      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50 z-10" />
    </a>
  );
};

export default VintageCard;
