import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"

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
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage