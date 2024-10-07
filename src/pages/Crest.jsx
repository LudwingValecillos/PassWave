import React, { useEffect } from 'react'
import PrintCardEvenes from '../components/PrintCardEvenes'
import VintageCard from '../components/VintageCard'
import ConcertsImage from "../assets/1.png";
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from '../redux/actions/clientActions';




function Crest() {
  const client = useSelector((state) => state.client.client);

  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  useEffect(() => {
    if(client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
  
    }, [dispatch]);
  return (

    <>
    <div data-aos="fade-up" className="w-full">
        <VintageCard
          title="CREST"
          imageUrl={ConcertsImage}
          buttonText="+ Info"
          backgroundColor="#04bf9d"
          fontFamily="'Bebas Neue', sans-serif"
          hoverText="Crest is an open space for unstructured music concerts, allowing attendees to enjoy performances while standing. It creates a relaxed environment for spontaneous musical expression. This spot is perfect for energetic, outdoor events where the connection between artists and the crowd is intimate and interactive, providing a fun atmosphere. Crest is ideal for fans who love freedom of movement and vibrant, immersive experiences in informal live performances."
          applyHover={true}
      />
      </div>
    <PrintCardEvenes id={2}/>

    </>

  )
}

export default Crest