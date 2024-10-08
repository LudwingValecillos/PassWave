import React from "react";
import { Link } from "react-router-dom";

function Darkened(props) {
  return (
    <Link
      to={props.link}
      className="group relative flex justify-center items-center bg-black w-1/3 h-[500px] border-2 border-grey-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl"
    >
      <img
        alt=""
        src={props.src}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-20 rounded-3xl"
      />

      <div className="relative p-6 sm:p-6 lg:p-10">
        <p className="text-5xl absolute top-36 left-28 font-bold p-3 uppercase text-center mx-28 tracking-widest bg-black text-white border-b-white border-b-4 border rounded-3xl transition-opacity duration-300 group-hover:opacity-0">
          {props.title}
        </p>
        <div>
          <div className="translate-y-8 flex gap-20 flex-col h-full transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-col justify-start">
              <h2 className="text-5xl font-bold text-yellow-400">
                {props.title}
              </h2>

              <h2 className="text-5xl font-bold text-white">{props.type}</h2>
            </div>

            <div className="">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              
                <p className="text-white text-xl p-2 rounded-3xl">
                  {props.text}
                </p>
                <p className="text-white text-xl p-2 rounded-3xl mt-6">
                  {props.text2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Darkened;
