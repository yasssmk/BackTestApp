import React, { useContext, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import AuthContext from "../context/AuthContext"
import GoogleLogin from "../components/GoogleLoginButton";

const LoginPage = () =>{
    
    const {user, loginUser} = useContext(AuthContext);
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(e);
    };

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Enter Email"/><br />
                <input type="password" name="password" placeholder="Enter Password"/><br />
                <button type="submit">Login</button>
            </form>
            <GoogleLogin/>
        </div>
    )
}

export default LoginPage