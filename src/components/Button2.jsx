import React from "react";

function Button2({ title, isActive, onClick }) {
  return (
    <a
      className="group relative inline-block focus:outline-none focus:ring"
      onClick={onClick} // Asigna la función onClick aquí
    >
      <span
        className={`absolute inset-0 transition-transform rounded-3xl
        ${isActive ? "translate-x-1 translate-y-1" : "group-hover:translate-x-1 group-hover:translate-y-1"} bg-black`}
      ></span>

      <span
        className="relative inline-block border-2 border-current px-6 py-2 font-bold tracking-widest rounded-3xl overflow-hidden"
      >
        <span
          className={`relative inline-block transition-transform 
          ${isActive ? "translate-x-1 translate-y-1" : "group-hover:translate-x-1 group-hover:translate-y-1"}`}
        >
          <strong className="text-white">{title}</strong>
        </span>
      </span>
    </a>
  );
}

export default Button2;

