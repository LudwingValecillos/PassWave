import React from 'react'
import PrintCardEvenes from '../components/PrintCardEvenes'
import VintageCard from '../components/VintageCard'
import Expositions from "../assets/2.png";



function Tide() {
  return (

    <>
    <div data-aos="fade-up" className="w-full">
        <VintageCard
          title="TIDE"
          imageUrl={Expositions}
          buttonText="+ Details"
          backgroundColor="#05c7f2"
          fontFamily="'Bebas Neue', sans-serif"
          hoverText="Tide is a versatile convention hall equipped for a range of events, from trade shows to cultural exhibitions. With ample room for setting up stands, it caters to both vendors and visitors, allowing for general ticket sales and open entry. The space is adaptable to various configurations, whether you're hosting corporate conventions, public expos, or even educational fairs. Tide offers the perfect mix of functionality and accessibility, making it an excellent venue for large-scale gatherings where business and culture come together."
          applyHover={true}
       />
      </div>
    <PrintCardEvenes id={2}/>

    </>

  )
}

export default Tide