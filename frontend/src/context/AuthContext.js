import { createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)
    let [authType, setAuthType] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {

        let minutes = 1000 * 60 
        let currentLocalStorage = localStorage.getItem('authTokens');
        
        if (currentLocalStorage && authType==="Manual") {

            const currentTokens = JSON.parse(currentLocalStorage);
            const refreshToken = currentTokens.refresh;

            if (loading){
                updateToken(refreshToken)
            }

            const interval = setInterval( () => {updateToken(refreshToken)}, minutes * 4);

            return () => clearInterval(interval);

        } else {
            // navigate("/login");
            return;
        }


    }, [authTokens, loading, navigate]);


    const loginUser = async (e )=>{

        let response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            setAuthType("Manual")
            navigate("/")
        }else{
            alert('Wrong LogIn')
        }
    }

    const logoutUser = async ()=>{

        let resetUser = () =>{
            setAuthToken(null);
            setUser(null);
            localStorage.removeItem("authTokens");
            navigate("/login");
        }

        if (authType==="Manual"){

            let response = await fetch('http://localhost:8000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${authTokens.access}`
                },
                
                body: JSON.stringify({refresh_token: authTokens.refresh })
            });
        
            if (response.status === 200){
                resetUser()
                // setAuthToken(null);
                // setUser(null);
                // localStorage.removeItem("authTokens");
                // navigate("/login");
            }else{
                console.log('Wrong LogOut')
            }
        }else if (authType==="Google"){
            resetUser()
        }     
    }

    const updateToken = async (refreshToken) => {

        try {
            let response = await fetch('http://localhost:8000/auth/token/refresh/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (response.status === 200) {
                let data = await response.json();
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthToken(data);
                setUser(jwtDecode(data.access));
            } else {
                logoutUser();
                // throw new Error('Failed to refresh token');
            }

            if (loading){
                setLoading(false)
            }

        } catch (error) {
            logoutUser();
    }
};

    const signInUser = async (e) =>{
        try {
            let response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value})
            });

            // let data = await response.json()

            if (response.status === 201){
                alert('User created')
            }else{
                alert('Wrong LogIn')
            }

            } catch (error) {
                console.log(error);
    }
    };

    const googleLogin = (googleToken) =>{
     
        setAuthToken(googleToken.credential)
        let googleUser = jwtDecode(googleToken)
        setUser(googleUser);
        localStorage.setItem('authTokens', JSON.stringify(googleToken))
        setAuthType("Google")
        navigate("/")
        console.log(googleUser.email)

        let e = {
            "email": googleUser.email,
            "password": googleUser.sub+googleUser.given_name
        }

        try{

            fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({'email': e.email, 'password': e.password})
            });

        }catch (error){

            console.log(error);
        }   
       }

       
    let contextData = {
        user: user,
        loginUser:loginUser,
        logoutUser: logoutUser,
        signInUser: signInUser,
        googleLogin: googleLogin,
        AuthContext: AuthContext
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
    
}
