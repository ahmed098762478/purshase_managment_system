import React from 'react'
// import '../css/login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="center">
        <a href="index.html"> <img className="img" src="img/ocp.png" alt="image" /></a>
            <h1>login</h1>
            <form action="" method="post">
                <div className="txt_field">
                    <input type="text" required />
                    <label>username</label>
                </div>

                <div className="txt_field">
                    <input type="password" required />
                    <label>password</label>
                </div>
                <div className="pass">
                    Forgot password
                </div>
                <input type="submit" value="login" />
            </form>
        </div>
    )
}

export default Login