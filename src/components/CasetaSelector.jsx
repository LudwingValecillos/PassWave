import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const CasetaSelector = ({ onSelect, event }) => {
    const smallCasetaWidth = 30;
    const smallCasetaHeight = 30;
    const largeCasetaWidth = smallCasetaWidth * 2;
    const largeCasetaHeight = smallCasetaHeight;
    const pasilloWidth = 15;

    const [selectedCasetas, setSelectedCasetas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const stands = [...event.stands[0].locations, ...event.stands[1].locations];
    console.log(stands);

    // Función para verificar si una caseta es seleccionable
    const isSelectable = (casetaNumber) => stands.includes(casetaNumber);

    const handleCasetaClick = (casetaNumber) => {
        if (!isSelectable(casetaNumber)) return; // No hace nada si no es seleccionable

        if (selectedCasetas.includes(casetaNumber)) {
            const updatedCasetas = selectedCasetas.filter(caseta => caseta !== casetaNumber);
            setSelectedCasetas(updatedCasetas);
            onSelect(updatedCasetas); // Actualiza selección
        } else if (selectedCasetas.length < 3) {
            const newSelection = [...selectedCasetas, casetaNumber];
            setSelectedCasetas(newSelection);
            setShowModal(true);
            onSelect(newSelection); // Llama a onSelect con la nueva selección
        } else {
            alert("Solo puedes seleccionar un máximo de 3 casetas.");
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
        <div className="relative w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Select Your Area</h2>
            <svg viewBox="0 0 500 350" className="w-full h-auto">
                <defs>
                    <filter id="neumorphic-filter">
                        <feDropShadow dx="-2" dy="-2" stdDeviation="3" floodColor="#ffffff" floodOpacity="1" />
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#a0a0a0" floodOpacity="0.3" />
                    </filter>
                    <filter id="neumorphic-inset">
                        <feDropShadow dx="-2" dy="-2" stdDeviation="3" floodColor="#a0a0a0" floodOpacity="0.3" />
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#ffffff" floodOpacity="1" />
                    </filter>
                    <filter id="selected-glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Escenario */}
                <rect x="200" y="20" width="100" height="40" fill="#e0e0e0" filter="url(#neumorphic-filter)" rx="8" ry="8"></rect>
                <text x="250" y="45" className="text-xs font-bold fill-gray-600" textAnchor="middle" dominantBaseline="middle">Stage</text>

                {/* Casetas Grandes - Izquierda */}
                {[...Array(5)].map((_, index) => (
                    <g key={`big-left-${index}`}>
                        <motion.rect
                            x={20}
                            y={80 + index * (largeCasetaHeight + pasilloWidth)}
                            width={largeCasetaWidth}
                            height={largeCasetaHeight}
                            rx="8"
                            ry="8"
                            fill={isSelected(index + 1) ? "#4a90e2" : (isSelectable(index + 1) ? "#e0e0e0" : "orange")} // Naranja si no es seleccionable
                            filter={isSelected(index + 1) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                            whileHover={{ filter: isSelectable(index + 1) ? "url(#neumorphic-inset)" : undefined }}
                            style={{ cursor: isSelectable(index + 1) ? 'pointer' : 'not-allowed' }} // Cursor basado en disponibilidad
                            onClick={() => handleCasetaClick(index + 1)}
                        />
                        <text
                            x={20 + largeCasetaWidth / 2}
                            y={80 + index * (largeCasetaHeight + pasilloWidth) + largeCasetaHeight / 2}
                            className={`text-lg font-semibold ${isSelected(index + 1) ? "fill-white" : "fill-gray-600"}`}
                            textAnchor="middle"
                            dominantBaseline="central"
                            pointerEvents="none"
                        >
                            {index + 1}
                        </text>
                    </g>
                ))}

                {/* Casetas Grandes - Derecha */}
                {[...Array(5)].map((_, index) => (
                    <g key={`big-right-${index}`}>
                        <motion.rect
                            x={500 - largeCasetaWidth - 20}
                            y={80 + index * (largeCasetaHeight + pasilloWidth)}
                            width={largeCasetaWidth}
                            height={largeCasetaHeight}
                            rx="8"
                            ry="8"
                            fill={isSelected(index + 6) ? "#4a90e2" : (isSelectable(index + 6) ? "#e0e0e0" : "orange")} // Naranja si no es seleccionable
                            filter={isSelected(index + 6) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                            whileHover={{ filter: isSelectable(index + 6) ? "url(#neumorphic-inset)" : undefined }}
                            style={{ cursor: isSelectable(index + 6) ? 'pointer' : 'not-allowed' }} // Cursor basado en disponibilidad
                            onClick={() => handleCasetaClick(index + 6)}
                        />
                        <text
                            x={500 - largeCasetaWidth / 2 - 20}
                            y={80 + index * (largeCasetaHeight + pasilloWidth) + largeCasetaHeight / 2}
                            className={`text-lg font-semibold ${isSelected(index + 6) ? "fill-white" : "fill-gray-600"}`}
                            textAnchor="middle"
                            dominantBaseline="central"
                            pointerEvents="none"
                        >
                            {index + 6}
                        </text>
                    </g>
                ))}

                {/* Casetas Pequeñas en el Centro */}
                {[...Array(4)].map((_, rowIndex) => (
                    [...Array(5)].map((_, colIndex) => (
                        <g key={`small-${rowIndex}-${colIndex}`}>
                            <motion.rect
                                x={150 + colIndex * (smallCasetaWidth + pasilloWidth)}
                                y={80 + rowIndex * (smallCasetaHeight + pasilloWidth)}
                                width={smallCasetaWidth}
                                height={smallCasetaHeight}
                                rx="4"
                                ry="4"
                                fill={isSelected(10 + rowIndex * 5 + colIndex + 1) ? "#4a90e2" : (isSelectable(10 + rowIndex * 5 + colIndex + 1) ? "#e0e0e0" : "orange")} // Naranja si no es seleccionable
                                filter={isSelected(10 + rowIndex * 5 + colIndex + 1) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                                whileHover={{ filter: isSelectable(10 + rowIndex * 5 + colIndex + 1) ? "url(#neumorphic-inset)" : undefined }}
                                style={{ cursor: isSelectable(10 + rowIndex * 5 + colIndex + 1) ? 'pointer' : 'not-allowed' }} // Cursor basado en disponibilidad
                                onClick={() => handleCasetaClick(10 + rowIndex * 5 + colIndex + 1)}
                            />
                            <text
                                x={150 + colIndex * (smallCasetaWidth + pasilloWidth) + smallCasetaWidth / 2}
                                y={80 + rowIndex * (smallCasetaHeight + pasilloWidth) + smallCasetaHeight / 2}
                                className={`text-xs font-semibold ${isSelected(10 + rowIndex * 5 + colIndex + 1) ? "fill-white" : "fill-gray-600"}`}
                                textAnchor="middle"
                                dominantBaseline="central"
                                pointerEvents="none"
                            >
                                {10 + rowIndex * 5 + colIndex + 1}
                            </text>
                        </g>
                    ))
                ))}
            </svg>

            {/* Modal para selección */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Casetas seleccionadas:</h3>
                        <ul>
                            {selectedCasetas.map(caseta => (
                                <li key={caseta} className="text-gray-700">{`Caseta ${caseta} - Precio: $${getCasetaPrice(caseta)}`}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            <X className="inline-block" /> Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasetaSelector;
