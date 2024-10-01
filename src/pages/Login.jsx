// src/components/Login.jsx
import React, { useState } from 'react';
import '../styles/login.css'; 
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in:', { username, password });
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-teal-500 relative overflow-hidden">
            {/* Subimos el contenedor del login más arriba */}
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-10 z-10 transform translate-y-[-100px]">
                <h1 className="text-3xl font-bold text-center text-teal-800 mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-teal-600 text-white font-semibold py-2 rounded-lg w-full hover:bg-teal-700 transition duration-300">
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-gray-600 text-center">
                    Don’t have an account?
                    <button className="text-teal-600 underline" onClick={() => window.location.href='/register'}>
                        Sign up here
                    </button>
                </p>
            </div>

            {/* Círculos animados con los colores solicitados */}
            <div className="circle small shade1 blue"></div>
            <div className="circle medium shade2 teal"></div>
            <div className="circle large shade3 yellow"></div>
            <div className="circle xlarge shade4 pink"></div>
            <div className="circle xxlarge shade5 red"></div>
        </section>
    );
};

export default Login;
