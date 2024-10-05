import Aos from 'aos';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../redux/actions/eventsAction';
import PrintCardEvenes from '../components/PrintCardEvenes';
import VintageCard from '../components/VintageCard';
import Shows from "../assets/4.png";
import { loadClient } from '../redux/actions/clientActions';


function AllEvents() {
  const client = useSelector((state) => state.client);

  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();
  console.log(events);
  


  useEffect(() => {
  window.scrollTo(0, 0);
    Aos.init({ duration: 500 });

  }, []);
  useEffect(() => {
    if(client.firstName == ""){
      dispatch(loadClient());
    }
  
    }, [dispatch]);
  

  useEffect(() => {
    if (!events.length || events[0].name === '') {
      dispatch(loadEvents());
    }
  }, [dispatch, events]);
  

  return (
   
    <>
    <div data-aos="fade-up" className="w-full">
        <VintageCard
          title=" ALL EVENTS"
          imageUrl={Shows}
          buttonText="Explore"
          backgroundColor="#f20505"
          fontFamily="'Bebas Neue', sans-serif"
          hoverText="Is the central hub where all upcoming events hosted at the cultural center are displayed. Whether it's concerts, conventions, or theatrical performances, this space offers a comprehensive view of what’s happening across all venues, including Crest, Tide, and Drift. Visitors can browse through a diverse range of entertainment options, with details on each event, schedules, and ticketing information. It's the perfect spot to plan your next cultural experience, ensuring you don’t miss out on any of the exciting activities available at the center."
          applyHover={true}
       />
      </div>
    <PrintCardEvenes id={0}/>
    </>
  );
}

export default AllEvents;
