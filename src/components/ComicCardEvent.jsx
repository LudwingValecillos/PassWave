import React from "react";

// Importamos los íconos de Lucide React
import { Calendar, Ticket, Star, DollarSign } from "lucide-react";

function ComicCardEvent(props) {
  return (
    <article className="w-[500px] h-[600px] flex flex-col justify-between rounded-3xl p-6 bg-yellow-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] duration-300 border-black border-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="relative">
        <img 
          alt={props.title} 
          src={props.img} 
          className="h-60 w-full object-cover rounded-2xl border-black border-4" 
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white font-bold py-2 px-4 rounded-full transform rotate-12 border-black border-2">
          New!
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <h2 className="text-2xl font-extrabold text-center bg-white rounded-full py-2 border-black border-4 transform -rotate-2">
          {props.title}
        </h2>

        <div className="flex items-center justify-center gap-2 bg-white rounded-full py-2 border-black border-2 transform rotate-1">
          <Calendar className="h-6 w-6 text-red-500" />
          <span className="font-bold">Next show: {props.date}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-300 rounded-xl p-3 border-black border-2 transform -rotate-3">
          <Ticket className="h-8 w-8 text-blue-700 mx-auto" />
          <p className="text-center font-bold mt-2">Tickets</p>
          <p className="text-center text-lg font-extrabold">{props.quotas}</p>
        </div>

        <div className="bg-yellow-300 rounded-xl p-3 border-black border-2 transform rotate-3">
          <Star className="h-8 w-8 text-yellow-700 mx-auto" />
          <p className="text-center font-bold mt-2">Artists</p>
          <p className="text-center text-lg font-extrabold">{props.artists}</p>
        </div>

        <div className="bg-green-300 rounded-xl p-3 border-black border-2 transform -rotate-3">
          <DollarSign className="h-8 w-8 text-green-700 mx-auto" />
          <p className="text-center font-bold mt-2">Price</p>
          <p className="text-center text-lg font-extrabold">${props.price}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-red-500 hover:bg-red-600 text-white font-extrabold py-3 px-6 rounded-full text-lg border-black border-4 transform transition-transform duration-200 hover:scale-105">
          Get Tickets Now!
        </button>
      </div>
    </article>
  );
}

export default ComicCardEvent;