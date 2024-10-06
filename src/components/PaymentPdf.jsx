'use client'

import React, { useRef } from 'react'
import { Calendar, MapPin, Hash, Printer } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function PaymentPdf({
  eventName,
  details,
  totalPrice,
  location,
  date,
  hash,
}) {
  const purchaseRef = useRef(null)

  const generatePDF = async () => {
    if (purchaseRef.current) {
      const canvas = await html2canvas(purchaseRef.current)
      const imgData = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = imgData
      link.download = 'purchase_details.png'
      link.click()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        ref={purchaseRef}
        className="w-full max-w-2xl bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-[#F2BB13] text-black py-2 rounded-full border-2 border-black">
          Purchase Details
        </h1>

        <div className="space-y-4">
          <div className="bg-[#F2BB13] rounded-lg p-4 border-2 border-black">
            <h2 className="text-xl font-bold mb-2">{eventName}</h2>
            <p className="text-sm">{details}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-black flex items-center">
              <Calendar className="h-6 w-6 mr-2 stroke-[2]" />
              <span className="font-bold">{date}</span>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-black flex items-center">
              <MapPin className="h-6 w-6 mr-2 stroke-[2]" />
              <span className="font-bold">{location}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-black flex items-center justify-between">
            <span className="font-bold text-lg">Total Price:</span>
            <span className="font-bold text-lg">${totalPrice}</span>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-black flex items-center">
            <Hash className="h-6 w-6 mr-2 stroke-[2]" />
            <span className="font-mono text-sm">{hash}</span>
          </div>
        </div>

        <button
          onClick={generatePDF}
          className="mt-6 w-full flex justify-center items-center bg-black text-white py-3 rounded-full duration-100 hover:bg-white hover:text-black hover:border-2 hover:border-black hover:shadow-2xl hover:font-bold"
        >
          <Printer className="h-5 w-5 mr-2" />
          
          Generate PDF
        </button>
      </div>
    </div>
  )
}