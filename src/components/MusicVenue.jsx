import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import LabelInput from "./LabelInput";

export default function MusicVenue({ onSelect, event, quantityNumber }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const stageWidth = 400;
  const stageHeight = 100;
  const generalAdmissionWidth = 500;
  const generalAdmissionHeight = 350;

  const handleAreaClick = () => {
    setIsSelected(!isSelected);
    setShowModal(true);
    const price = quantityNumber * getAreaPrice();
    onSelect(price);
  };

  const getAreaPrice = () => {
    return event.ticketPrice; // Fixed price for general admission
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Concert Hall
      </h2>
      <svg viewBox="0 0 600 600" className="w-full h-auto">
        <defs>
          <filter id="neumorphic-filter">
            <feDropShadow
              dx="-2"
              dy="-2"
              stdDeviation="3"
              floodColor="#ffffff"
              floodOpacity="1"
            />
            <feDropShadow
              dx="2"
              dy="2"
              stdDeviation="3"
              floodColor="#a0a0a0"
              floodOpacity="0.3"
            />
          </filter>
          <filter id="neumorphic-inset">
            <feDropShadow
              dx="-2"
              dy="-2"
              stdDeviation="3"
              floodColor="#a0a0a0"
              floodOpacity="0.3"
            />
            <feDropShadow
              dx="2"
              dy="2"
              stdDeviation="3"
              floodColor="#ffffff"
              floodOpacity="1"
            />
          </filter>
          <filter id="selected-glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stage */}
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
          Stage
        </text>

        {/* General Admission */}
        <motion.rect
          x={(600 - generalAdmissionWidth) / 2}
          y={180}
          width={generalAdmissionWidth}
          height={generalAdmissionHeight}
          fill={isSelected ? "#4a90e2" : "#e0e0e0"}
          filter={
            isSelected ? "url(#selected-glow)" : "url(#neumorphic-filter)"
          }
          rx="8"
          ry="8"
          whileHover={{ filter: "url(#neumorphic-inset)" }}
          onClick={handleAreaClick}
        />
        <text
          x="300"
          y="355"
          className={`text-2xl font-bold ${
            isSelected ? "fill-white" : "fill-gray-600"
          }`}
          textAnchor="middle"
          dominantBaseline="middle"
          pointerEvents="none"
        >
          General Admission
        </text>

        {/* Entrance and Exit */}
        <rect
          x="20"
          y="550"
          width="80"
          height="30"
          fill="#e0e0e0"
          filter="url(#neumorphic-filter)"
          rx="8"
          ry="8"
        />
        <text
          x="60"
          y="565"
          className="md:text-xs font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Entrance
        </text>

        <rect
          x="500"
          y="550"
          width="80"
          height="30"
          fill="#e0e0e0"
          filter="url(#neumorphic-filter)"
          rx="8"
          ry="8"
        />
        <text
          x="540"
          y="565"
          className="md:text-xs font-bold fill-gray-600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Exit
        </text>
      </svg>

      {/* Modal with general admission info */}
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
              <h3 className="text-xl font-bold text-gray-800">
                General Admission
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p>
              You have selected: <strong>General Admission</strong>
            </p>
            <p>
              Price: <strong>${getAreaPrice()}</strong>
            </p>
            <p className="mt-2">
              General admission gives you access to the entire concert area.
              Enjoy the show from anywhere in the venue.
            </p>
          </div>
        </div>
      )}
      
    </div>
  );
}
