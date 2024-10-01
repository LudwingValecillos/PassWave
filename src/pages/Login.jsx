
import React, { useState } from 'react';
import '../styles/login.css'; 
import BackgroundWithArrows from '../components/BackgroundWithArrows';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        console.log('Logging in:', { username, password });
    };

    return (

        
        <div className="relative overflow-hidden h-screen">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 opacity-70"></div>
            <div className="absolute inset-0 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?color')", opacity: 0.2 }}></div>
            <div className="flex items-center justify-center h-full relative z-10">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <h1 className="text-blue-600 text-3xl font-bold mb-6">Welcome to the Cultural Center</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-green-700 mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="border border-blue-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-green-700 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border border-blue-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                                placeholder="Enter your password"
                            />
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
        </div>

    );
};

export default Login;
