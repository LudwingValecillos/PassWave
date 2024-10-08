import React, { useEffect } from 'react'
import PrintCardEvenes from '../components/PrintCardEvenes'
import VintageCard from '../components/VintageCard'
import Oratory from "../assets/3.png";
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from '../redux/actions/ClientActions';


function Drift() {
  const client = useSelector((state) => state.client.client);

  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  useEffect(() => {
    if(client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
  
    }, [dispatch]);
  return (
    <>
    <div data-aos="fade-up" className="w-full">
        <VintageCard
          title="DRIFT"
          imageUrl={Oratory}
          buttonText="Learn More"
          backgroundColor="#f2d22e"
          fontFamily="'Bebas Neue', sans-serif"
          hoverText="Drift is a modern amphitheater where attendees enjoy seated performances with tickets, ensuring clear views and excellent acoustics. It caters to audiences seeking a comfortable, immersive experience for live performances like orchestras, plays, and musical shows. The structured seating offers an orderly yet intimate setting for focused engagement. Drift is ideal for those who prefer a well-organized environment while enjoying high-quality entertainment."
          applyHover={true}
        />
      </div>
    <PrintCardEvenes id={3}/>
    </>

   

  )
}

export default Drift