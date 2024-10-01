import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VintageCard from "../components/VintageCard"; 
import ConcertsImage from "../assets/Concerts.png"; 
import Expositions from "../assets/2.png";
import Oratory from "../assets/3.png";
import Shows from "../assets/4.png";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    
    <div className="w-full">
      {/* Card 1: Color de fondo #04bf9d */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="Rhythms of the Tides - Echoes Unplugged - Tidal Beat Fest - Rock Tides Concert - Waves of Sound Concert" 
          imageUrl={ConcertsImage} 
          buttonText="+ Info"
          backgroundColor="#04bf9d" // Color de fondo específico
          fontFamily="'Rock Salt', cursive" // Fuente específica para esta tarjeta
        />
      </div>

      {/* Card 2 */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="The Creative Current - Innovators' Haven - Cultural Tides Market – The Creative Current - Innovators' Haven - Cultural Tides Market" 
          imageUrl={Expositions} 
          buttonText="+ Details"
          backgroundColor="#05c7f2" // Color diferente
          fontFamily="'Chelsea Market'" // Fuente específica para esta tarjeta
        />
      </div>

      {/* Card 3 */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="Voices of the Future - The Art of Storytelling - Cultural Currents Talks - Voices of the Future - The Art of Storytelling - Cultural Currents Talks" 
          imageUrl={Oratory}
          buttonText="Learn More"
          backgroundColor="#f2d22e" // Otro color de fondo
          fontFamily="'Cinzel', serif" // Mismo fuente específica
        />
      </div>

      {/* Card 4 */}
      <div data-aos="fade-up" className="w-full">
        <VintageCard 
          title="Heroes' Summit –  The Moonlit Show - Symphony of the Waves - Heroes' Summit –  The Moonlit Show - Symphony of the Waves" 
          imageUrl={Shows} 
          buttonText="Explore"
          backgroundColor="#f20505" // Color distinto
          fontFamily="'Catamaran', sans-serif" // Otra fuente específica
        />
      </div>
    </div>
  );
};

export default Home;