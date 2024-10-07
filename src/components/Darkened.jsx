import React from 'react'
import { Link } from 'react-router-dom'

function Darkened(props) {
  return (
    <Link to={props.link} className="group relative block bg-black w-1/3 h-[500px]   border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
  <img
    alt=""
    src={props.src}
    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-3xl"
  />

  <div className="relative p-4 sm:p-6 lg:p-8">

    <p className="text-2xl font-bold uppercase text-center mx-28 tracking-widest bg-black text-white border-b-white border-b-4 border rounded-3xl">{props.title}</p>

    <div className="mt-20  ">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <h2 className="text-5xl font-bold text-white text-center border-b-4 border-white mx-12 mb-9">{props.type} </h2>
        <p className="text-2xl text-white bg-[#000000a4] p-2 rounded-3xl">
          {
            props.text}
        </p>
        <p className="text-2xl text-white bg-[#000000ab] p-2 rounded-3xl mt-6">
          {
            props.text2}
        </p>
      </div>
    </div>
  </div>
</Link>
  )
}

export default Darkened