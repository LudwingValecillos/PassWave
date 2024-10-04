import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../redux/actions/eventsAction';
import { Link } from 'react-router-dom';
import SketchCardEvent from './SketchCardEvent';
import Aos from 'aos';

function PrintCardEvenes(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const dispatch = useDispatch();
    
    const events = useSelector((state) => {
        const filteredEvents = props.id !== 0
            ? state.events.events.filter((event) => event.place.id == props.id)
            : state.events.events;

        return filteredEvents;
    });

    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    useEffect(() => {
        if (!events.length || events[0].name === '') {
            dispatch(loadEvents());
        }
    }, [dispatch, events]);

    // Debounce para evitar la búsqueda en cada pulsación de tecla
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300 ms de espera

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Filtrar eventos según el término de búsqueda
    const filteredEvents = useMemo(() => {
        return events.filter(event =>
            event.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [events, debouncedSearchTerm]);

    return (
        <div >
          <div className="flex justify-center items-center h-">
          <img src="https://png.pngtree.com/png-vector/20230430/ourmid/pngtree-right-arrow-vector-png-image_6745379.png" alt="" className='w-[200px] rotate-90 ' />

            <input
                type="text"
                placeholder="Search events"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                className=" p-4 w-1/3 h-20 border-2 text-center border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl font-bold"
            />
            <img src="https://png.pngtree.com/png-vector/20230430/ourmid/pngtree-right-arrow-vector-png-image_6745379.png" alt="" className='w-[200px] rotate-90' />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 mt-5" data-aos="fade-up">
                {filteredEvents.map((event) => (
                    <div key={event.id} data-aos="fade-up">
                            <SketchCardEvent
                                title={event.name}
                                img={event.images[0]}
                                date={event.date}
                                quotas={event.ticketsAvailable}
                                artists={event.artists.length}
                                price={event.ticketPrice}
                                id={event.id}
                            />
                       
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrintCardEvenes;
