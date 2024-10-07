import React from 'react'

function Darkened(props) {
  return (
    <a href="#" className="group relative block bg-black w-1/3 h-[500px]   border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
  <img
    alt=""
    src={props.src}
    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-3xl"
  />

  <div className="relative p-4 sm:p-6 lg:p-8">

    <p className="text-xl font-bold uppercase text-center mx-20 tracking-widest bg-black text-white border-b-white border-b-4 border rounded-3xl">{props.title}</p>

    <div className="mt-32 sm:mt-48 lg:mt-64">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p className="text-sm text-white">
          {
            props.text}
        </p>
      </div>
    </div>
  </div>
</a>
  )
}

export default Darkened