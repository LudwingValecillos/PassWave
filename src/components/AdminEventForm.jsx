import React, { useState } from 'react'
import { Calendar, MapPin, DollarSign, Users, Image, FileText, Layout, Ticket, Images } from 'lucide-react'

const AdminEventForm = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    ticketPrice: '',
    place: {
      name: '',
      ticketMaxCapacity: '',
      description: ''
    },
    images: [],
    hasStands: false,
    artists: [''],
    ticketsAvailable: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEvent(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePlaceChange = (e) => {
    const { value } = e.target
    setEvent(prev => ({
      ...prev,
      place: {
        ...prev.place,
        name: value // Almacena el nombre del lugar directamente
      }
    }))
  }

  const handleArtistChange = (index, value) => {
    const newArtists = [...event.artists]
    newArtists[index] = value
    setEvent(prev => ({
      ...prev,
      artists: newArtists
    }))
  }

  const removeArtist = (index) => {
    const newArtists = event.artists.filter((_, i) => i !== index)
    setEvent(prev => ({
      ...prev,
      artists: newArtists
    }))
  }

  const addArtist = () => {
    setEvent(prev => ({
      ...prev,
      artists: [...prev.artists, '']
    }))
  }
  const addUrlImage = () => {
    setEvent(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const removeUrlImage = (index) => {
    const newImages = event.images.filter((_, i) => i !== index)
    setEvent(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const handleImageChange = (index, value) => {
    const newImages = [...event.images]
    newImages[index] = value
    setEvent(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el evento al backend
    console.log(event)
  }

  return (
    <div className=" text-black ">
      <div className="w-1/2 bg-[#dfdfdf] rounded-lg overflow-hidden border-2 border-[#0D0D0D] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-[#0D0D0D] pb-4">Crear Nuevo Evento</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="text-[#0D0D0D]" />
              <input
                type="text"
                name="name"
                value={event.name}
                onChange={handleChange}
                placeholder="Nombre del Evento"
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                required
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <FileText className="text-[#0D0D0D] mt-2" />
              <textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                placeholder="Descripción del Evento"
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black h-32"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="text-[#0D0D0D]" />
              <input
                type="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <DollarSign className="text-[#0D0D0D]" />
              <input
                type="number"
                name="ticketPrice"
                value={event.ticketPrice}
                onChange={handleChange}
                placeholder="Precio del Ticket"
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Ticket className="text-[#0D0D0D]" />
              <input
                type="number"
                name="ticketsAvailable"
                value={event.ticketsAvailable}
                onChange={handleChange}
                placeholder="Tickets Disponibles"
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                required
              />
            </div>

            {/* Nombre del Lugar como radio buttons */}
            <div className="flex items-center space-x-2">
              <MapPin className="text-[#0D0D0D]" />
              <span className="mr-2">Nombre del Lugar:</span>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Crest"
                  checked={event.place.name === 'Crest'}
                  onChange={handlePlaceChange}
                  className="form-radio h-5 w-5 text-[#0D0D0D] focus:ring-2 focus:ring-[#0D0D0D]"
                />
                <span>Crest</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Tide"
                  checked={event.place.name === 'Tide'}
                  onChange={handlePlaceChange}
                  className="form-radio h-5 w-5 text-[#0D0D0D] focus:ring-2 focus:ring-[#0D0D0D]"
                />
                <span>Tide</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Drift"
                  checked={event.place.name === 'Drift'}
                  onChange={handlePlaceChange}
                  className="form-radio h-5 w-5 text-[#0D0D0D] focus:ring-2 focus:ring-[#0D0D0D]"
                />
                <span>Drift</span>
              </label>
            </div>

            

            {/* Checkbox para stands */}
            <div className="flex items-center space-x-2">
              <Layout className="text-[#0D0D0D]" />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={event.hasStands}
                  onChange={() => setEvent(prev => ({ ...prev, hasStands: !prev.hasStands })) }
                  className="form-checkbox h-5 w-5 text-[#0D0D0D] rounded focus:ring-2 focus:ring-[#0D0D0D]"
                />
                <span>¿Tiene Stands?</span>
              </label>
            </div>
            
            <div className="space-y-2">
              <label className="block font-medium">Artistas</label>
              {event.artists.map((artist, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Users className="text-[#0D0D0D]" />
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => handleArtistChange(index, e.target.value)}
                    placeholder={`Artista ${index + 1}`}
                    className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeArtist(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addArtist}
                className="mt-2 px-4 py-2 bg-[#F2BB13] rounded hover:bg-[#F28D35] focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]"
              >
                Añadir Artista
              </button>
            </div>
            
            <div className="space-y-2">
              <label className="block font-medium">Imagenes</label>
              {event.artists.map((artist, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Images className="text-[#0D0D0D]" />
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`Imagen ${index + 1}`}
                    className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeUrlImage(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addUrlImage}
                className="mt-2 px-4 py-2 bg-[#F2BB13] rounded hover:bg-[#F28D35] focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]"
              >
                Añadir Artista
              </button>
            </div>
            
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0D0D0D] text-[#F2F2F2] font-semibold rounded hover:bg-[#F28D35] focus:outline-none focus:ring-2 focus:ring-[#F28D35]"
            >
              Guardar Evento
            </button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default AdminEventForm
