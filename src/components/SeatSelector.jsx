import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function SeatSelector({ onSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [showModal, setShowModal] = useState(false)

  const seatSize = 25
  const stageWidth = 300
  const stageHeight = 80
  const stageSeatGap = 80 // Increased gap between stage and seats

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber)
      setSelectedSeats(updatedSeats)
      onSelect(updatedSeats)
    } else if (selectedSeats.length < 5) {
      const newSelection = [...selectedSeats, seatNumber]
      setSelectedSeats(newSelection)
      setShowModal(true)
      onSelect(newSelection)
    } else {
      alert("Puedes seleccionar un máximo de 5 asientos.")
    }
  }

  const isSelected = (seatNumber) => selectedSeats.includes(seatNumber)

  const getSeatPrice = (row) => {
    return row === 1 ? 200 : row === 2 ? 150 : 100
  }

  const rows = [
    { seats: 10, yOffset: 180 + stageSeatGap },
    { seats: 12, yOffset: 230 + stageSeatGap },
    { seats: 14, yOffset: 280 + stageSeatGap },
    { seats: 16, yOffset: 330 + stageSeatGap },
  ]

  const getSeatPosition = (rowIndex, seatIndex, totalInRow) => {
    const rowWidth = totalInRow * (seatSize + 5)
    const startX = (500 - rowWidth) / 2
    const x = startX + seatIndex * (seatSize + 5) + seatSize / 2
    const y = rows[rowIndex].yOffset
    
    // Aplicar curvatura hacia el escenario
    const curvature = 50 // Ajusta este valor para cambiar la curvatura
    const midIndex = (totalInRow - 1) / 2
    const offset = Math.abs(seatIndex - midIndex)
    const yAdjustment = -((offset * offset) / (midIndex * midIndex) * curvature)
    
    return { x, y: y + yAdjustment }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Selecciona tus Asientos</h2>
      <svg viewBox="0 0 500 500" className="w-full h-auto">
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
          x={(500 - stageWidth) / 2}
          y={50}
          width={stageWidth}
          height={stageHeight}
          fill="#e0e0e0"
          filter="url(#neumorphic-filter)"
          rx="8"
          ry="8"
        />
        <text
          x="250"
          y={50 + stageHeight / 2}
          className="text-lg font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Escenario
        </text>

        {/* Asientos */}
        {rows.map((row, rowIndex) => (
          <g key={`row-${rowIndex}`}>
            {[...Array(row.seats)].map((_, seatIndex) => {
              const seatNumber = rows.slice(0, rowIndex).reduce((acc, r) => acc + r.seats, 0) + seatIndex + 1
              const { x, y } = getSeatPosition(rowIndex, seatIndex, row.seats)
              return (
                <g key={`seat-${seatNumber}`}>
                  <motion.rect
                    x={x - seatSize / 2}
                    y={y - seatSize / 2}
                    width={seatSize}
                    height={seatSize}
                    rx={4}
                    ry={4}
                    fill={isSelected(seatNumber) ? "#4a90e2" : "#e0e0e0"}
                    filter={isSelected(seatNumber) ? "url(#selected-glow)" : "url(#neumorphic-filter)"}
                    whileHover={{ filter: "url(#neumorphic-inset)" }}
                    onClick={() => handleSeatClick(seatNumber)}
                  />
                  <text
                    x={x}
                    y={y}
                    className={`text-xs font-semibold ${isSelected(seatNumber) ? "fill-white" : "fill-gray-600"}`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    pointerEvents="none"
                  >
                    {seatNumber}
                  </text>
                </g>
              )
            })}
          </g>
        ))}

        {/* Entrada y Salida */}
        <rect x="20" y="450" width="80" height="30" fill="#e0e0e0" filter="url(#neumorphic-filter)" rx="8" ry="8" />
        <text
          x="60"
          y="465"
          className="text-xs font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Entrada
        </text>

        <rect x="400" y="450" width="80" height="30" fill="#e0e0e0" filter="url(#neumorphic-filter)" rx="8" ry="8" />
        <text
          x="440"
          y="465"
          className="text-xs font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Salida
        </text>
      </svg>

      {/* Modal con asientos seleccionados */}
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
              <h3 className="text-xl font-bold text-gray-800">Asientos Seleccionados</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <ul>
              {selectedSeats.map((seatNumber) => {
                const row = rows.findIndex((r, i) => 
                  seatNumber <= rows.slice(0, i + 1).reduce((acc, r) => acc + r.seats, 0)
                ) + 1
                return (
                  <li key={seatNumber}>
                    Asiento {seatNumber} (Fila {row}) - ${getSeatPrice(row)}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}