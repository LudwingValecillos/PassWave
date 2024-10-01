import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const CasetaSelector = () => {
    const smallCasetaWidth = 30;
    const smallCasetaHeight = 30;
    const largeCasetaWidth = smallCasetaWidth * 2;
    const largeCasetaHeight = smallCasetaHeight;
    const pasilloWidth = 15;

    const [selectedCasetas, setSelectedCasetas] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
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
                            fill={isSelected(index + 1) ? "#4a90e2" : "#e0e0e0"}
                            filter={isSelected(index + 1) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                            whileHover={{ filter: "url(#neumorphic-inset)" }}
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
                            fill={isSelected(index + 6) ? "#4a90e2" : "#e0e0e0"}
                            filter={isSelected(index + 6) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                            whileHover={{ filter: "url(#neumorphic-inset)" }}
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
                                fill={isSelected(10 + rowIndex * 5 + colIndex + 1) ? "#4a90e2" : "#e0e0e0"}
                                filter={isSelected(10 + rowIndex * 5 + colIndex + 1) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                                whileHover={{ filter: "url(#neumorphic-inset)" }}
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

                {/* Entrada y Salida */}
                <rect x="20" y="300" width="80" height="30" fill="#e0e0e0" filter="url(#neumorphic-filter)" rx="8" ry="8"></rect>
                <text x="60" y="315" className="text-xs font-bold fill-gray-600" textAnchor="middle" dominantBaseline="middle">Enter</text>

                <rect x="400" y="300" width="80" height="30" fill="#e0e0e0" filter="url(#neumorphic-filter)" rx="8" ry="8"></rect>
                <text x="440" y="315" className="text-xs font-bold fill-gray-600" textAnchor="middle" dominantBaseline="middle">Exit</text>
            </svg>

            {/* Modal con casetas seleccionadas */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-xl max-w-md w-full" style={{
                        boxShadow: '-2px -2px 8px rgba(255, 255, 255, 1), -2px -2px 12px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.1), 4px 4px 4px rgba(0, 0, 0, 0.15), inset 6px 6px 8px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Casetas Seleccionadas</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-gray-800">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <ul>
                            {selectedCasetas.map(casetaNumber => (
                                <li key={casetaNumber}>
                                    Caseta {casetaNumber} - ${getCasetaPrice(casetaNumber)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasetaSelector;
