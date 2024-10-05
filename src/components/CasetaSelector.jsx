import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const CasetaSelector = ({ onCasetaSelect = () => {}, event }) => { // Cambiado a onCasetaSelect
    const smallCasetaWidth = 30;
    const smallCasetaHeight = 30;
    const largeCasetaWidth = smallCasetaWidth * 2;
    const largeCasetaHeight = smallCasetaHeight;
    const pasilloWidth = 15;

    const [selectedCasetas, setSelectedCasetas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const stands = [...event.stands[0].locations, ...event.stands[1].locations];

    const isSelectable = (casetaNumber) => stands.includes(casetaNumber);

    const handleCasetaClick = (casetaNumber) => {
        if (!isSelectable(casetaNumber)) return;

        if (selectedCasetas.includes(casetaNumber)) {
            const updatedCasetas = selectedCasetas.filter(caseta => caseta !== casetaNumber);
            setSelectedCasetas(updatedCasetas);
            onCasetaSelect(updatedCasetas); // Actualiza selección
            console.log(selectedCasetas);

        } else if (selectedCasetas.length < 3) {
            const newSelection = [...selectedCasetas, casetaNumber];
            setSelectedCasetas(newSelection);
            setShowModal(true);
            onCasetaSelect(newSelection); // Llama a onCasetaSelect con la nueva selección
        } else {
            alert("Solo puedes seleccionar un máximo de 3 casetas.");
        }
    };

    const isSelected = (casetaNumber) => selectedCasetas.includes(casetaNumber);

    const casetaPrices = {
        small: 5000,
        large: 10000,
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
                            fill={isSelected(index + 1) ? "#4a90e2" : (isSelectable(index + 1) ? "#e0e0e0" : "orange")}
                            filter={isSelected(index + 1) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                            whileHover={{ filter: isSelectable(index + 1) ? "url(#neumorphic-inset)" : undefined }}
                            style={{ cursor: isSelectable(index + 1) ? 'pointer' : 'not-allowed' }}
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
                            fill={isSelected(index + 6) ? "#4a90e2" : (isSelectable(index + 6) ? "#e0e0e0" : "orange")}
                            filter={isSelected(index + 6) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                            whileHover={{ filter: isSelectable(index + 6) ? "url(#neumorphic-inset)" : undefined }}
                            style={{ cursor: isSelectable(index + 6) ? 'pointer' : 'not-allowed' }}
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
                                fill={isSelected(10 + rowIndex * 5 + colIndex + 1) ? "#4a90e2" : (isSelectable(10 + rowIndex * 5 + colIndex + 1) ? "#e0e0e0" : "orange")}
                                filter={isSelected(10 + rowIndex * 5 + colIndex + 1) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                                whileHover={{ filter: isSelectable(10 + rowIndex * 5 + colIndex + 1) ? "url(#neumorphic-inset)" : undefined }}
                                style={{ cursor: isSelectable(10 + rowIndex * 5 + colIndex + 1) ? 'pointer' : 'not-allowed' }}
                                onClick={() => handleCasetaClick(10 + rowIndex * 5 + colIndex + 1)}
                            />
                            <text
                                x={150 + colIndex * (smallCasetaWidth + pasilloWidth) + smallCasetaWidth / 2}
                                y={80 + rowIndex * (smallCasetaHeight + pasilloWidth) + smallCasetaHeight / 2}
                                className={`text-md font-semibold ${isSelected(10 + rowIndex * 5 + colIndex + 1) ? "fill-white" : "fill-gray-600"}`}
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

            {/* Modal para Confirmación */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Confirmation</h3>
                        <p>Are you sure you want to select the following casetas?</p>
                        <ul>
                            {selectedCasetas.map(caseta => (
                                <li key={caseta}>Caseta {caseta} - ${getCasetaPrice(caseta)}</li>
                            ))}
                        </ul>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    // Aquí puedes agregar lógica para confirmar la selección
                                }}
                                className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedCasetas([]);
                                    onCasetaSelect([]); // Limpia la selección
                                }}
                                className="bg-gray-300 text-gray-800 rounded-md px-4 py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasetaSelector;
