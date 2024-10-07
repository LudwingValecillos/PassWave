import { useState } from "react";

const PaymentForm = ({ onPaymentComplete }) => {
    const [cardData, setCardData] = useState({
      cardHolder: '',
      cvv: '',
      number: '',
      thruDate: '',
      cardType: 'DEBIT',
      paymentNetwork: 'VISA'
    });
    const nextStep = () => {
      if (currentStep === 1 && selectedCasetas.length === 0) {
        alert("Debes seleccionar al menos una caseta para continuar");
        return; // Evita avanzar si no se seleccionaron casetas
      }
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };
  
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
      console.log('Procesando pago con:', cardData);
      onPaymentComplete(cardData);
    };
  
    const formatThruDate = (date) => {
      if (!date) return 'MM/YY';
      const [year, month] = date.split('-');
      return `${month}/${year.slice(2)}`;
    };
  
    return (
      <div className="flex flex-col md:flex-row justify-between p-4 gap-8">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
          <div>
            <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">Owner's name</label>
            <input
              id="cardHolder"
              name="cardHolder"
              value={cardData.cardHolder}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">Card number</label>
            <input
              id="number"
              name="number"
              value={cardData.number}
              onChange={handleInputChange}
              required
              maxLength={16}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="thruDate" className="block text-sm font-medium text-gray-700">Expiration date</label>
              <input
                id="thruDate"
                name="thruDate"
                type="date"
                value={cardData.thruDate}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="cardType" className="block text-sm font-medium text-gray-700">Type Card</label>
            <select
              id="cardType"
              name="cardType"
              value={cardData.cardType}
              onChange={handleSelectChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Crédit</option>
            </select>
          </div>
          <div>
            <label htmlFor="paymentNetwork" className="block text-sm font-medium text-gray-700">Payment network</label>
            <select
              id="paymentNetwork"
              name="paymentNetwork"
              value={cardData.paymentNetwork}
              onChange={handleSelectChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="VISA">Visa</option>
              <option value="MASTERCARD">Mastercard</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Process payment
          </button>
        </form>
  
        <div className="w-full md:w-1/2 mt-4">
          <motion.div 
            className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl mb-4">{cardData.paymentNetwork}</h2>
            <p className="text-xl mb-2">{cardData.number || '**** **** **** ****'}</p>
            <div className="flex justify-between">
              <div>
                <p className="text-sm">Cardholder</p>
                <p>{cardData.cardHolder || 'NOMBRE APELLIDO'}</p>
              </div>
              <div>
                <p className="text-sm">Valid until</p>
                <p>{formatThruDate(cardData.thruDate)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };