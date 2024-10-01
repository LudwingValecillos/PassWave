import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import VintageCard from "../components/VintageCard"; 
import ConcertsImage from "../assets/Concerts.png"; 
import Expositions from "../assets/2.png";
import Oratory from "../assets/3.png";
import Shows from "../assets/4.png";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
    <div className="w-full">
      <div className="flex flex-col items-center relative">
        {/* WELCOME text */}
        <h2
          className="font-extrabold text-center mt-8 relative z-10"
          style={{ fontFamily: "'Rubik Bubbles', cursive", fontSize: "200px", padding: "20px" }}
        >
          WELCOME
        </h2>
        <img src="/src/assets/slogan2.gif" alt="Slogan" className="w-80 h-auto mt-0" />

        {/* Image with adjusted styles and scroll-based movement */}
        <img
          src="https://d3n32ilufxuvd1.cloudfront.net/635fde9e3d2caa0029c91035/4190189/Image-0157de3b-2ef9-45c1-ba67-9bad1e1925fb.gif"
          alt="Overlay Image"
          className="absolute"
          style={{
            top: "150px",    // Adjusted top position
            right: "20px",   // Right alignment
            width: "450px",  // Increased width
            height: "auto",   // Maintain aspect ratio
            zIndex: "5",     // Stacking order
            opacity: "0.85", // Adjusted opacity
            transform: `translateX(-${scrollPosition * 0.5}px)`, // Scroll movement
          }}
        />
      </div>
      {/* Espacio para separar la imagen y el slide */}
<div style={{ height: "150px" }} /> {/* Aumentar esta altura para mover el slide más abajo */}

{/* Slide Promocional */}
<div className="relative w-full h-[100px] bg-black overflow-hidden flex items-center justify-center"> {/* Añadir flex para centrar */}
  <motion.div
    className="white text-3xl text-center text-white z-10"
    initial={{ x: '100%' }}
    animate={{ x: ['100%', '-100%'] }}
    transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
    style={{ fontFamily: "'Rubik Bubbles', cursive" }}
  >
 Catch the Wave of Creativity and Connection—Experience a Fusion of Art and Community That Inspires and Transforms. 
  </motion.div>
</div>

      {/* Spacer to separate welcome section from cards */}
      <div style={{ height: "100vh" }} />  {/* Height can be adjusted as needed */}

      {/* Card 1: Color de fondo #04bf9d */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="Rhythms of the Tides - Echoes Unplugged - Tidal Beat Fest - Rock Tides Concert - Waves of Sound Concert" 
          imageUrl={ConcertsImage} 
          buttonText="+ Info"
        />
      </div>

      {/* Card 2 */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="The Creative Current - Innovators' Haven - Cultural Tides Market – The Creative Current - Innovators' Haven - Cultural Tides Market" 
          imageUrl={Expositions} 
          buttonText="+ Details"
          backgroundColor="#05c7f2"
          fontFamily="'Chelsea Market'" 
        />
      </div>

      {/* Card 3 */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="Voices of the Future - The Art of Storytelling - Cultural Currents Talks - Voices of the Future - The Art of Storytelling - Cultural Currents Talks" 
          imageUrl={Oratory}
          buttonText="Learn More"
          backgroundColor="#f2d22e"
          fontFamily="'Cinzel', serif" 
        />
      </div>

      {/* Card 4 */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="Heroes' Summit – The Moonlit Show - Symphony of the Waves - Heroes' Summit – The Moonlit Show - Symphony of the Waves" 
          imageUrl={Shows} 
          buttonText="Explore"
          backgroundColor="#f20505"
          fontFamily="'Catamaran', sans-serif" 
        />
      </div>
    </div>
  );
};

export default Home;
