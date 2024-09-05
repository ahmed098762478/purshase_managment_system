import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, motDePasse: password }),
            });

            console.log("Response: ", response); // Ajoutez ce log pour vérifier la réponse

            if (response.ok) {
                navigate('/admin');
            } else {
                const errorText = await response.text();
                setErrorMessage(errorText);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    // Fonction de validation de l'email
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError('Ceci ne correspond pas au format d\'un email');
        } else {
            setEmailError('');
        }
    };

    // Condition pour les classes des champs
    const inputClass = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        emailError ? 'border-red-500' : 'border-gray-300'
    }`;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <motion.img 
                className="w-40 mb-8 cursor-pointer" 
                src="/img/ocp.png" 
                alt="OCP Logo" 
                onClick={handleLogoClick}  
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

            {errorMessage && (
                <motion.div 
                    className="bg-red-300 text-red-700 p-4 rounded-lg mb-4 w-full max-w-sm text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {errorMessage}
                </motion.div>
            )}

            <motion.form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1, delay: 0.4 }}
            >
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value); // Validation en temps réel
                        }}
                        required 
                        className={inputClass}
                    />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-2">{emailError}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errorMessage ? 'border-red-500' : 'border-gray-300'
                        }`}
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
