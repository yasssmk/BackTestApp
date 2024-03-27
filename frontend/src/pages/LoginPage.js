import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"
import GoogleLogin from "../components/GoogleLoginButton";

const LoginPage = () =>{
    
    const {loginUser} = useContext(AuthContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(e);
    };


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