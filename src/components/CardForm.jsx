import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Para las animaciones

const CardForm = () => {
  const [cardData, setCardData] = useState({
    cardHolder: '',
    cvv: '',
    number: '',
    thruDate: '',
    cardType: 'DEBIT',
    paymentNetwork: 'VISA'
  });

  const [savedCards, setSavedCards] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago
    console.log('Procesando pago con:', cardData);
  };

  const saveCard = () => {
    setSavedCards(prev => [...prev, cardData]);
  };

  // Función nativa para formatear la fecha
  const formatThruDate = (date) => {
    if (!date) return 'MM/YY';
    const [year, month] = date.split('-');
    return `${month}/${year.slice(2)}`; // Formatea como MM/YY
  };

  return (
    <div className="flex justify-between p-4 gap-8">
      <form onSubmit={handleSubmit} className="w-1/2">
        <motion.div 
          className="p-6 bg-white shadow-md rounded-lg" 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold mb-4">Ingrese los datos de su tarjeta</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">Nombre del titular</label>
              <input
                id="cardHolder"
                name="cardHolder"
                value={cardData.cardHolder}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
              <input
                id="number"
                name="number"
                value={cardData.number}
                onChange={handleInputChange}
                required
                maxLength={16}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="thruDate" className="block text-sm font-medium text-gray-700">Fecha de vencimiento</label>
                <input
                  id="thruDate"
                  name="thruDate"
                  type="date"
                  value={cardData.thruDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  id="cvv"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  required
                  maxLength={3}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="cardType" className="block text-sm font-medium text-gray-700">Tipo de tarjeta</label>
              <select
                name="cardType"
                value={cardData.cardType}
                onChange={handleSelectChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500"
              >
                <option value="DEBIT">Débito</option>
                <option value="CREDIT">Crédito</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymentNetwork" className="block text-sm font-medium text-gray-700">Red de pago</label>
              <select
                name="paymentNetwork"
                value={cardData.paymentNetwork}
                onChange={handleSelectChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500"
              >
                <option value="VISA">Visa</option>
                <option value="MASTERCARD">Mastercard</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600"
            >
              Procesar pago
            </button>
            <button
              type="button"
              onClick={saveCard}
              className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Guardar tarjeta
            </button>
          </div>
        </motion.div>
      </form>

      <div className="w-1/2">
        <motion.div 
          className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl mb-4">{cardData.paymentNetwork}</h2>
          <p className="text-xl mb-2">{cardData.number || '**** **** **** ****'}</p>
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Titular de la tarjeta</p>
              <p>{cardData.cardHolder || 'NOMBRE APELLIDO'}</p>
            </div>
            <div>
              <p className="text-sm">Válida hasta</p>
              <p>{formatThruDate(cardData.thruDate)}</p>
            </div>
          </div>
        </motion.div>

        {savedCards.length > 0 && (
          <motion.div 
            className="mt-4 p-6 bg-white shadow-md rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Tarjetas guardadas</h3>
            {savedCards.map((card, index) => (
              <div key={index} className="bg-gray-100 p-2 mb-2 rounded">
                {card.paymentNetwork} **** {card.number.slice(-4)}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CardForm;

