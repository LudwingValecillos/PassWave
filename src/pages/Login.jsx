import { useEffect, useState } from "react";
import LabelInput from "../components/LabelInput";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
import EmailInput from "../components/EmailInput";
// import Image from "next/image"

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateAngle = (arrowPosition) => {
    const deltaX = mousePosition.x - arrowPosition.x;
    const deltaY = mousePosition.y - arrowPosition.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convierte de radianes a grados
  };

  const arrowPositions = [
    { x: window.innerWidth / 2, y: window.innerHeight * 0.1 },
    { x: window.innerWidth / 2, y: window.innerHeight * 0.85 },
    { x: window.innerWidth * 0.8, y: window.innerHeight / 2 },
    { x: window.innerWidth * 0.2, y: window.innerHeight / 2 },
    { x: window.innerWidth * 0.9, y: window.innerHeight * 0.1 },
    { x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 },
    { x: window.innerWidth * 0.1, y: window.innerHeight * 0.85 },
    { x: window.innerWidth * 0.9, y: window.innerHeight * 0.85 },
    { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
    { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3 },
    { x: window.innerWidth * 0.2, y: window.innerHeight * 0.7 },
    { x: window.innerWidth * 0.8, y: window.innerHeight * 0.7 },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative flex flex-col md:flex-row h-[600px] md:h-[500px]">
          {/* Login Form */}
          <div
            className={`absolute inset-0 w-full md:w-1/2 p-8 transition-all duration-500 ease-in-out ${
              isLoginActive
                ? "translate-x-0 opacity-100 z-10"
                : "translate-x-full opacity-0 z-0"
            }`}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <LabelInput name="username" title="Username" />
              </div>
              <div className="space-y-2">
                <PasswordInput name="password" title="Password" />
              </div>
              <button className="w-full" type="submit">
                Login
              </button>
            </form>
          </div>

          {/* Signup Form */}
          <div
            className={`absolute inset-0 w-full md:w-1/2 p-8 transition-all duration-500 ease-in-out ${
              isLoginActive
                ? "translate-x-full opacity-0 z-0"
                : "translate-x-0 opacity-100 z-10"
            } md:translate-x-full`}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <LabelInput name="firstname" title="Firstname" />
              </div>
              <div className="space-y-2">
                <LabelInput name="lastname" title="Lastname" />
              </div>
              <div className="space-y-2">
                <EmailInput name="email" title="Email" />
              </div>
              <div className="space-y-2">
                <PasswordInput name="password" title="Password" />
              </div>
              <div className="space-y-2">
                <PasswordInput
                  name="confirmpassword"
                  title="Confirm Password"
                />
              </div>
              <button className="w-full" type="submit">
                Sign Up
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div
            className={`absolute inset-y-0 w-full md:w-1/2 transition-transform duration-500 ease-in-out ${
              isLoginActive ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <a href="#" className="group relative block bg-black">
              <img
                alt=""
                src="https://i.ibb.co/H4BPdz3/collage-Login.jpg"
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
              />

              <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                  Wave Company
                </p>

                <p className="text-xl font-bold text-white sm:text-2xl">
                Where every wave is a new cultural experience.
                </p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white">
                    Welcome to WaveCompany! 🎶✨ Here you can access your account to discover everything our cultural center has to offer. If you are not yet part of our community, register in a few simple steps and start enjoying our events, workshops and exclusive activities. Log in with your email and password, or create a new account if it's your first time. We are waiting for you to experience culture in every wave! 🌊
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="text-center p-4 bg-gray-50 relative z-50">
  <button variant="link" onClick={toggleForm}>
    {isLoginActive
      ? "Need an account? Sign Up"
      : "Already have an account? Login"}
  </button>
</div>
      </div>
      {arrowPositions.map((position, index) => {
        const arrowAngle = calculateAngle(position);
        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: position.x,
              top: position.y,
              transform: `translate(-50%, -50%) rotate(${arrowAngle}deg)`,
              width: "150px", // Cambia según sea necesario
              height: "150px", // Cambia según sea necesario
              backgroundImage:
                "url('https://png.pngtree.com/png-vector/20230430/ourmid/pngtree-right-arrow-vector-png-image_6745379.png')", // Cambia a la ruta de tu flecha
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        );
      })}
    </div>
  );
};

export default Login;
