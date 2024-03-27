import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"

const SigninPage = () =>{
    
    const {signInUser} = useContext(AuthContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser(e);
    };

    return (
        <div>
        <h3>Sign up</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Enter Email"/><br />
                <input type="password" name="password" placeholder="Enter Password"/><br />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default SigninPage