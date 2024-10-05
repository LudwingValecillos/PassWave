"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  { 
    question: "What pavilions are available?", 
    answer: "We have three pavilions available: Crest, Tide, and Drift." 
  },
  { 
    question: "Do I need to be registered to buy tickets?", 
    answer: "Yes, to purchase tickets, you must be registered on our platform." 
  },
  { 
    question: "Can I rent a stand?", 
    answer: "Yes, stands are available for rent, and we offer two types of stands." 
  },
  { 
    question: "Is there a limit on stand rentals?", 
    answer: "You cannot rent more than three stands per event." 
  }
];

export default function FriendlyRobotChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")

  const handleFaqClick = (faq) => {
    setCurrentAnswer(faq.answer)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gradient-to-br from-gray-800 to-gray-100 rounded-lg shadow-lg w-80 mb-4 flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-bold text-xl">Friendly RoboHelper</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex flex-col items-center">
              <img 
                src="https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif" 
                alt="Friendly Robot" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4"
              />
              <div className="w-full bg-white rounded-lg p-4 shadow-md mb-4">
                <p className="text-gray-700 text-center">
                  {currentAnswer || "Hello! I'm your friendly RoboHelper. Click on a question below and I'll be happy to assist you!"}
                </p>
              </div>
              <div className="w-full space-y-2">
                {faqs.map((faq, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleFaqClick(faq)}
                    className="w-full text-left p-3 rounded-lg bg-white hover:bg-gray-50 shadow-sm transition-colors flex justify-between items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm text-gray-700">{faq.question}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </motion.button>
    </div>
  )
}