import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageComponent = ({ buttonUrl }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        window.location.href = buttonUrl;
    };

    return (
        <div className="flex items-start">
            <motion.img
                src="src/assets/1ticket.png"
                alt="Imagen 1"
                className="w-24"
            />
            <motion.button
                onClick={handleClick}
                className="w-24 p-0 bg-transparent border-none cursor-pointer"
                initial={{ rotate: 0, y: 0 }}
                animate={isHovered ? { rotate: 20, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src="src/assets/2ticket.png"
                    alt="Imagen 2"
                    className="w-full"
                />
            </motion.button>
        </div>
    );
};

export default ImageComponent;
