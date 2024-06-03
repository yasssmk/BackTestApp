import { createContext, useState, useEffect, useContext} from "react";
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"
import DashboardContext from "./DashboardContext";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('')

    const navigate = useNavigate()

    const {clearStates} = useContext(DashboardContext);

    useEffect(() => {

        let minutes = 1000 * 60 
        let currentLocalStorage = localStorage.getItem('authTokens');
        
        if (currentLocalStorage && !user.given_name) {

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


    const loginUser = async (email, password )=>{

        let response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'email': email, 'password': password})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate("/dashboard")
        }else{
            setShowAlert(true);
            setAlertContent('Email or Password is wrong');

            setTimeout(() => {
              setShowAlert(false);
              setAlertContent('');
              navigate("/")
            }, 10000);
        }
    }

    const logoutUser = async ()=>{

        let resetUser = () =>{
            setAuthToken(null);
            setUser(null);
            clearStates();
            localStorage.removeItem("authTokens");
            navigate("/");
        }

        if (!user.given_name){

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
            }else{
                console.log('Wrong LogOut')
            }
        }else if (user.given_name){
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

    const signInUser = async (email, password, first_name, last_name ) =>{
        try {
            let response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({'email': email, 'password': password, 'first_name': first_name, 'last_name': last_name })
            });

            if (response.status === 201){
                console.log('User created')
                setShowAlert(true);
                setAlertContent('Your account has been created successfully.');
                setAlertSeverity('success')

                setTimeout(() => {
                  setShowAlert(false);
                  setAlertContent('');
                  navigate("/")
                }, 2000);
            
            } else if (response.status === 409) {

                console.log('User already exist.')
                setShowAlert(true);
                setAlertContent('This user already exist.');
                setAlertSeverity('warning')

                setTimeout(() => {
                  setShowAlert(false);
                  setAlertContent('');
                }, 5000);
                
            }else{
                console.log('Error')
                setShowAlert(true);
                setAlertContent('An error occurred. Please try again later.');
                setAlertSeverity('error')

                setTimeout(() => {
                  setShowAlert(false);
                  setAlertContent('');
                }, 5000);
                throw new Error(response.status);
            }

            } catch (error) {
                throw error;
    }
    };

    const googleLogin = async (response) => {
        try {
            let data = await response.json();
    
            if (response.status === 200) {
                setAuthToken(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate("/dashboard");
            } else {
                setShowAlert(true);
                setAlertContent('Error: Please try again or Sign In with Email');
                setAlertSeverity('error')
    
                setTimeout(() => {
                    setShowAlert(false);
                    setAlertContent('');
                    setAlertSeverity('')
                    navigate("/");
                }, 10000);
            }
        } catch (error) {
            setShowAlert(true);
            setAlertSeverity('error')
            setAlertContent('Error: Please try again or Sign In with Email');
    
            setTimeout(() => {
                setShowAlert(false);
                setAlertContent('');
                setAlertSeverity('')
                navigate("/");
            }, 10000);
        }
    };


       
    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        signInUser: signInUser,
        googleLogin: googleLogin,
        showAlert: showAlert,
        alertContent: alertContent,
        alertSeverity: alertSeverity
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
    
}
