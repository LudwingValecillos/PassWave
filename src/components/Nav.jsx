import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import UserMenu from "./UserMenu"; // Importamos el menú de usuario
import { useSelector } from "react-redux";
import Button2 from "./Button2";
import Buttonw from "./Buttonw";
import logoOk from '../assets/logoOk.png';


const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  pressed: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

function Nav() {
  const [showUserMenu, setShowUserMenu] = useState(false); // Estado para mostrar menú
  const status = useSelector((state) => state.client.status);
  const location = useLocation(); // Obtenemos la ruta actual
  const userMenuRef = useRef(null); // Ref para el menú de usuario

  const toggleMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleUserIconClick = () => {
    toggleMenu(); // Alternar menú de usuario
  };

  const handleClickOutside = (event) => {
    // Si se hace clic fuera del menú de usuario
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    // Añadir el event listener al hacer click
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Limpiar el event listener al desmontar el componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav aria-label="Global" className="hidden md:block nav-container relative">
      <ul className="flex flex-wrap justify-center items-center font-bold gap-6 md:gap-8 lg:gap-12">
        <li>
          <Link to="/crest" onClick={() => setShowUserMenu(false)}>
            <Button2
              title="CREST"
              isActive={location.pathname.startsWith("/crest")}
            />
          </Link>
        </li>
        <li>
          <Link to="/tide">
            <Button2
              title="TIDE"
              isActive={location.pathname.startsWith("/tide")}
            />
          </Link>
        </li>
        <li>
          <Link to="/drift">
            <Button2
              title="DRIFT"
              isActive={location.pathname.startsWith("/drift")}
            />
          </Link>
        </li>
            {/* Logo section */}
            <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to="/home" className="flex justify-center items-center gap-5">

              <img src={logoOk} alt="Logo" className="h-28" />

              {/* <div className="relative inline-block">
                <img
                  src="/src/assets/WaveCen.gif"
                  alt="WaveCenter Logo"
                  className="inline-block w-36 h-auto"
                />
              </div> */}
            </Link>
          </div>
        <li>
          <Link to="/allEvents">
            <Button2
              title="EVENTS"
              isActive={location.pathname.startsWith("/allEvents")}
            />
          </Link>
        </li>
        <li>
          <Link to="/about">
            <Button2
              title="ABOUT"
              isActive={location.pathname.startsWith("/about")}
            />
          </Link>
        </li>
        <li>
          {status === "success" ? (
            <div className="relative" ref={userMenuRef}>
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="pressed"
              >
                <button onClick={handleUserIconClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-12 text-black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
              {showUserMenu && <UserMenu />}{" "}
              {/* Mostramos el menú de usuario */}
            </div>
          ) : (
            <Link to="/login">
              <Buttonw title="Login" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
