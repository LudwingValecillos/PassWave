import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from '../redux/actions/ClientActions';
import Aos from "aos";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import download from "../assets/DOWNLOAD.PNG";
import qrCode from "../assets/qr.png";
import { Armchair, Store, Ticket } from "lucide-react";

export default function PerfilUsuario() {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.client);

  const [activeTab, setActiveTab] = useState("perfil");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const events = useSelector((state) => state.events.events || []);
  const ticketRef = useRef(null);
  const standRef = useRef(null); // Nueva referencia para los stands

  console.log(client);
  
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (client.firstName === "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
  }, [dispatch]);
  const handleDownloadPDF = async (ref) => {
    const element = ref.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = (pdfHeight - imgHeight * ratio) / 2;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save("ticket.pdf");
  };

  return (
    <div
      className="flex justify-center items-center p-4"
      onMouseMove={handleMouseMove}
    >
      <div
        className="w-full max-w-4xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white rounded-2xl  overflow-hidden border-gray-400 border-2 transition-all duration-300 hover:shadow-3xl"
        data-aos="fade-up"
      >
        <div className="relative pb-20 bg-gradient-to-r from-[#caaf5e] to-[#f28d35] text-white">
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 ">
            <img
              src="https://d3n32ilufxuvd1.cloudfront.net/635fde9e3d2caa0029c91035/4190189/Image-0157de3b-2ef9-45c1-ba67-9bad1e1925fb.gif"
              alt="Wave Center"
              className="w-40 h-40 rounded-full border-4 border-white bg-slate-800 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text-center mt-8 p-6">
            <h2 className="text-4xl font-bold mb-2">
              {client?.firstName} {client?.lastName}
            </h2>
            <p className="text-xl text-gray-200">Member of Wave Center</p>
          </div>
          <div className="mt-6 text-center px-4">
            <h3 className="text-3xl font-semibold mb-4 text-yellow-300">
              So Glad You're Here! 🌟
            </h3>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-bold">
              Discover a place where culture, creativity, and community come
              together. At Wave Center, we invite you to enjoy music 🎵, art 🎨,
              captivating exhibitions, and unique events. Join our vibrant
              community and experience something new every time you visit. The
              center is yours!
            </p>
          </div>
        </div>

        <div className="pt-24 px-6 pb-6 w-full">
          <div className="flex justify-center space-x-4 mb-8">
            {["perfil", "tickets", "stands"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-lg font-medium rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md" data-aos="fade-up">
            {activeTab === "perfil" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="text-xl font-semibold text-gray-800">
                    {client?.firstName} {client?.lastName}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    ID: {client?.id}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{client?.email}</span>
                </div>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Your Reserved Tickets
                </h3>
                {client?.orderTickets?.length > 0 ? (
                  client.orderTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="bg-gray-50 border-2 border-black p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                      ref={ticketRef}
                    >
                      <div className="flex items-center justify-between">
                      <h4 className="text-xl font-semibold text-blue-600 mb-2">
                        {ticket.event}
                      </h4>
                        <img src="/logoOk.png" alt="" className="w-20"/>
                        </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-gray-600">
                            Purchase Date:{" "}
                            {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600">
                            Purchase Time:{" "}
                            {new Date(ticket.purchaseDate).toLocaleTimeString()}
                          </p>
                          <p className="flex gap-2 text-gray-600">
                          <Ticket /> 
                           Ticket Quantity: {ticket.quantity}
                          </p>
                          { ticket?.positions?.length > 0 &&
                            <p className="text-gray-600 flex gap-2">
                              <Armchair />
                            Seats: {ticket?.positions?.join(", ")}
                          </p>
                          }
                          
                          
                        </div>
                        
                        <div>
                          <p className="text-gray-600">
                            Event Date:{" "}
                            {new Date(
                              events.find((e) => e.id === ticket.eventId).date
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600">
                            Event Time:{" "}
                            {new Date(
                              events.find(
                                (e) => e.id === ticket.eventId
                              ).tickets[0].purchaseDate
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className=" w-24 h-24 rounded-3xl bg-gray-300 flex items-center justify-center shadow-lg">
                          <img src={qrCode} alt="QR Code" />
                        </div>
                        <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {ticket.hashCode}
                        </span>
                        <button onClick={() => handleDownloadPDF(ticketRef)}>
                          <img
                            src={download}
                            alt="Descargar Ticket"
                            className="h-24 w-24"
                          />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No tickets available.</p>
                )}
              </div>
            )}

            {activeTab === "stands" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Your Stands
                </h3>
                {client?.rents?.length > 0 ? (
                  client.rents.map((rent) => (
                    <div
                      key={rent.id}
                      className="bg-gray-50 border-2 border-black p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                      ref={standRef}
                    >
                      <div className="flex items-center justify-between">
                      <div >
                      <h4 className="text-xl font-semibold text-green-600 mb-2">
                        {rent.name}
                      </h4>
                      <p>{rent.description}</p>
                      </div>
                      <div>
                        <img src="/logoOk.png" alt="" className="w-20"/>
                      </div>
                      </div>
                      <div className="flex items-center  justify-between py-2">
                        <div className="flex justify-between  items-center w-full">
                          <div className="">
                          <p className="text-gray-600">
                            Rent Date:{" "}
                            {new Date(rent.renDate).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600">
                            Rent Time:{" "}
                            {new Date(rent.renDate).toLocaleTimeString()}
                          </p>
                          <p className="text-gray-600 flex gap-2 mt-2">
                          <Store />
                            Positions: {rent?.rentedPositions?.join(", ") }
                          </p>
                          </div>
                          <div>
                          <p className="text-gray-600 font-bold border-b-2 border-green-400">
                             {rent.eventName}
                          </p>
                          <p className="text-gray-600">
                            Date: {new Date(rent.date).toDateString() }
                          </p>
                          <p className="text-gray-600">
                          Start time: {new Date(rent.date).toLocaleTimeString() }
                          </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className=" w-24 h-24 rounded-3xl bg-gray-300 flex items-center justify-center shadow-lg">
                          <img src={qrCode} alt="QR Code" />
                        </div>
                        <span className="inline-block mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {rent.hashCode}
                        </span>
                        <button onClick={() => handleDownloadPDF(standRef)}>
                          <img
                            src={download}
                            alt="Descargar Stand"
                            className="h-24 w-24"
                          />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No stands available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
