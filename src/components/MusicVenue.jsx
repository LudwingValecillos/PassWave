import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function MusicVenue({ onSelect, event}) {
  const [isSelected, setIsSelected] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const stageWidth = 400
  const stageHeight = 100
  const generalAdmissionWidth = 500
  const generalAdmissionHeight = 350

  const handleAreaClick = () => {
    setIsSelected(!isSelected)
    setShowModal(true)
    onSelect('General Admission')
  }

  const getAreaPrice = () => {
    return 50 // Precio fijo para la entrada general
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sala de Conciertos</h2>
      <svg viewBox="0 0 600 600" className="w-full h-auto">
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
        <rect
          x={(600 - stageWidth) / 2}
          y={50}
          width={stageWidth}
          height={stageHeight}
          fill="#e0e0e0"
          filter="url(#neumorphic-filter)"
          rx="8"
          ry="8"
        />
        <text
          x="300"
          y={50 + stageHeight / 2}
          className="text-lg font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Escenario
        </text>

        {/* Entrada General */}
        <motion.rect
          x={(600 - generalAdmissionWidth) / 2}
          y={180}
          width={generalAdmissionWidth}
          height={generalAdmissionHeight}
          fill={isSelected ? "#4a90e2" : "#e0e0e0"}
          filter={isSelected ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
          rx="8"
          ry="8"
          whileHover={{ filter: "url(#neumorphic-inset)" }}
          onClick={handleAreaClick}
        />
        <text
          x="300"
          y="355"
          className={`text-2xl font-bold ${isSelected ? "fill-white" : "fill-gray-600"}`}
          textAnchor="middle"
          dominantBaseline="middle"
          pointerEvents="none"
        >
          Entrada General
        </text>

        {/* Entrada y Salida */}
        <rect x="20" y="550" width="80" height="30" fill="#e0e0e0" filter="url(#neumorphic-filter)" rx="8" ry="8" />
        <text
          x="60"
          y="565"
          className="text-xs font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Entrada
        </text>

        <rect x="500" y="550" width="80" height="30" fill="#e0e0e0" filter="url(#neumorphic-filter)" rx="8" ry="8" />
        <text
          x="540"
          y="565"
          className="text-xs font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Salida
        </text>
      </svg>

      {/* Modal con información de la entrada general */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-gray-100 p-6 rounded-lg shadow-xl max-w-md w-full"
            style={{
              boxShadow:
                "-2px -2px 8px rgba(255, 255, 255, 1), -2px -2px 12px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.1), 4px 4px 4px rgba(0, 0, 0, 0.15), inset 6px 6px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Entrada General</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p>
              Has seleccionado: <strong>Entrada General</strong>
            </p>
            <p>
              Precio: <strong>${getAreaPrice()}</strong>
            </p>
            <p className="mt-2">
              La entrada general te da acceso a toda el área de conciertos. Disfruta del espectáculo desde cualquier lugar de la sala.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}