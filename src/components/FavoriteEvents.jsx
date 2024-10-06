import React, { useEffect, useState } from 'react';
import PrintCardEvenes from './PrintCardEvenes';
import { useSelector } from 'react-redux';

function FavoriteEvents() {
  window.scrollTo(0, 0);
  const events = useSelector((state) => state.events.events || []);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []); 

  const filteredFavorites = events.filter(event => favorites.includes(event.id));

  return (
    <>
      <PrintCardEvenes favorites={filteredFavorites} />
    </>
  );
}

export default FavoriteEvents;
