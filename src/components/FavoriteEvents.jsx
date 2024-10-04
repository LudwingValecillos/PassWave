// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'

// const EventCard = ({ event, onRemove }) => (
//   <div className="bg-white rounded-lg shadow-xl overflow-hidden border-black border-[1px] mb-4">
//     <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
//     <div className="p-4">
//       <h3 className="text-xl font-bold mb-2">{event.title}</h3>
//       <p className="text-gray-600 mb-2">{event.date}</p>
//       <p className="mb-4">{event.description}</p>
//       <button
//         onClick={() => onRemove(event.id)}
//         className="w-full bg-black text-white py-2 rounded-3xl duration-100 hover:bg-white hover:text-black hover:border-2 hover:border-black hover:shadow-2xl hover:font-bold"
//       >
//         Remove from Favorites
//       </button>
//     </div>
//   </div>
// )

// export default function FavoriteEvents() {
// //   const [favoriteEvents, setFavoriteEvents] = useSelector(state => state.events.events.filter(event => event.id === localStorage.getItem('favoriteEvents')))
//   console.log(favoriteEvents);
  

//   const removeEvent = (id) => {
//     setFavoriteEvents(favoriteEvents.filter(event => event.id !== id))
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#F2F2F2] p-4" data-aos="flip-left">
//       <div className="w-full z-10 max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden border-black border-[1px]" data-aos="flip-right">
//         <div className="p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Favorite Events</h2>
//           {favoriteEvents.length > 0 ? (
//             favoriteEvents.map(event => (
//               <EventCard key={event.id} event={event} onRemove={removeEvent} />
//             ))
//           ) : (
//             <p className="text-center text-gray-600">No favorite events yet.</p>
//           )}
//         </div>
//         <div className="text-center p-4 bg-gray-100 relative z-50 border-t-black border-t-2">
//           <button className="text-blue-600 hover:underline">
//             Discover More Events
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }