import React from 'react';
import { useNavigate } from 'react-router-dom';
// import '../css/login.css'

const Login = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');  
    };

    return (
        <div className="login-center">
            <img 
                className="login-img" 
                src="/img/ocp.png" 
                alt="OCP Logo" 
                onClick={handleLogoClick} // Appel de la fonction de redirection
                style={{ cursor: 'pointer' }} // Changer le curseur pour indiquer qu'il est cliquable
            />
            <h1>Login</h1>
            <form action="" method="post">
                <div className="login-txt_field">
                    <input type="text" required />
                    <label>Username</label>
                </div>
                <div className="login-txt_field">
                    <input type="password" required />
                    <label>Password</label>
                </div>
                <div className="login-pass">
                    Forgot password
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
