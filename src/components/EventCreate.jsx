import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EventCreatorWithBanner = () => {
  const [formData, setFormData] = useState({
    date: '',
    style: '',
    room: '',
    images: [],
    description: '',
    hasStands: false,
    ticketPrice1: '',
    ticketPrice2: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      alert('Solo puedes subir hasta 5 imágenes');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado', formData);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-6">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-8 w-full lg:w-1/2 bg-white rounded-lg shadow p-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Crear Nuevo Evento</h1>

        <div className="space-y-4">
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
            Fecha del Evento
          </label>
          <input
            type="date"
            id="eventDate"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="eventStyle" className="block text-sm font-medium text-gray-700">
            Estilo de Evento
          </label>
          <input
            id="eventStyle"
            name="style"
            type="text"
            value={formData.style}
            onChange={handleInputChange}
            placeholder="Ej: Conferencia, Concierto, Exposición"
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="room" className="block text-sm font-medium text-gray-700">
            Sala
          </label>
          <select
            id="room"
            name="room"
            value={formData.room}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>
              Selecciona una sala
            </option>
            <option value="crest">Crest</option>
            <option value="tide">Tide</option>
            <option value="drift">Drift</option>
          </select>
        </div>

        <div className="space-y-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Imágenes del Evento (máximo 5)
          </label>
          <div className="flex items-center space-x-4">
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => document.getElementById('images').click()}
              className="flex items-center border rounded-md p-2 text-white bg-blue-500 hover:bg-blue-600"
            >
              Subir Imágenes
            </button>
            <span>{formData.images.length} / 5 imágenes subidas</span>
          </div>
        </div>

        <div className="space-y-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción del Evento
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe el evento..."
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasStands"
            name="hasStands"
            checked={formData.hasStands}
            onChange={handleInputChange}
            className="h-4 w-4"
          />
          <label htmlFor="hasStands" className="text-sm font-medium text-gray-700">
            ¿Tendrá stands para subvender?
          </label>
        </div>

        <div className="space-y-4">
          <label htmlFor="ticketPrice1" className="block text-sm font-medium text-gray-700">
            Precio de Ticket 1
          </label>
          <input
            id="ticketPrice1"
            name="ticketPrice1"
            type="number"
            min="0"
            step="0.01"
            value={formData.ticketPrice1}
            onChange={handleInputChange}
            placeholder="0.00"
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="ticketPrice2" className="block text-sm font-medium text-gray-700">
            Precio de Ticket 2
          </label>
          <input
            id="ticketPrice2"
            name="ticketPrice2"
            type="number"
            min="0"
            step="0.01"
            value={formData.ticketPrice2}
            onChange={handleInputChange}
            placeholder="0.00"
            className="border rounded-md p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md p-2"
        >
          Crear Evento
        </button>
      </motion.form>

      <motion.div
        className="w-full lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow p-6 text-white"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Vista Previa del Evento</h2>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {formData.date && (
            <motion.p
              className="text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Fecha: {formData.date}
            </motion.p>
          )}
          {formData.style && (
            <motion.p
              className="text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Estilo: {formData.style}
            </motion.p>
          )}
          {formData.room && (
            <motion.p
              className="text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Sala: {formData.room}
            </motion.p>
          )}
          {formData.description && (
            <motion.p
              className="text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Descripción: {formData.description}
            </motion.p>
          )}
          {formData.hasStands && (
            <motion.p
              className="text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              ¡Incluye stands para subvender!
            </motion.p>
          )}
          {(formData.ticketPrice1 || formData.ticketPrice2) && (
            <motion.div
              className="text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <p>Precios de Tickets:</p>
              {formData.ticketPrice1 && <p>Ticket 1: ${formData.ticketPrice1}</p>}
              {formData.ticketPrice2 && <p>Ticket 2: ${formData.ticketPrice2}</p>}
            </motion.div>
          )}
        </motion.div>
        {formData.images.length > 0 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <p className="text-xl mb-2">Imágenes del Evento:</p>
            <div className="flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="w-20 h-20 bg-white rounded-md overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Event image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EventCreatorWithBanner;