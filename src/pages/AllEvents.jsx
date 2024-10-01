import Aos from 'aos';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../redux/actions/eventsAction';

function AllEvents() {

  const events = useSelector((state) => state.events.events || []);
  console.log(events);
  const dispatch = useDispatch();

  

  useEffect(() => {
    Aos.init({ duration: 500 });
    dispatch(loadEvents() )
  }, [dispatch]);
  return (
    <div>
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <h1>{event?.name}</h1>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
}

export default AllEvents