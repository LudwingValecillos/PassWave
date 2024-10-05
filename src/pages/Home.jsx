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

const Home = () => {
  const client = useSelector((state) => state.client);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if(client.firstName == ""){
      dispatch(loadClient());
    }
  
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
    <div className="w-full bg-[#F2D22E]">
      <div className="flex flex-col items-center relative">
        {/* WELCOME text */}
        <h2
          className="font-extrabold text-center mt-8 relative z-10"
          style={{
            fontFamily: "'Rubik Bubbles', cursive",
            fontSize: "200px",
            padding: "20px",
          }}
        >
          WELCOME
        </h2>
        <img
          src="/src/assets/slogan2.gif"
          alt="Slogan"
          className="w-80 h-auto mt-0"
        />

        {/* Image with adjusted styles and scroll-based movement */}
        <img
          src="https://d3n32ilufxuvd1.cloudfront.net/635fde9e3d2caa0029c91035/4190189/Image-0157de3b-2ef9-45c1-ba67-9bad1e1925fb.gif"
          alt="Overlay Image"
          className="absolute"
          style={{
            top: "150px", // Adjusted top position
            right: "20px", // Right alignment
            width: "450px", // Increased width
            height: "auto", // Maintain aspect ratio
            zIndex: "5", // Stacking order
            opacity: "0.85", // Adjusted opacity
            transform: `translateX(-${scrollPosition * 0.5}px)`, // Scroll movement
          }}
        />
      </div>
      {/* Espacio para separar la imagen y el slide */}
      <div style={{ height: "150px" }} />{" "}
      {/* Aumentar esta altura para mover el slide más abajo */}
      {/* Slide Promocional */}
      <div className="relative w-full h-[100px] bg-black overflow-hidden flex items-center justify-center">
        {" "}
        {/* Añadir flex para centrar */}
        <motion.div
          className="white text-3xl text-center text-white z-10"
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
      <div className="relative w-full h-[100px] bg-black overflow-hidden flex items-center justify-center">
        {" "}
        {/* Añadir flex para centrar */}
        <motion.div
          className="white text-3xl text-center text-white z-10"
          initial={{ x: "100%" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          style={{ fontFamily: "'Rubik Bubbles', cursive" }}
        >
          Catch the Wave of Creativity and Connection—Experience a Fusion of Art
          and Community That Inspires and Transforms.
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
      <div className="relative w-full h-[100px] bg-black overflow-hidden flex items-center justify-center">
        {" "}
        {/* Añadir flex para centrar */}
        <motion.div
          className="white text-3xl text-center text-white z-10"
          initial={{ x: "100%" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          style={{ fontFamily: "'Rubik Bubbles', cursive" }}
        >
          Catch the Wave of Creativity and Connection—Experience a Fusion of Art
          and Community That Inspires and Transforms.
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
      <div className="relative w-full h-[100px] bg-yellow-500 overflow-hidden flex items-center justify-center">
        {" "}
        {/* Añadir flex para centrar */}
        <motion.div
          className="white text-3xl text-center text-black z-10"
          initial={{ x: "100%" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          style={{ fontFamily: "'Rubik Bubbles', cursive" }}
        >
          Catch the Wave of Creativity and Connection—Experience a Fusion of Art
          and Community That Inspires and Transforms.
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
  );
};

export default Home;
