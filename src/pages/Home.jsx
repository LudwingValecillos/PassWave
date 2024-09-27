import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CardEvent from "../components/CardEvent";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

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

export default Home;
