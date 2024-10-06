import React, { useEffect, useState } from 'react';
import PrintCardEvenes from './PrintCardEvenes';
import { useSelector } from 'react-redux';

function FavoriteEvents() {
  // Obtener la lista completa de eventos desde el estado de Redux
  const events = useSelector((state) => state.events.events || []);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Cargar los IDs de los favoritos desde el localStorage al montar el componente
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []); // Solo se ejecuta al montar el componente

  // Filtrar los eventos favoritos usando los IDs almacenados
  const filteredFavorites = events.filter(event => favorites.includes(event.id));

  return (
    <>
      {/* Pasar los eventos filtrados a PrintCardEvenes */}
      <PrintCardEvenes favorites={filteredFavorites} />
    </>
  );
}

export default FavoriteEvents;
