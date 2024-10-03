import React from 'react'
import PrintCardEvenes from '../components/PrintCardEvenes'
import VintageCard from '../components/VintageCard'
import Oratory from "../assets/3.png";


function Drift() {
  return (
    <>
    <div data-aos="fade-up" className="w-full">
        <VintageCard
          title="DRIFT"
          imageUrl={Oratory}
          buttonText="Learn More"
          backgroundColor="#f2d22e"
          fontFamily="'Bebas Neue', sans-serif"
          hoverText="Drift is a modern amphitheater where attendees can enjoy seated performances with tickets, ensuring a clear view and excellent acoustics. It’s designed for audiences seeking a comfortable, immersive experience while watching live performances, such as orchestras, plays, or musical shows. The structured seating arrangement provides an orderly yet intimate setting, allowing for a more focused engagement with the event. Drift is the perfect venue for those who prefer a seated, well-organized environment while enjoying high-quality entertainment."
          applyHover={true}
        />
      </div>
    <PrintCardEvenes id={3}/>
    </>

   

  )
}

export default Drift