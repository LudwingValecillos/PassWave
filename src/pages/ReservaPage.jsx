import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CasetaSelector from "../components/CasetaSelector"
// import { format } from "date-fns"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, Tent, MapPin, User, CheckCircle, X } from "lucide-react"

const events = 
  [
    {
        "id": 1,
        "name": "The Creative Current",
        "description": "Immerse yourself in a creative fair that celebrates local talent. Artists from various disciplines will display their works, from stunning sculptures to vibrant digital illustrations.",
        "date": "2024-11-06",
        "ticketPrice": 1000.0,
        "place": {
            "id": 1,
            "name": "Wave Crest",
            "ticketMaxCapacity": 30,
            "standMaxCapacity": 30,
            "description": "Welcome to Wave Crest, the ideal venue for conventions and gatherings. With versatile space and modern amenities, this salon is designed to accommodate a variety of events, from business meetings to expos, fostering collaboration and innovation."
        },
        "images": [
            "./public/aCreative1.jpg",
            "./public/aCreative2.jpg",
            "./public/aCreative3.png",
            "./public/aCreative4.png",
            "./public/aCreative5.jpg"
        ],
        "stands": [
            {
                "id": 1,
                "locations": [
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20
                ],
                "size": "small",
                "price": 5000.0
            },
            {
                "id": 2,
                "locations": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                ],
                "size": "big",
                "price": 10000.0
            }
        ],
        "tickets": [
            {
                "id": 1,
                "eventName": "Expo Art 2024 - The Creative Current",
                "purchaseDate": "2024-11-06T15:00:00"
            }
        ],
        "artists": [
            "Sofía Martínez - Painter known for her vibrant abstract landscapes.",
            "Diego Ruiz - Sculptor who works with recycled materials, creating unique and sustainable works.",
            "Valeria Gómez - Digital illustrator who combines traditional and digital techniques to tell visual stories."
        ],
        "ticketsAvailable": 30
    },
    {
        "id": 2,
        "name": "Innovators' Haven",
        "description": "Explore a unique technology exhibition that fuses art, science and technology. At Innovators' Haven, you'll discover interactive projects, from augmented reality installations to innovations in sustainable design. Visitors will be able to experience first-hand how these disciplines intertwine, stimulating creativity and reflection on the future.",
        "date": "2024-11-07",
        "ticketPrice": 1000.0,
        "place": {
            "id": 1,
            "name": "Wave Crest",
            "ticketMaxCapacity": 30,
            "standMaxCapacity": 30,
            "description": "Welcome to Wave Crest, the ideal venue for conventions and gatherings. With versatile space and modern amenities, this salon is designed to accommodate a variety of events, from business meetings to expos, fostering collaboration and innovation."
        },
        "images": [
            "./public/aInnovation1.jpg",
            "./public/aInnovation2.jpg",
            "./public/aInnovation3.jpg",
            "./public/aInnovation4.jpg",
            "./public/aInnovation5.jpg"
        ],
        "stands": [
            {
                "id": 3,
                "locations": [
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20
                ],
                "size": "small",
                "price": 5000.0
            },
            {
                "id": 4,
                "locations": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                ],
                "size": "big",
                "price": 10000.0
            }
        ],
        "tickets": [
            {
                "id": 2,
                "eventName": "Tech Expo 2024 - Innovators' Haven",
                "purchaseDate": "2024-11-07T15:00:00"
            }
        ],
        "artists": [
            "LuzTech - Augmented reality installation that transforms urban spaces.",
            "EcoArt Collective - Sustainable design projects using recycled materials.",
            "Interactivity Lab - Interactive experiences that combine digital art and technology."
        ],
        "ticketsAvailable": 30
    },
    {
        "id": 3,
        "name": "Cultural Tides Market",
        "description": "Immerse yourself in a vibrant cultural market that celebrates local creativity. At Cultural Tides Market, you'll find a variety of products, from crafts and independent fashion to eco-friendly products. Additionally, you'll enjoy interactive photography and street art exhibits, where the community comes together to share and appreciate local talent.",
        "date": "2024-11-08",
        "ticketPrice": 1000.0,
        "place": {
            "id": 1,
            "name": "Wave Crest",
            "ticketMaxCapacity": 30,
            "standMaxCapacity": 30,
            "description": "Welcome to Wave Crest, the ideal venue for conventions and gatherings. With versatile space and modern amenities, this salon is designed to accommodate a variety of events, from business meetings to expos, fostering collaboration and innovation."
        },
        "images": [
            "./public/aTides1.jpg",
            "./public/aTides2.jpg",
            "./public/aTides3.jpg",
            "./public/aTides4.jpeg",
            "./public/aTides5.jpg"
        ],
        "stands": [
            {
                "id": 5,
                "locations": [
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20
                ],
                "size": "small",
                "price": 5000.0
            },
            {
                "id": 6,
                "locations": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                ],
                "size": "big",
                "price": 10000.0
            }
        ],
        "tickets": [
            {
                "id": 3,
                "eventName": "Cultural Tides Market 2024",
                "purchaseDate": "2024-11-08T15:00:00"
            }
        ],
        "artists": [
            "Ana Torres - Artisan specialized in decorative ceramics.",
            "Urban Art Collective - Artists presenting live murals and street art.",
            "EcoFashion Lab - Independent fashion designers using sustainable materials."
        ],
        "ticketsAvailable": 30
    },
    {
        "id": 4,
        "name": "Heroes' Summit",
        "description": "An exciting Comic-Con style event where fans of comics, movies and series come together to enjoy panels with creators, cosplay contests and exclusive geek culture products. In addition, there will be areas dedicated to gaming and virtual reality zones, offering an immersive experience for all attendees.",
        "date": "2024-11-09",
        "ticketPrice": 1000.0,
        "place": {
            "id": 1,
            "name": "Wave Crest",
            "ticketMaxCapacity": 30,
            "standMaxCapacity": 30,
            "description": "Welcome to Wave Crest, the ideal venue for conventions and gatherings. With versatile space and modern amenities, this salon is designed to accommodate a variety of events, from business meetings to expos, fostering collaboration and innovation."
        },
        "images": [
            "./public/aHeroes1.png",
            "./public/aHeroes2.jpg",
            "./public/aHeroes3.webp",
            "./public/aHeroes4.jpg",
            "./public/aHeroes5.jpg"
        ],
        "stands": [
            {
                "id": 7,
                "locations": [
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20
                ],
                "size": "small",
                "price": 5000.0
            },
            {
                "id": 8,
                "locations": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                ],
                "size": "big",
                "price": 10000.0
            }
        ],
        "tickets": [
            {
                "id": 4,
                "eventName": "Comic Convention 2024 - Heroes' Summit",
                "purchaseDate": "2024-11-09T15:00:00"
            }
        ],
        "artists": [
            "Javier Rodríguez - Comic book artist known for his work at Marvel.",
            "Clara Ramos - Voice actress famous for her roles in animated series.",
            "Team GamerPro - Content creators who will present their latest games and virtual reality technology."
        ],
        "ticketsAvailable": 30
    },
    {
        "id": 5,
        "name": "Coastal Culinary Fest",
        "description": "A gastronomic tour that celebrates delicious regional and local food. With chef stands offering traditional dishes, fresh seafood and delicious fusion cuisine, this event is a feast for the senses. Attendees will be able to sample products from local farms and participate in cooking workshops to learn new techniques.",
        "date": "2024-11-10",
        "ticketPrice": 1000.0,
        "place": {
            "id": 1,
            "name": "Wave Crest",
            "ticketMaxCapacity": 30,
            "standMaxCapacity": 30,
            "description": "Welcome to Wave Crest, the ideal venue for conventions and gatherings. With versatile space and modern amenities, this salon is designed to accommodate a variety of events, from business meetings to expos, fostering collaboration and innovation."
        },
        "images": [
            "./public/aComida1.jpg",
            "./public/aComida2.jpg",
            "./public/aComida3.jpg",
            "./public/aComida4.jpg",
            "./public/aComida5.jpg"
        ],
        "stands": [
            {
                "id": 9,
                "locations": [
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20
                ],
                "size": "small",
                "price": 5000.0
            },
            {
                "id": 10,
                "locations": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                ],
                "size": "big",
                "price": 10000.0
            }
        ],
        "tickets": [
            {
                "id": 5,
                "eventName": "Culinary Convention 2024 - Coastal Culinary Fest",
                "purchaseDate": "2024-11-10T15:00:00"
            }
        ],
        "artists": [
            "María López - Specialist in traditional coastal cuisine.",
            "Carlos Méndez - Chef recognized for his innovative fusion cuisine.",
            "Elena Torres - Expert in fresh and sustainable seafood."
        ],
        "ticketsAvailable": 30
    },]

