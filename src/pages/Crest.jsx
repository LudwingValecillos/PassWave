import React from 'react'
import PrintCardEvenes from '../components/PrintCardEvenes'
import VintageCard from '../components/VintageCard'
import ConcertsImage from "../assets/1.png";




function Crest() {
  window.scrollTo(0, 0);

  return (

    <>
    <div data-aos="fade-up" className="w-full">
        <VintageCard
          title="CREST"
          imageUrl={ConcertsImage}
          buttonText="+ Info"
          backgroundColor="#04bf9d"
          fontFamily="'Bebas Neue', sans-serif"
          hoverText="Crest is an open space designed for unstructured music concerts, where attendees can enjoy performances while standing. The area fosters a free-flowing, relaxed environment perfect for spontaneous musical expression. It’s the go-to spot for energetic, outdoor events where the connection between artists and the crowd feels more intimate and interactive, providing a laid-back, fun atmosphere. Crest is ideal for fans who love the freedom of movement and vibrant, immersive experiences that come with informal live performances."
          applyHover={true}
      />
      </div>
    <PrintCardEvenes id={2}/>

    </>

  )
}

export default Crest