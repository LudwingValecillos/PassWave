import React, { useEffect, useState } from "react";
import { Calendar, Ticket, Star, DollarSign, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const SketchCardEvent = React.memo(({ title, img, date, quotas, artists, price, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Función para manejar el clic en el corazón
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Obtener la lista de favoritos existente del localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!isFavorite) {
      // Si no es favorito, añadir el ID
      favorites.push(id);
    } else {
      // Si es favorito, eliminar el ID
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return; // Salir si se elimina un favorito
    }
    
    // Guardar la lista actualizada de favoritos en localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    // Comprobar si el ID está en los favoritos al cargar el componente
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  return (
    <article className="w-[400px] h-[550px] flex flex-col justify-between p-6 bg-[#F2BB13] hover:bg-[#f2ba13a6] border-4 duration-300 hover:scale-105 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="relative">
        <img
          alt={title}
          src={img}
          className="h-56 w-full object-cover rounded-md border-4 border-black"
        />
        <div
          className="absolute -top-5 -right-3 bg-white text-black font-bold py-1 px-3 text-xl rounded-full transform rotate-12 border-2 border-black "
          onClick={handleFavoriteToggle}
        >
          <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 stroke-[5] duration-100 scale-125' : 'text-gray-500 duration-100'} m-1`} />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <h2
          className="text-xl font-bold text-center text-black bg-white rounded-full py-2 border-2 border-black duration-100 hover:bg-black hover:text-white"
        >
          {title}
        </h2>

        <div
          className="flex items-center justify-center gap-2 text-black bg-white rounded-full py-2 border-2 border-black duration-100 hover:bg-black hover:text-white"
        >
          <Calendar className="h-4 w-4 stroke-[3]" />
          <span className="text-sm font-bold">{date}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-white rounded-md p-3 border-2 border-black">
          <Ticket className="h-6 w-6 text-black mx-auto stroke-[2]" />
          <p className="text-center text-black text-xs mt-1 font-bold">Tickets</p>
          <p className="text-center text-black font-bold">{quotas}</p>
        </div>

        <div className="bg-white rounded-md p-3 border-2 border-black">
          <Star className="h-6 w-6 text-black mx-auto stroke-[2]" />
          <p className="text-center text-black text-xs mt-1 font-bold">Guests</p>
          <p className="text-center text-black font-bold">{artists}</p>
        </div>

        <div className="bg-white rounded-md p-3 border-2 border-black">
          <DollarSign className="h-6 w-6 text-black mx-auto stroke-[2]" />
          <p className="text-center text-black text-xs mt-1 font-bold">Price</p>
          <p className="text-center text-black font-bold">${price.toLocaleString()}</p>
        </div>
      </div>

      <div className="my-4 flex justify-center">
        <Link to={`/event/${id}`} className="w-full flex justify-center items-center bg-black text-white py-2 rounded-3xl duration-100 hover:bg-white hover:text-black hover:border-2 hover:border-black hover:shadow-2xl hover:font-bold">
          See more
        </Link>
      </div>
    </article>
  );
});

export default SketchCardEvent;