// const CasetaSelector = ({ onSelect }) => {
//   // ... (CasetaSelector component remains unchanged)
// }

const   ReservaPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedFeria, setSelectedFeria] = useState(null)
  const [selectedCasetas, setSelectedCasetas] = useState([])
  const [date, setDate] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleFeriaSelection = (event) => {
    const feriaId = parseInt(event.target.value)
    setSelectedFeria(ferias.find(feria => feria.id === feriaId))
  }

  const handleCasetaSelection = (casetas) => {
    setSelectedCasetas(casetas)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { 
        ease: "easeInOut"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const renderStep = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {currentStep === 0 && (
            <div className="p-6">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{events[currentStep].name}</h2>
                <p className="text-gray-600 mb-4">{events[currentStep].description}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-4">
                <label htmlFor="feria-select" className="block text-sm font-medium text-gray-700">Select An Event</label>
                <select
                  id="feria-select"
                  onChange={handleFeriaSelection}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select An Event</option>
                  {ferias.map((feria) => (
                    <option key={feria.id} value={feria.id}>
                      {feria.name}
                    </option>
                  ))}
                </select>
                {selectedFeria && (
                  <motion.div 
                    variants={itemVariants} 
                    className="bg-gray-100 p-4 rounded-lg mt-4"
                  >
                    <h3 className="font-bold text-xl text-gray-800">{selectedFeria.name}</h3>
                    <p className="text-gray-600">{selectedFeria.date}</p>
                    <p className="text-gray-600">{selectedFeria.location}</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
          {currentStep === 1 && (
            <div className="p-6">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep].title}</h2>
                <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CasetaSelector onSelect={handleCasetaSelection} />
              </motion.div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="p-6">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep].title}</h2>
                <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
              </motion.div>
              <motion.form className="space-y-4" variants={itemVariants}>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="123 456 789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Llegada</label>
                  <input
                    type="date"
                    value={date ? format(date, "yyyy-MM-dd") : ""}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </motion.div>
              </motion.form>
            </div>
          )}
          {currentStep === 3 && (
            <div className="p-6">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep].title}</h2>
                <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
              </motion.div>
              <motion.div className="space-y-4" variants={itemVariants}>
                <motion.div className="bg-gray-100 p-4 rounded-lg" variants={itemVariants}>
                  <h3 className="font-bold text-xl text-gray-800">Detalles de la Feria</h3>
                  <p className="text-gray-700">Evento: {selectedFeria?.name}</p>
                  <p className="text-gray-700">Fecha: {selectedFeria?.date}</p>
                  <p className="text-gray-700">Ubicación: {selectedFeria?.location}</p>
                </motion.div>
                <motion.div className="bg-gray-100 p-4 rounded-lg" variants={itemVariants}>
                  <h3 className="font-bold text-xl text-gray-800">Casetas Reservadas</h3>
                  <ul>
                    {selectedCasetas.map((caseta) => (
                      <motion.li 
                        key={caseta} 
                        className="flex justify-between items-center text-gray-700"
                        variants={itemVariants}
                      >
                        <span>Caseta {caseta}</span>
                        <span className="font-bold">${caseta <= 10 ? 200 : 100}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="font-bold mt-2">Total: ${selectedCasetas.reduce((sum, caseta) => sum + (caseta <= 10 ? 200 : 100), 0)}</p>
                </motion.div>
                <motion.div className="bg-gray-100 p-4 rounded-lg" variants={itemVariants}>
                  <h3 className="font-bold text-xl text-gray-800">Información Personal</h3>
                  <p className="text-gray-700">Nombre: {formData.name}</p>
                  <p className="text-gray-700">Email: {formData.email}</p>
                  <p className="text-gray-700">Teléfono: {formData.phone}</p>
                  <p className="text-gray-700">Fecha de Llegada: {date ? format(date, "PPP") : "No seleccionada"}</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <button 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 py-2 px-4 rounded-md"
                    onClick={() => alert("¡Tu reserva ha sido confirmada!")}
                  >
                    Confirmar Reserva
                  </button>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
        Reserva tu Caseta
      </h1>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <ol className="flex items-center w-full">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`flex items-center w-full ${
                  index === currentStep ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <motion.span 
                  className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                    index === currentStep ? "bg-blue-100" : "bg-gray-200"
                  }`}
                  animate={{
                    scale: index === currentStep ? [1, 1.2, 1] : 1,
                    transition: { duration: 0.5, repeat: index === currentStep ? Infinity : 0, repeatType: "reverse" }
                  }}
                >
                  {React.createElement(step.icon, { className: `w-6 h-6 ${index === currentStep ? "text-blue-600" : "text-gray-500"}` })}
                </motion.span>
                <span className="hidden sm:inline-flex sm:ml-2">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className="flex-1 hidden sm:flex">
                    <motion.span 
                      className="h-0.5 w-full bg-gray-300"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: index < currentStep ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    ></motion.span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className={`bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 py-2 px-4 rounded-md ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeftIcon className="inline-block mr-2 h-4 w-4" /> Anterior
          </button>
          <button 
            onClick={nextStep} 
            disabled={currentStep === steps.length - 1 || (currentStep === 0 && !selectedFeria) || (currentStep === 1 && selectedCasetas.length === 0)}
            className={`bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 py-2 px-4 rounded-md ${(currentStep === steps.length - 1 || (currentStep === 0 && !selectedFeria) || (currentStep === 1 && selectedCasetas.length === 0)) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"} <ChevronRightIcon className="inline-block ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReservaPage