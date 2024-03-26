import { createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    const navigate = useNavigate()

    useEffect(() => {

        let minutes = 1000 * 60 
        let currentLocalStorage = localStorage.getItem('authTokens');
        
        if (currentLocalStorage) {

            const authTokens = JSON.parse(currentLocalStorage);
            const accessToken = authTokens.access;
            const refreshToken = authTokens.refresh;

            const interval = setInterval( async ()=>{

                let response = await fetch('http://localhost:8000/auth/token/refresh/', {
                    method: 'POST',
                    headers:{
                       'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({ refresh: refreshToken })
                })
                   

                if (response.status === 200) {
                    let data = await response.json()
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    setAuthToken(data)
                    setUser(jwtDecode(data.access))                        
                        
                } else {
                    logoutUser()
                    // throw new Error('Failed to refresh token')
                    
                }
        
            }, 2000 );

            return () => clearInterval(interval);

        } else {
            navigate("/login");
            return;
        }


    }, [authTokens, navigate]);


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
            navigate("/")
        }else{
            alert('Wrong LogIn')
        }
    }

    const logoutUser = async ()=>{
        let response = await fetch('http://localhost:8000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authTokens.access}`
            },
            
            body: JSON.stringify({refresh_token: authTokens.refresh })
        });

        if (response.status === 200){
            setAuthToken(null);
            setUser(null);
            localStorage.removeItem("authTokens");
            navigate("/login");
        }else{
            console.log('Wrong LogOut')
        }
    }
         
       
    let contextData = {
        user: user,
        loginUser:loginUser,
        logoutUser: logoutUser,
        AuthContext: AuthContext
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
    }

