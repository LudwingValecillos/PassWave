import React from 'react';

const VintageCard = ({ title, imageUrl, buttonText, backgroundColor, fontFamily = "'Rubik Bubbles', cursive", hoverText }) => {
  return (
    <a href="#" className="group relative block" style={{ backgroundColor }}>
      {/* Imagen y título */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <h2
          className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-white z-20" // Título más grande
          style={{
            fontFamily,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Sombra de texto
          }}
        >
          {title}
        </h2>
        <img
          src={imageUrl}
          alt="Vintage"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10" // Imagen detrás del título
          style={{ padding: '16px', boxSizing: 'border-box' }}
        />
        <button className="absolute bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded z-30"> {/* Aumento z-index para el botón */}
          {buttonText}
        </button>
      </div>

      {/* Texto que aparece al hacer hover */}
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex items-end justify-center text-center z-30"> {/* Aumenté z-index para que el hover text aparezca correctamente */}
        <div className="translate-y-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-white text-2xl">{hoverText}</p> {/* Aumenté el tamaño del texto de hover */}
        </div>
      </div>

      {/* Fondo negro semitransparente al hacer hover */}
      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50 z-10" />
    </a>
  );
};

export default VintageCard;
