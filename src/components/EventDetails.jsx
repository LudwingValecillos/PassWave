import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button2 from "./Button2";
import Buttonw from "./Buttonw";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Ticket,
  Users,
  DollarSign,
} from "lucide-react";

import { loadEvents, selectEvent } from "../redux/actions/eventsAction";
import { loadClient } from "../redux/actions/clientActions";

const EventDetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const eventId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = useSelector((state) =>
    state.events.events.find((event) => event.id === eventId)
  );
  const status = useSelector((state) => state.client.status);
  const client = useSelector((state) => state.client.client);

  console.log(event.stands[0]);
  
  window.scrollTo(0, 0);

  useEffect(() => {
    if (client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
    if (event.name == "") {
      dispatch(loadEvents());
    }
    setIsVisible(true);
  }, [dispatch]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % event.images.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + event.images.length) % event.images.length
    );
  };
  const handleLoginClick = () => {
    // Guarda la ruta actual en el localStorage
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    navigate("/login"); // Redirige a la página de login
  };

  if (!event) {
    return <div className="text-center text-2xl mt-10">Event not found</div>;
  }

  const handleBuyTicketClick = () => {
    if (event) {
      console.log("Buy ticket button clicked");
      dispatch(selectEvent(event)); // Almacena el evento en el estado
      navigate("/event-ticket-system"); // Redirige a la ruta deseada
    } else {
      console.log("Event not loaded yet");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-2 md:px-4 sm:px-6 lg:px-8 font-comic-sans ">
      <div
        className={`mx-auto bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg overflow-hidden transition-all duration-1000 ease-in-out border-black border-2  ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative md:h-[600px] overflow-hidden">
          <img
            src={event.images[currentImage]}
            alt={`Image ${currentImage + 1} of event ${event.name}`}
            className="w-full h-60 md:h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 transform-translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors duration-300 animate-bounce"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors duration-300 animate-bounce"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-lg  md:text-5xl font-bold text-white mb-2 text-shadow-lg animate-pulse">
              {event.name}
            </h1>
            <p className="md:text-2xl text-yellow-300 ">{event.place.name}</p>
          </div>
        </div>

        <div className="p-2  md:p-6 lg:p-8 bg-white">
          <div className="flex flex-wrap items-center justify-between md:justify-evenly mb-6 bg-blue-100 border-2 border-black p-4 rounded-lg shadow-inner">
            <div className="flex items-center mb-2 lg:mb-0 transform hover:scale-105 transition-transform">
              <Calendar className="mr-2 text-blue-600" />
              <span className="md:text-lg font-bold">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mb-2 lg:mb-0 transform hover:scale-105 transition-transform">
              <MapPin className="mr-2 text-red-600" />
              <span className="md:text-lg font-bold">{event.place.name}</span>
            </div>
            <div className="flex items-center mb-2 lg:mb-0 transform hover:scale-105 transition-transform">
              <Ticket className="mr-2 text-green-600" />
              <span className="md:text-lg font-bold">
                ${event.ticketPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center transform hover:scale-105 transition-transform">
              <Users className="mr-2 text-purple-600" />
              <span className="md:text-lg font-bold">
                {event.ticketsAvailable} available
              </span>
            </div>
          </div>

          <p className="text-lg md:text-2xl mb-8 mx-2 md:mx-0 leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gray-100 p-6 rounded-lg border-2 border-black animate-fade-in-up">
            {event.description}
          </p>

          <div
            className={`gap-8 mb-8 text-3xl mx-2 md:mx-0 ${
              event.stands.length == 0 ? "" : "grid grid-cols-1 md:grid-cols-2"
            }`}
          >
            {/* Featured Artists Section */}
            <div className="p-8 flex bg-[#F2BB13] flex-wrap text-center justify-evenly rounded-lg border-2 border-black duration-400 transform hover:-rotate-[0.5deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:border-4 transition-transform">
              <h2
                className="
       font-bold w-full text-lg md:text-3xl mb-4 bg-black text-white p-2 rounded-3xl border-b-4 border-[#BFBFBF]"
              >
                Featured Artists
              </h2>
              <ul className="space-y-4">
                {event.artists.map((artist, index) => (
                  <li
                    key={index}
                    className="flex  items-start animate-fade-in-left p-2 rounded-lg shadow-lg border-2 border-black bg-[#F2F2F2]"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 animate-ping"></span>
                    <span className="text-lg">{artist}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stand Information Section */}
            {event.stands.length == 0 ? (
              ""
            ) : (
              <div className="p-8 flex bg-[#F2BB13] flex-wrap text-center justify-evenly rounded-lg border-2 border-black duration-400 transform hover:-rotate-[0.5deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:border-4 transition-transform">
                <h2 className="font-bold w-full text-3xl mb-4 bg-black text-white p-2 rounded-3xl border-b-4 border-[#BFBFBF]">
                 {event.place.id == 3 ? "Detail of seats" : "Stand Information"} 
                </h2>
                {event.stands.map((stand, index) => (
                  <div
                    key={index}
                    className="mb-4 h-32 flex flex-col items-center justify-between last:mb-0 animate-fade-in-right bg-[#F2F2F2] p-2 rounded-lg shadow-lg border-2 border-black"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <h3 className="font-semibold text-xl">
                     
                    {event.place.id == 3? "Price": stand.size.charAt(0).toUpperCase() + stand.size.slice(1)  }{}
                    
                    </h3>
                    <div className="flex items-center mt-1 justify-center">
                      <DollarSign className="mr-1 text-green-600" size={18} />
                      <span className="text-lg font-bold">
                        {stand.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-md text-gray-600 mt-1 font-bold">

                      {stand.locations.length} Available locations 

                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex  sm:flex-row justify-center gap-4">
            {status == "success" ? (
              event.place.id == 1 ? (
                <>
                  <Button2
                    title="Buy Ticket Now!"
                    onClick={handleBuyTicketClick}
                  />
                  {event.stands[0].locations.length == 0 && event.stands[1].locations.length == 0?
                 
                  <> 
                  <Buttonw title="Sold out" />{" "}
                  </>
                   : 
                   <Link to={`/reserva/${event.id}`}>
                   <Buttonw title="Rent a Stand!" />{" "}
                 </Link>
                 }
                 

                </>

              ) : event.place.id == 2 ? (
                <>
                  <Button2
                    title="Buy Ticket Now!"
                    onClick={handleBuyTicketClick}
                  />
                </>
              ) : (
                <Link to={`/reserva/${event.id}`}>
                  <Button2 title="Buy Ticket Now!" />
                </Link>
              )
            ) : (
              <Link to="/login" onClick={handleLoginClick}>
                <Button2 title="Login" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
