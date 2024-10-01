import React, { useState } from 'react';

const CasetaSelector = () => {
    const smallCasetaWidth = 30;  // Casetas pequeñas
    const smallCasetaHeight = 30;
    const largeCasetaWidth = smallCasetaWidth * 2;  // Casetas grandes
    const largeCasetaHeight = smallCasetaHeight;
    
    const pasilloWidth = 15; // Espacio entre pasillos

    // Estado para manejar el hover y la selección
    const [hoveredCaseta, setHoveredCaseta] = useState(null);
    const [selectedCasetas, setSelectedCasetas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Manejar hover
    const handleMouseEnter = (casetaNumber) => {
        setHoveredCaseta(casetaNumber);
    };

    const handleMouseLeave = () => {
        setHoveredCaseta(null);
    };

    // Manejar selección de casetas
    const handleCasetaClick = (casetaNumber) => {
        if (selectedCasetas.includes(casetaNumber)) {
            // Si la caseta ya está seleccionada, se deselecciona
            setSelectedCasetas(selectedCasetas.filter(caseta => caseta !== casetaNumber));
        } else if (selectedCasetas.length < 2) {
            // Si hay menos de 2 casetas seleccionadas, se selecciona una nueva
            setSelectedCasetas([...selectedCasetas, casetaNumber]);
            setShowModal(true);
        } else {
            alert("You can only select a maximum of 2 casetas.");
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
        <div className="flex justify-between items-center h-screen bg-gradient-to-r from-blue-200 to-blue-500">
            <svg viewBox="0 0 500 350" className="bg-white border-4 border-gray-500 shadow-xl rounded-lg">
                {/* Escenario */}
                <rect x="200" y="20" width="100" height="40" className="fill-red-600 shadow-lg"></rect>
                <text x="250" y="45" className="text-xs font-bold fill-white" textAnchor="middle">Stage</text>

                {/* Casetas Grandes */}
                {[...Array(5)].map((_, index) => (
                    <g key={`big-left-${index}`}>
                        <rect
                            x={20}
                            y={80 + index * (largeCasetaHeight + pasilloWidth)}
                            width={largeCasetaWidth}
                            height={largeCasetaHeight}
                            className={`fill-gray-300 stroke-gray-600 stroke-2 cursor-pointer transition duration-200 ease-in-out 
                                ${hoveredCaseta === index + 1 ? 'stroke-4' : 'stroke-2'}
                                ${isSelected(index + 1) ? 'fill-blue-400' : 'fill-gray-300'}
                                shadow-md`}
                            onMouseEnter={() => handleMouseEnter(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleCasetaClick(index + 1)}
                        />
                        {hoveredCaseta === index + 1 && (
                            <text
                                x={50}
                                y={100 + index * (largeCasetaHeight + pasilloWidth)}
                                className="fill-black text-sm font-semibold"
                            >
                                {index + 1}
                            </text>
                        )}
                    </g>
                ))}

                {[...Array(5)].map((_, index) => (
                    <g key={`big-right-${index}`}>
                        <rect
                            x={500 - largeCasetaWidth - 20}
                            y={80 + index * (largeCasetaHeight + pasilloWidth)}
                            width={largeCasetaWidth}
                            height={largeCasetaHeight}
                            className={`fill-gray-300 stroke-gray-600 stroke-2 cursor-pointer transition duration-200 ease-in-out 
                                ${hoveredCaseta === index + 6 ? 'stroke-4' : 'stroke-2'}
                                ${isSelected(index + 6) ? 'fill-blue-400' : 'fill-gray-300'}
                                shadow-md`}
                            onMouseEnter={() => handleMouseEnter(index + 6)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleCasetaClick(index + 6)}
                        />
                        {hoveredCaseta === index + 6 && (
                            <text
                                x={470}
                                y={100 + index * (largeCasetaHeight + pasilloWidth)}
                                className="fill-black text-sm font-semibold"
                            >
                                {index + 6}
                            </text>
                        )}
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
                                className={`fill-gray-300 stroke-gray-600 stroke-2 cursor-pointer transition duration-200 ease-in-out 
                                    ${hoveredCaseta === 10 + rowIndex * 5 + colIndex + 1 ? 'stroke-4' : 'stroke-2'}
                                    ${isSelected(10 + rowIndex * 5 + colIndex + 1) ? 'fill-blue-400' : 'fill-gray-300'}
                                    shadow-md`}
                                onMouseEnter={() => handleMouseEnter(10 + rowIndex * 5 + colIndex + 1)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleCasetaClick(10 + rowIndex * 5 + colIndex + 1)}
                            />
                            {hoveredCaseta === 10 + rowIndex * 5 + colIndex + 1 && (
                                <text
                                    x={165 + colIndex * (smallCasetaWidth + pasilloWidth)}
                                    y={100 + rowIndex * (smallCasetaHeight + pasilloWidth)}
                                    className="fill-black text-sm font-semibold"
                                >
                                    {10 + rowIndex * 5 + colIndex + 1}
                                </text>
                            )}
                        </g>
                    ))
                ))}

                {/* Entrada y Salida */}
                <rect x="20" y="300" width="80" height="30" className="fill-green-400 stroke-green-600 stroke-2 shadow-lg"></rect>
                <text x="60" y="320" className="text-xs font-bold fill-black" textAnchor="middle">Entrance</text>

                <rect x="400" y="300" width="80" height="30" className="fill-green-400 stroke-green-600 stroke-2 shadow-lg"></rect>
                <text x="440" y="320" className="text-xs font-bold fill-black" textAnchor="middle">Exit</text>
            </svg>

            {/* Modal con casetas seleccionadas */}
            {showModal && (
                <div className="fixed right-0 top-0 h-full w-64 bg-gray-200 shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Selected Casetas</h2>
                    <ul>
                        {selectedCasetas.map((casetaNumber) => (
                            <li key={casetaNumber} className="mb-2">
                                Caseta {casetaNumber}: ${getCasetaPrice(casetaNumber)}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default CasetaSelector;
