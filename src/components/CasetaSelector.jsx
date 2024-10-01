import React, { useState } from 'react';
import '../styles/reserva.css';
const CasetaSelector = () => {
    const smallCasetaWidth = 30;
    const smallCasetaHeight = 30;
    const largeCasetaWidth = smallCasetaWidth * 2;
    const largeCasetaHeight = smallCasetaHeight;

    const pasilloWidth = 15;
    const [hoveredCaseta, setHoveredCaseta] = useState(null);
    const [selectedCasetas, setSelectedCasetas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleMouseEnter = (casetaNumber) => {
        setHoveredCaseta(casetaNumber);
    };

    // const handleMouseLeave = () => {
    //     setHoveredCaseta(null);
    // };

    const handleCasetaClick = (casetaNumber) => {
        if (selectedCasetas.includes(casetaNumber)) {
            setSelectedCasetas(selectedCasetas.filter(caseta => caseta !== casetaNumber));
        } else if (selectedCasetas.length < 2) {
            setSelectedCasetas([...selectedCasetas, casetaNumber]);
            setShowModal(true);
        } else {
            alert("Solo puedes seleccionar un máximo de 2 casetas.");
        }
    };

    const isSelected = (casetaNumber) => selectedCasetas.includes(casetaNumber);

    const casetaPrices = {
        small: 100,
        large: 200,
    };

    const getCasetaPrice = (casetaNumber) => {
        return casetaNumber <= 10 ? casetaPrices.large : casetaPrices.small;
    };

    return (
        <div id="container">
            
            <svg viewBox="0 0 500 350" className="box">
                {/* Escenario */}
                <rect x="200" y="20" width="100" height="40" className="fill-red-600 shadow-md rounded-lg"></rect>
                <text x="250" y="45" className="text-xs font-bold fill-white" textAnchor="middle">Escenario</text>

           {/* Casetas Grandes - Izquierda */}
{[...Array(5)].map((_, index) => (
    // <g key={`big-left-${index}`}>
        <rect
            x={20}
            y={80 + index * (largeCasetaHeight + pasilloWidth)}
            width={largeCasetaWidth}
            height={largeCasetaHeight}
            className={`caseta ${hoveredCaseta === index + 1 ? 'hovered' : ''} ${isSelected(index + 1) ? 'selected' : ''}`}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            // onMouseLeave={handleMouseLeave}
            onClick={() => handleCasetaClick(index + 1)}
        />
      
    // </g>
))}

                {/* Casetas Grandes - Derecha */}
                {[...Array(5)].map((_, index) => (
                    <g key={`big-right-${index}`}>
                        <rect
                            x={500 - largeCasetaWidth - 20}
                            y={80 + index * (largeCasetaHeight + pasilloWidth)}
                            width={largeCasetaWidth}
                            height={largeCasetaHeight}
                            className={`caseta ${hoveredCaseta === index + 6 ? 'hovered' : ''} ${isSelected(index + 6) ? 'selected' : ''}`}
                            onMouseEnter={() => handleMouseEnter(index + 6)}
                            // onMouseLeave={handleMouseLeave}
                            onClick={() => handleCasetaClick(index + 6)}
                        />
                       
                    </g>
                ))}

                {/* Casetas Pequeñas en el Centro */}
                {[...Array(4)].map((_, rowIndex) => (
                    [...Array(5)].map((_, colIndex) => (
                        <g key={`small-${rowIndex}-${colIndex}`}>
                            <rect
                                x={150 + colIndex * (smallCasetaWidth + pasilloWidth)}
                                y={80 + rowIndex * (smallCasetaHeight + pasilloWidth)}
                                width={smallCasetaWidth}
                                height={smallCasetaHeight}
                                className={`caseta   ${hoveredCaseta === 10 + rowIndex * 5 + colIndex + 1 ? 'hovered' : ''} ${isSelected(10 + rowIndex * 5 + colIndex + 1) ? 'selected' : ''}`}
                               
                                onMouseEnter={() => handleMouseEnter(10 + rowIndex * 5 + colIndex + 1)}
                                // onMouseLeave={handleMouseLeave}
                                onClick={() => handleCasetaClick(10 + rowIndex * 5 + colIndex + 1)}
                            />
                            
                        </g>
                    ))
                ))}

                {/* Entrada y Salida */}
                <rect x="20" y="300" width="80" height="30" className="fill-green-500 stroke-green-600 stroke-2 shadow-lg rounded-lg"></rect>
                <text x="60" y="320" className="text-xs font-bold fill-white" textAnchor="middle">Entrada</text>

                <rect x="400" y="300" width="80" height="30" className="fill-green-500 stroke-green-600 stroke-2 shadow-lg rounded-lg"></rect>
                <text x="440" y="320" className="text-xs font-bold fill-white" textAnchor="middle">Salida</text>
            </svg>

            {/* Modal con casetas seleccionadas */}
            {showModal && (
                <div className="modal">
                    <h2 className="text-lg font-semibold mb-4">Casetas Seleccionadas</h2>
                    <ul>
                        {selectedCasetas.map((casetaNumber) => (
                            <li key={casetaNumber} className="mb-2">
                                Caseta {casetaNumber}: ${getCasetaPrice(casetaNumber)}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-4"
                        onClick={() => setShowModal(false)}
                    >
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
};

export default CasetaSelector;
