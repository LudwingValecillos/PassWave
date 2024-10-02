import React from "react";

function Button2(props) {
  return (
    <a
      className="group relative inline-block focus:outline-none focus:ring "
      href="#"
    >
      <span className="absolute inset-0 translate-x-0 translate-y-0 bg-black transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 rounded-3xl"></span>

      <span className="relative inline-block border-2 border-current px-8 py-3 font-bold tracking-widest rounded-3xl">

       <strong className="text-white">{props.title}</strong> 
      </span>
    </a>
  );
}

export default Button2;
