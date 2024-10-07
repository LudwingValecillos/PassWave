import React, { useEffect } from 'react'
import PrintCardEvenes from '../components/PrintCardEvenes'
import VintageCard from '../components/VintageCard'
import Expositions from "../assets/2.png";
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from '../redux/actions/clientActions';






function Tide() {
  window.scrollTo(0, 0);
  const client = useSelector((state) => state.client.client);

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
          title="TIDE"
          imageUrl={Expositions}
          buttonText="+ Details"
          backgroundColor="#05c7f2"
          fontFamily="'Bebas Neue', sans-serif"
          hoverText="Tide is a versatile convention hall suitable for various events, including trade shows and cultural exhibitions. It provides ample space for stands and caters to vendors and visitors with general ticket sales and open entry. The hall adapts to different configurations, making it ideal for corporate conventions, public expos, and educational fairs. Tide combines functionality and accessibility, making it an excellent venue for large-scale gatherings where business and culture intersect."
          applyHover={true}
       />
      </div>
    <PrintCardEvenes id={1}/>

    </>

  )
}

export default Tide