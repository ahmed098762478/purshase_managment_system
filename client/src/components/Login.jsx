import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');  
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <motion.img 
                className="w-40 mb-8 cursor-pointer" 
                src="/img/ocp.png" 
                alt="OCP Logo" 
                onClick={handleLogoClick} // Appel de la fonction de redirection
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
            />
            <motion.h1 
                className="text-3xl font-bold mb-6" 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.2 }}
            >
                Login
            </motion.h1>
            <motion.form 
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1, delay: 0.4 }}
            >
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input 
                        id="username" 
                        type="text" 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        id="password" 
                        type="password" 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <a href="#" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
                </div>
                <button 
                    type="submit" 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Login
                </button>
            </motion.form>
        </div>
    );
};

export default Login;
