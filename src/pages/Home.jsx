import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import VintageCard from "../components/VintageCard";
import ConcertsImage from "../assets/1.png";
import Expositions from "../assets/2.png";
import Oratory from "../assets/3.png";
import Shows from "../assets/4.png";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from "../redux/actions/clientActions";
import Darkened from "../components/Darkened";
import { Link } from "react-router-dom";
import SketchCardEvent from "../components/SketchCardEvent";
import { loadEvents } from "../redux/actions/eventsAction";

const Home = () => {
  const events = useSelector((state) => state.events.events);
  const eventCrest = events.find((event) => event.place.name === "Crest");
  const eventDrift = events.find((event) => event.place.name === "Drift");

  const eventTide = events.find((event) => event.place.name === "Tide");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const client = useSelector((state) => state.client.client);

  const dispatch = useDispatch();
  useEffect(() => {
    if (client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
    dispatch(loadEvents());
  }, [dispatch]);

  const [scrollPosition, setScrollPosition] = useState(0);

  // Effect to update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="  w-full bg-[#F2D22E] ">
      <div className="flex flex-col items-center relative">
        {/* WELCOME text */}

        <h2
          className="font-extrabold text-center mt-8 relative z-10 text-4xl      
    sm:text-6xl   
    md:text-8xl   
    lg:text-9xl 
    xl:text-[200px] 
    p-4 sm:p-6 md:p-8 lg:p-10 "
          style={{ fontFamily: "'Rubik Bubbles', cursive" }}
        >
          WELCOME
        </h2>

        <img
          src="/src/assets/slogan2.gif"
          alt="Slogan"
          className="
    w-40       
    sm:w-60     
    md:w-80     
    lg:w-96     
    xl:w-[400px] 
    h-auto      
    mt-0        
  "
        />

        {/* Image with adjusted styles and scroll-based movement */}
        <img
          src="https://d3n32ilufxuvd1.cloudfront.net/635fde9e3d2caa0029c91035/4190189/Image-0157de3b-2ef9-45c1-ba67-9bad1e1925fb.gif"
          alt="Overlay Image"
          className="
    absolute
    right-4     // Ajusta la posición a la derecha en pantallas pequeñas
    sm:right-6  // Posición ajustada a la derecha para pantallas medianas
    md:right-10 // Mayor separación a la derecha para pantallas medianas y grandes
    top-[100px] // Ajuste superior para pantallas pequeñas
    sm:top-[120px] 
    md:top-[150px]
    w-[200px]   // Ancho para pantallas pequeñas
    sm:w-[300px] // Ancho para pantallas medianas
    md:w-[400px] // Ancho para pantallas grandes
    lg:w-[450px] // Ancho máximo para pantallas muy grandes
    opacity-85  // Mantiene la opacidad
    z-5         // Z-index para mantener la jerarquía
  "
          style={{
            transform: `translateX(-${scrollPosition * 0.5}px)`, // Movimiento en base al scroll
          }}
        />
      </div>
      {/* Espacio para separar la imagen y el slide */}
      <div style={{ height: "150px" }} />{" "}
      {/* Aumentar esta altura para mover el slide más abajo */}
      {/* Slide Promocional */}
      <div className="relative w-full h-[80px] sm:h-[100px] bg-black overflow-hidden flex items-center justify-center">
        {/* Añadir flex para centrar */}
        <motion.div
          className="
      white 
      text-xl       // Tamaño de texto para pantallas pequeñas
      sm:text-2xl   // Tamaño de texto para pantallas medianas
      md:text-3xl   // Tamaño de texto para pantallas grandes
      lg:text-4xl   // Tamaño de texto para pantallas muy grandes
      whitespace-nowrap // Evita saltos de línea
      text-center 
      text-white 
      z-10
    "
          initial={{ x: "100%" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          style={{ fontFamily: "'Rubik Bubbles', cursive" }}
        >
          Catch the Wave of Creativity and Connection—Experience a Fusion of Art
          and Community That Inspires and Transforms.
        </motion.div>
      </div>
      {/* Spacer to separate welcome section from cards */}
      {/* <div style={{ height: "100vh" }} />  Height can be adjusted as needed */}
      {/* Card 1: Color de fondo #04bf9d */}
      <div
        className=" hidden md:block md:flex items-center justify-center gap-4 p-4"
        data-aos="fade-up"
      >
        <Darkened
          link="/crest"
          src={ConcertsImage}
          text="Experience music at its finest with vibrant concerts and impeccable acoustics."
          text2="In this space, the audience stands and immerses themselves in vibrant live performances with impeccable acoustics."
          title="Crest"
          type="Recitals"
        ></Darkened>

        <Darkened
          link="/tide"
          src={Expositions}
          text="The perfect space for events and exhibitions that connect ideas and businesses."
          text2="Customers can purchase tickets and even participate with their own businesses in exhibitions and networking events."
          title="Tide"
          type="Expositions"
        ></Darkened>

        <Darkened
          link="/drift"
          src={Oratory}
          text="Discover inspiring talks and speeches that leave a lasting impact."
          text2="With comfortable seating, the audience enjoys captivating talks and performances in a more intimate setting."
          title="Drift"
          type="Performances"
        ></Darkened>
      </div>
      <div className="block md:hidden">
        <div data-aos="fade-up" className="w-full">
          <VintageCard
            title="CREST"
            imageUrl={Expositions}
            buttonText="+ Info"
            backgroundColor="#04bf9d"
            fontFamily="'Bebas Neue', sans-serif"
            hoverText="Crest is an open space designed for unstructured music concerts, where attendees can enjoy performances while standing. The area fosters a free-flowing, relaxed environment perfect for spontaneous musical expression. It’s the go-to spot for energetic, outdoor events where the connection between artists and the crowd feels more intimate and interactive, providing a laid-back, fun atmosphere. Crest is ideal for fans who love the freedom of movement and vibrant, immersive experiences that come with informal live performances."
          />
        </div>
        {/* Slide Promocional */}
        <div className="relative w-full h-[80px] sm:h-[100px] bg-black overflow-hidden flex items-center justify-center">
          {/* Añadir flex para centrar */}
          <motion.div
            className="
      white 
      text-xl       // Tamaño de texto para pantallas pequeñas
      sm:text-2xl   // Tamaño de texto para pantallas medianas
      md:text-3xl   // Tamaño de texto para pantallas grandes
      lg:text-4xl   // Tamaño de texto para pantallas muy grandes
      whitespace-nowrap // Evita saltos de línea
      text-center 
      text-white 
      z-10
    "
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            style={{ fontFamily: "'Rubik Bubbles', cursive" }}
          >
            Catch the Wave of Creativity and Connection—Experience a Fusion of
            Art and Community That Inspires and Transforms.
          </motion.div>
        </div>
        {/* Card 2 */}
        <div data-aos="fade-up" className="w-full">
          <VintageCard
            title="TIDE"
            imageUrl={ConcertsImage}
            buttonText="+ Details"
            backgroundColor="#05c7f2"
            fontFamily="'Bebas Neue', sans-serif"
            hoverText="Tide is a versatile convention hall equipped for a range of events, from trade shows to cultural exhibitions. With ample room for setting up stands, it caters to both vendors and visitors, allowing for general ticket sales and open entry. The space is adaptable to various configurations, whether you're hosting corporate conventions, public expos, or even educational fairs. Tide offers the perfect mix of functionality and accessibility, making it an excellent venue for large-scale gatherings where business and culture come together."
          />
        </div>
        {/* Slide Promocional */}
        <div className="relative w-full h-[80px] sm:h-[100px] bg-black overflow-hidden flex items-center justify-center">
          {/* Añadir flex para centrar */}
          <motion.div
            className="
      white 
      text-xl       // Tamaño de texto para pantallas pequeñas
      sm:text-2xl   // Tamaño de texto para pantallas medianas
      md:text-3xl   // Tamaño de texto para pantallas grandes
      lg:text-4xl   // Tamaño de texto para pantallas muy grandes
      whitespace-nowrap // Evita saltos de línea
      text-center 
      text-white 
      z-10
    "
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            style={{ fontFamily: "'Rubik Bubbles', cursive" }}
          >
            Catch the Wave of Creativity and Connection—Experience a Fusion of
            Art and Community That Inspires and Transforms.
          </motion.div>
        </div>
        {/* Card 3 */}
        <div data-aos="fade-up" className="w-full">
          <VintageCard
            title="DRIFT"
            imageUrl={Oratory}
            buttonUrl="/drift"
            backgroundColor="#f2d22e"
            fontFamily="'Bebas Neue', sans-serif"
            hoverText="Drift is a modern amphitheater where attendees can enjoy seated performances with tickets, ensuring a clear view and excellent acoustics. It’s designed for audiences seeking a comfortable, immersive experience while watching live performances, such as orchestras, plays, or musical shows. The structured seating arrangement provides an orderly yet intimate setting, allowing for a more focused engagement with the event. Drift is the perfect venue for those who prefer a seated, well-organized environment while enjoying high-quality entertainment."
          />
        </div>
        {/* Slide Promocional */}
        <div className="relative w-full h-[80px] sm:h-[100px] bg-yellow-500 overflow-hidden flex items-center justify-center">
          {/* Añadir flex para centrar */}
          <motion.div
            className="
      white 
      text-xl       // Tamaño de texto para pantallas pequeñas
      sm:text-2xl   // Tamaño de texto para pantallas medianas
      md:text-3xl   // Tamaño de texto para pantallas grandes
      lg:text-4xl   // Tamaño de texto para pantallas muy grandes
      whitespace-nowrap // Evita saltos de línea
      text-center 
      text-white 
      z-10
    "
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            style={{ fontFamily: "'Rubik Bubbles', cursive" }}
          >
            Catch the Wave of Creativity and Connection—Experience a Fusion of
            Art and Community That Inspires and Transforms.
          </motion.div>
        </div>
        {/* Card 4 */}
        <div data-aos="fade-up" className="w-full">
          <VintageCard
            title=" ALL EVENTS"
            imageUrl={Shows}
            buttonText="Explore"
            backgroundColor="#f20505"
            fontFamily="'Bebas Neue', sans-serif"
            hoverText="Is the central hub where all upcoming events hosted at the cultural center are displayed. Whether it's concerts, conventions, or theatrical performances, this space offers a comprehensive view of what’s happening across all venues, including Crest, Tide, and Drift. Visitors can browse through a diverse range of entertainment options, with details on each event, schedules, and ticketing information. It's the perfect spot to plan your next cultural experience, ensuring you don’t miss out on any of the exciting activities available at the center."
          />
        </div>
      </div>
      <div className="flex justify-evenly py-10 flex-wrap gap-8 bg-[#F2F2F2]">
        <h3 className="text-5xl font-bold text-gray-800 text-center w-full">
          Featured Events
        </h3>


        <div>
          <SketchCardEvent
            title={eventCrest?.name || "Crest"}
            img={eventCrest?.images[0] || ""}
            date={eventCrest?.date || ""}
            quotas={eventCrest?.ticketsAvailable || 0}
            artists={eventCrest?.artists.length || 0}
            price={eventCrest?.ticketPrice || 0}
            id={eventCrest?.id || 0}
          />
        </div>
        <div>
          <SketchCardEvent
            title={eventTide?.name || "Tide"}
            img={eventTide?.images[0] || ""}
            date={eventTide?.date || ""}
            quotas={eventTide?.ticketsAvailable || 0}
            artists={eventTide?.artists.length || 0}
            price={eventTide?.ticketPrice || 0}
            id={eventTide?.id || 0}
          />
        </div>
        <div>
          <SketchCardEvent
            title={eventDrift?.name || "Drift"}
            img={eventDrift?.images[0] || "Drift"}
            date={eventDrift?.date || "Drift"}
            quotas={eventDrift?.ticketsAvailable || "Drift"}
            artists={eventDrift?.artists.length || "Drift"}
            price={eventDrift?.ticketPrice || "Drift"}
            id={eventDrift?.id || "Drift"}
          />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
