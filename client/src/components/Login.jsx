import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');  
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img 
                className="w-32 mb-8 cursor-pointer" 
                src="/img/ocp.png" 
                alt="OCP Logo" 
                onClick={handleLogoClick} // Appel de la fonction de redirection
            />
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
