import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { loadEvents } from "../redux/actions/eventsAction";

const EventDetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const eventId = Number(id);
  const dispatch = useDispatch();

  const event = useSelector((state) =>
    state.events.events.find((event) => event.id === eventId)
  );
  console.log(event);

  window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(loadEvents());
    setIsVisible(true);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % event.images.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + event.images.length) % event.images.length
    );
  };

  if (!event) {
    return <div className="text-center text-2xl mt-10">Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-4 sm:px-6 lg:px-8 font-comic-sans ">
      <div
        className={`mx-auto bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg overflow-hidden transition-all duration-1000 ease-in-out border-black border-2  ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative h-[600px] overflow-hidden">
          <img
            src={event.images[currentImage]}
            alt={`Image ${currentImage + 1} of event ${event.name}`}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors duration-300 animate-bounce"
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
            <h1 className="text-5xl font-bold text-white mb-2 text-shadow-lg animate-pulse">
              {event.name}
            </h1>
            <p className="text-2xl text-yellow-300">{event.place.name}</p>
          </div>
        </div>

        <div className="p-6 lg:p-8 bg-white">
          <div className="flex flex-wrap items-center justify-evenly mb-6 bg-blue-100 border-2 border-black p-4 rounded-lg shadow-inner">
            <div className="flex items-center mb-2 lg:mb-0 transform hover:scale-105 transition-transform">
              <Calendar className="mr-2 text-blue-600" />
              <span className="text-lg font-bold">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mb-2 lg:mb-0 transform hover:scale-105 transition-transform">
              <MapPin className="mr-2 text-red-600" />
              <span className="text-lg font-bold">{event.place.name}</span>
            </div>
            <div className="flex items-center mb-2 lg:mb-0 transform hover:scale-105 transition-transform">
              <Ticket className="mr-2 text-green-600" />
              <span className="text-lg font-bold">${event.ticketPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center transform hover:scale-105 transition-transform">
              <Users className="mr-2 text-purple-600" />
              <span className="text-lg font-bold">
                {event.ticketsAvailable} available
              </span>
            </div>
          </div>

          <p className="text-2xl mb-8 leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gray-100 p-6 rounded-lg border-2 border-black animate-fade-in-up">
            {event.description}
          </p>

          <div
            className={`gap-8 mb-8 text-3xl ${
              event.stands.length == 0 ? "" : "grid grid-cols-1 md:grid-cols-2"
            }`}
          >
            {/* Featured Artists Section */}
            <div className="p-8 flex bg-[#F2BB13] flex-wrap text-center justify-evenly rounded-lg border-2 border-black duration-400 transform hover:-rotate-[0.5deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:border-4 transition-transform">
              <h2
                className="
       font-bold w-full text-3xl mb-4 bg-black text-white p-2 rounded-3xl border-b-4 border-[#BFBFBF]"
              >
                Featured Artists
              </h2>
              <ul className="space-y-4">
                {event.artists.map((artist, index) => (
                  <li
                    key={index}
                    className="flex items-start animate-fade-in-left p-2 rounded-lg shadow-lg border-2 border-black bg-[#F2F2F2]"
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
                  Stand Information
                </h2>
                {event.stands.map((stand, index) => (
                  <div
                    key={index}
                    className="mb-4 h-32 flex flex-col items-center justify-between last:mb-0 animate-fade-in-right bg-[#F2F2F2] p-2 rounded-lg shadow-lg border-2 border-black"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <h3 className="font-semibold text-xl">
                      {stand.size.charAt(0).toUpperCase() + stand.size.slice(1)}{" "}
                      Stand
                    </h3>
                    <div className="flex items-center mt-1 justify-center">
                      <DollarSign className="mr-1 text-green-600" size={18} />
                      <span className="text-lg font-bold">
                        {stand.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-md text-gray-600 mt-1 font-bold">
                      {stand.locations.length} locations available
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {event.stands.length == 0 ? (
              <Button2 title="Buy Ticket Now!" />
            ) : (
              <>
                {" "}
                <Button2 title="Buy Ticket Now!" />{" "}
                
                <Link to={`/reserva/${event.id}`}>
                <Buttonw title="Rent a Stand!" />{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
