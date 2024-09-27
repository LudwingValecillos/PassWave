import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

const Header = () => {
  return (
    <header className="bg-white z-50 shadow-md border-b-2 border-gray-200 sticky top-0 mb-2">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12 ">
            <a className=" flex justify-center items-center gap-5" href="#">
              <img src="/src/assets/logito.jpg" alt="" className="h-12 " />
              <div className="relative inline-block">
                <h1 className="text-3xl font-lobster">WaveCenter</h1>
                <span className="absolute rounded-3xl left-0 bottom-0 w-full h-1 bg-gradient-to-r from-[#05C7F2] via-[#F2D22E] to-[#F20505]"></span>
              </div>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <Nav />
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="#"
                >
                  Login
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="#"
                  >
                    <Link to="/register">

                    Register
                </Link>

                  </a>
                </div>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
