import Aos from 'aos';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../redux/actions/eventsAction';
import CardEvent from '../components/CardEvent';

function AllEvents() {
  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();
  console.log(events);
  

  useEffect(() => {
    Aos.init({ duration: 500 });
    dispatch(loadEvents());
  }, [dispatch]);

  return (
    <div className='flex flex-wrap justify-center items-center gap-6' data-aos="fade-up"> 
      {events?.map((event, index) => (
        <div key={event.id}>
          {/* Usa imageMapper[index] para obtener la ruta de imagen */}
          <CardEvent title={event.name} img={event.images[0]} date={event.date} />
        </div>
      ))}
    </div>
  );
}

export default AllEvents;
