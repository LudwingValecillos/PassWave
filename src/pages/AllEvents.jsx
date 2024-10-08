import Aos from 'aos';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../redux/actions/eventsAction';
import PrintCardEvenes from '../components/PrintCardEvenes';
import VintageCard from '../components/VintageCard';
import Shows from "../assets/4.png";
import { loadClient } from '../redux/actions/ClientActions';


function AllEvents() {
  const client = useSelector((state) => state.client.client);

  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();
  


  useEffect(() => {
  window.scrollTo(0, 0);
    Aos.init({ duration: 500 });

  }, []);
  useEffect(() => {
    if(client.firstName == "" && localStorage.getItem("token") !== null) {
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
          hoverText="This is the central hub displaying all upcoming events at the cultural center. Whether concerts, conventions, or theatrical performances, it provides a comprehensive view of activities across venues like Crest, Tide, and Drift. Visitors can explore a variety of entertainment options with event details, schedules, and ticketing information. It’s the perfect spot to plan your next cultural experience and ensure you don’t miss any exciting activities at the center."
          applyHover={true}
       />
      </div>
    <PrintCardEvenes id={0}/>
    </>
  );
}

export default AllEvents;
