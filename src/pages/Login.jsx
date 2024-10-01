import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import LabelInput from '../components/LabelInput';
import PasswordInput from '../components/PasswordInput';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in:', { username, password });
    };

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Función para calcular el ángulo en función de la posición de la flecha y la posición del mouse
    const calculateAngle = (arrowPosition) => {
        const deltaX = mousePosition.x - arrowPosition.x;
        const deltaY = mousePosition.y - arrowPosition.y;
        return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convierte de radianes a grados
    };

    // Posiciones fijas de las flechas
    const arrowPositions = [
        { x: window.innerWidth / 2, y: window.innerHeight * 0.2 }, // Primera flecha
        { x: window.innerWidth / 2, y: window.innerHeight * 0.8 }, // Segunda flecha
        { x: window.innerWidth * 0.8, y: window.innerHeight / 2 }, // Tercera flecha
        { x: window.innerWidth * 0.2, y: window.innerHeight / 2 }, // Cuarta flecha
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.1 }, // Quinta flecha
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 }, // Sexta flecha
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.9 }, // Séptima flecha
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.9 }, // Octava flecha
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 }, // Novena flecha
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 }, // Décima flecha
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7 }, // Undécima flecha
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.7 }, // Duodécima flecha
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }, // Decimotercera flecha (centro)
        { x: window.innerWidth * 0.4, y: window.innerHeight * 0.2 }, // Decimocuarta flecha
        { x: window.innerWidth * 0.6, y: window.innerHeight * 0.2 }, // Decimoquinta flecha
        { x: window.innerWidth * 0.4, y: window.innerHeight * 0.8 }, // Decimosexta flecha
        { x: window.innerWidth * 0.6, y: window.innerHeight * 0.8 }, // Decimoséptima flecha
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 }, // Decimoctava flecha
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3 }, // Decimonovena flecha
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.7 }, // Vigésima flecha
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.7 }, // Vigésima primera flecha
    ];
    

    return (
        <div className="relative overflow-hidden h-screen">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 opacity-70"></div>
            <div className="absolute inset-0 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?color')", opacity: 0.2 }}></div>
            <div className="flex items-center justify-center h-full relative z-10">
                <div className="bg-[#f5f5f5c9] rounded-lg  shadow-lg p-8 w-full max-w-xl text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-[#f5f5f5fa]">
                    <h1 className="text-3xl font-bold mb-6">Welcome to the Cultural Center</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                           
                            <LabelInput name="username" title="Username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <PasswordInput name="password" title="Password" onChange={(e) => setPassword(e.target.value)} />
                        
                        </div>
                        <button type="submit" className="bg-yellow-500 text-white font-semibold py-2 rounded-lg w-full hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
                            Log In
                        </button>
                    </form>
                    <p className="mt-4 text-red-600">
                        Don't have an account? <a href="#" className="underline text-blue-500">Sign up here</a>
                    </p>
                </div>
            </div>

            {/* Flechas que apuntan al mouse */}
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
                            width: '150px', // Cambia según sea necesario
                            height: '150px', // Cambia según sea necesario
                            backgroundImage: "url('https://png.pngtree.com/png-vector/20230430/ourmid/pngtree-right-arrow-vector-png-image_6745379.png')", // Cambia a la ruta de tu flecha
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Login;
