import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CardEvent from "../components/CardEvent";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from '../redux/actions/ClientActions';

const Events = () => {
  const client = useSelector((state) => state.client.client);

  useEffect(() => {
  window.scrollTo(0, 0);

    AOS.init({ duration: 500 });
    
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if(client.firstName == "" && localStorage.getItem("token") !== null) {
      dispatch(loadClient());
    }
  
    }, [dispatch]);
  return (
    <div className="flex flex-wrap gap-4 px-2 justify-center">
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} data-aos="fade-up">
          <CardEvent title={`Event ${i + 1}`} date="2024-09-01" />
        </div>
      ))}
    </div>
  );
};

export default Events;
