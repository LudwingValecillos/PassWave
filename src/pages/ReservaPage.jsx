import React, { useState } from "react";
import Aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CasetaSelector from "../components/CasetaSelector";
import MusicVenue from "../components/MusicVenue";
import SeatSelector from "../components/SeatSelector";
import { loadEvents } from "../redux/actions/eventsAction";
import LabelInput from "../components/LabelInput";
import { loadClient } from "../redux/actions/clientActions";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Tent,
  MapPin,
  CreditCard,
  CheckCircle,
  X,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const steps = [
  {
    title: "Choose your Fair",
    description: "Select the event you want to attend",
    icon: Tent,
  },
  {
    title: "Reserve your Booth",
    description: "Choose the perfect booth for you",
    icon: MapPin,
  },
  {
    title: "Make Payment",
    description: "Enter your card details",
    icon: CreditCard,
  },
  {
    title: "Confirmation",
    description: "Review and confirm your reservation",
    icon: CheckCircle,
  },
];

// const events = useSelector((state) => state.events.events || []);
// const dispatch = useDispatch();
// console.log(events);

// useEffect(() => {
//   Aos.init({ duration: 500 });
// }, []);

// useEffect(() => {
//   if (!events.length || events[0].name === '') {
//     dispatch(loadEvents());
//   }
// }, [dispatch, events]);

