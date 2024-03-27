import React, {useContext} from "react";
import  { Link, useNavigate  } from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext);
 
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    return(
        <div>
            <Link to = { user ? '/' : '/login'}>Home</Link>
            <span> | </span>
            { user ? (
                <Link onClick={handleLogout}>Logout</Link>) : (<Link to='/login'>Login</Link>)}
            <span> | </span>
            { user ?  null : (<Link to='/signup'>Sign In</Link>)} 
            
            {user && <p>Hello {user.email} </p>}
            
        </div>
    )
    
}

export default Header