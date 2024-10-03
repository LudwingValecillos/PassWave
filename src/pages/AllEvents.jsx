import Aos from 'aos';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../redux/actions/eventsAction';
import CardEvent from '../components/CardEvent';
import ComicCardEvent from '../components/ComicCardEvent';
import SketchCardEvent from '../components/SketchCardEvent';
import { Link } from 'react-router-dom';

function AllEvents() {
  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();
  console.log(events);
  
  
  
  useEffect(() => {
    Aos.init({ duration: 500 });
    dispatch(loadEvents());
  }, [dispatch]);
  
  return (
    <div className='flex flex-wrap justify-center items-center gap-12 mt-5' data-aos="fade-up"> 
    <img src="./public/bElectronica5.jpg" alt="PRUEBAAA" />

      {events?.map((event, index) => (
        <div key={event.id} data-aos="fade-up">
          <Link to={`/event/${event.id}`} key={event.id}>
          <SketchCardEvent title={event.name} img={event.images[0]} date={event.date} quotas={event.ticketsAvailable} artists={event.artists.length} price={event.ticketPrice} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AllEvents;