const PaymentForm = ({ onPaymentComplete }) => {
  const client = useSelector((state) => state.client.client);
  const dispatch = useDispatch();
  useEffect(() => {
    if (client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
  }, [dispatch]);

  const [cardData, setCardData] = useState({
    cardHolder: "",
    cvv: "",
    number: "",
    thruDate: "",
    cardType: "DEBIT",
    paymentNetwork: "VISA",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const validateCardData = (data) => {
    const errors = [];
    if (!data.cardHolder) errors.push("Please enter the name of the holder.");
    if (!/^\d{16}$/.test(data.number)) errors.push("Invalid card number.");
    if (!data.thruDate || new Date(data.thruDate) <= new Date())
      errors.push("Invalid expiration date.");
    if (!/^\d{3}$/.test(data.cvv)) errors.push("Invalid CVV.");
    if (!data.cardType) errors.push("Select the type of card.");
    if (!data.paymentNetwork) errors.push("Select payment network.");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateCardData(cardData);
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    onPaymentComplete(cardData);
  };

  const formatThruDate = (date) => {
    if (!date) return "MM/YY";
    const [year, month] = date.split("-");
    return `${month}/${year.slice(2)}`;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 gap-8">
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
        <div>
          <label
            htmlFor="cardHolder"
            className="block text-sm font-medium text-gray-700"
          >
            Name of the holder
          </label>
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
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700"
          >
            Card number
          </label>
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
            <label
              htmlFor="thruDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration date
            </label>
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
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700"
            >
              CVV
            </label>
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
          <label
            htmlFor="cardType"
            className="block text-sm font-medium text-gray-700"
          >
            Card type
          </label>
          <select
            id="cardType"
            name="cardType"
            value={cardData.cardType}
            onChange={handleSelectChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="DEBIT">Debit</option>
            <option value="CREDIT">Credit</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="paymentNetwork"
            className="block text-sm font-medium text-gray-700"
          >
            Payment network
          </label>
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
          <p className="text-xl mb-2">
            {cardData.number || "**** **** **** ****"}
          </p>
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Cardholder</p>
              <p>{cardData.cardHolder || "NOMBRE APELLIDO"}</p>
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

const ReservaPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFeria, setSelectedFeria] = useState(null);
  const [selectedCasetas, setSelectedCasetas] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [date, setDate] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    if (!events.length || events[0].name === "") {
      dispatch(loadEvents());
    }
  }, [dispatch, events]);
  window.scrollTo(0, 0);

  const { id } = useParams();
  const eventId = Number(id);
  const event = useSelector((state) =>
    state.events.events.find((event) => event.id === eventId)
  );

  const handleFeriaSelection = (e) => {
    const feriaId = parseInt(e.target.value);
    setSelectedFeria(events.find((feria) => feria.id === feriaId));
  };

  const handleCasetaSelection = (casetas) => {
    setSelectedCasetas(casetas);
  };
  const handleSeatSelection = (selectedSeats) => {
    setSelectedSeats(selectedSeats);
  };

  const handleVenueSelection = (selectedVenue) => {
    setSelectedFeria(selectedVenue);
  };

  const handlePaymentComplete = (cardData) => {
    setPaymentData(cardData);
    nextStep();
  };

  const nextStep = () => {
    if (currentStep === 0 && !selectedFeria) {
      alert("Please select a fair.");
      return;
    }

    if (
      currentStep === 2 &&
      (!paymentData ||
        !paymentData.cardHolder ||
        !paymentData.number ||
        !paymentData.thruDate ||
        !paymentData.cvv ||
        !paymentData.cardType ||
        !paymentData.paymentNetwork)
    ) {
      alert("Please complete all fields on the card before continuing.");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const [nameStand, setName] = useState("");
  const [descriptionStand, setDescriptionStand] = useState("");
  const [quantityTicket, setQuantityTicket] = useState("");
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
          <div className="p-6 border-b">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </motion.div>
          </div>
          <div className="p-6">
            {currentStep === 0 && (
              <motion.div variants={itemVariants} className="space-y-4">
                <label
                  htmlFor="feria-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select a Fair
                </label>
                <select
                  id="feria-select"
                  onChange={handleFeriaSelection}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Choose your fair</option>
                  {event ? (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ) : (
                    events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))
                  )}
                </select>
                {selectedFeria && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-gray-100 p-4 rounded-lg mt-4"
                  >
                    <h3 className="font-bold text-xl text-gray-800">
                      {selectedFeria.name}
                    </h3>
                    <p className="text-gray-600">{selectedFeria.date}</p>
                    <p className="text-gray-600">{selectedFeria.location}</p>
                  </motion.div>
                )}
              </motion.div>
            )}
            {/* Here we use ternary to decide which component to render */}
            {currentStep === 1 &&
              (event.place.id == 1 ? (
                <div className="flex flex-col space-y-4">
                  <CasetaSelector
                    event={event}
                    onCasetaSelect={handleCasetaSelection}
                  />
                  <div className="bg-gray-100 p-4 rounded-lg flex flex-col shadow-xl gap-2">
                    <p className="text-center text-2xl font-bold pb-2 ">
                      Stand details
                    </p>
                    <LabelInput
                      title={"Name del evento"}
                      onChange={(e) => setName(e.target.value)}
                    ></LabelInput>
                    <LabelInput
                      title={"Description"}
                      onChange={(e) => setDescriptionStand(e.target.value)}
                    ></LabelInput>
                  </div>
                </div>
              ) : event.place.id == 2 ? (
                <div className="flex flex-col justify-center items-center space-y-4">
                  <MusicVenue
                    event={event}
                    onSelect={handleVenueSelection}
                    quantityNumber={quantityTicket}
                  />

                  <div className="bg-gray-100 p-4 rounded-lg flex flex-col shadow-xl gap-2 mt-2 w-96 justify-center">
                    <p className="text-center text-2xl font-bold pb-2">
                      {" "}
                      Please indicate the number of tickets to purchase
                    </p>
                    <LabelInput
                      title={"Quantity"}
                      onChange={(e) => setQuantityTicket(e.target.value)}
                      type="Number"
                    ></LabelInput>
                  </div>
                </div>
              ) : (
                <SeatSelector event={event} onSelect={handleSeatSelection} />
              ))}

            {currentStep === 2 && (
              <motion.div variants={itemVariants}>
                <PaymentForm onPaymentComplete={handlePaymentComplete} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <motion.div
                  className="bg-gray-100 p-4 rounded-lg"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-xl text-gray-800">
                    Fair Details
                  </h3>
                  <p className="text-gray-700">Event: {selectedFeria?.name}</p>
                  <p className="text-gray-700">Date: {selectedFeria?.date}</p>
                  <p className="text-gray-700">
                    Location: {selectedFeria?.location}
                  </p>
                </motion.div>
                <motion.div
                  className="bg-gray-100 p-4 rounded-lg"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-xl text-gray-800">
                    Reserved Booths
                  </h3>
                  <ul>
                    {selectedCasetas.map((caseta) => (
                      <motion.li
                        key={caseta}
                        className="flex justify-between items-center text-gray-700"
                        variants={itemVariants}
                      >
                        <span>Booth {caseta}</span>
                        <span className="font-bold">
                          ${caseta <= 10 ? 200 : 100}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="font-bold mt-2">
                    Total: $
                    {selectedCasetas.reduce(
                      (sum, caseta) => sum + (caseta <= 10 ? 200 : 100),
                      0
                    )}
                  </p>
                </motion.div>
                <motion.div
                  className="bg-gray-100 p-4 rounded-lg"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-xl text-gray-800">
                    Payment Information
                  </h3>
                  <p className="text-gray-700">
                    Cardholder: {paymentData?.cardHolder}
                  </p>
                  <p className="text-gray-700">
                    Card Number: **** **** **** {paymentData?.number.slice(-4)}
                  </p>
                  <p className="text-gray-700">
                    Card Type: {paymentData?.cardType}
                  </p>
                  <p className="text-gray-700">
                    Payment Network: {paymentData?.paymentNetwork}
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounde
d-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={(e) => formSubmitHandler(e)}
                  >
                    Confirm Reservation
                  </button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Calculate the sum
    const suma = selectedCasetas.reduce(
      (sum, caseta) => sum + (caseta <= 10 ? 10000 : 5000),
      0
    );

    // Format the card number
    const alertSuscess = () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    };
    const card = {
      number: paymentData.number.replace(/(\d{4})(?=\d)/g, "$1-"),
      cvv: paymentData.cvv,
      thruDate: paymentData.thruDate,
      amount: suma,
    };

    console.log(card);
    console.log(selectedCasetas);

    // Make the POST request
    axios
      .post(
        "https://homebankig.onrender.com/api/cards/clients/current/payment",
        card
      )
      .then((response) => {
        alertSuscess();
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error making the request:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
        Book Your Booth
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
                    transition: {
                      duration: 0.5,
                      repeat: index === currentStep ? Infinity : 0,
                      repeatType: "reverse",
                    },
                  }}
                >
                  {React.createElement(step.icon, {
                    className: `w-6 h-6 ${
                      index === currentStep ? "text-blue-600" : "text-gray-500"
                    }`,
                  })}
                </motion.span>
                <span className="hidden sm:inline-flex sm:ml-2">
                  {step.title}
                </span>
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
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservaPage;
