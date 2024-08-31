import React from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="login-center">
            <a href="index.html"> 
                <img className="login-img" src="img/ocp.png" alt="OCP Logo" />
            </a>
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
