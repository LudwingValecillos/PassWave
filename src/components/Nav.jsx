import React from 'react'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } },
  pressed: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

function Nav() {
  return (
    <nav aria-label="Global" className="hidden md:block nav-container">
      <ul className="flex flex-wrap justify-center font-bold gap-6 md:gap-8 lg:gap-12">
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <Link
              to="/concerts"
              className="bg-[#04bf9d] text-white px-4 py-2 rounded-full shadow-lg transition"
            >
              CONCERTS
            </Link>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <Link
              to="/expositions"
              className="bg-[#05c7f2] text-white px-4 py-2 rounded-full shadow-lg transition"
            >
              EXPOSITIONS
            </Link>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <Link
              to="/oratory"
              className="bg-[#f2d22e] text-white px-4 py-2 rounded-full shadow-lg transition"
            >
              ORATORY
            </Link>
          </motion.div>
        </li>
        <li>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <Link
              to="/shows"
              className="bg-[#f20505] text-white px-4 py-2 rounded-full shadow-lg transition"
            >
              SHOWS
            </Link>
          </motion.div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
