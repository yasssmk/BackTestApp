import { createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    console.log("START")

    useEffect(() => {

        let minutes = 1000 * 60 
        let currentLocalStorage = localStorage.getItem('authTokens');
        
        if (currentLocalStorage) {

            setLoading(true);

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
                   

                    if (response.status === 200){
                        let data = await response.json()
                        localStorage.setItem('authTokens', JSON.stringify(data))
                        setAuthToken(data)
                        setUser(jwtDecode(data.access))                        
                        
                    } else{

                        throw new Error('Failed to refresh token')
                        logoutUser()
                    }
        
                    if(loading){
                        setLoading(false)
                    }
                },2000);

                return () => clearInterval(interval);

        } else {
            navigate("/login");
            return;
        }
    }, [authTokens, navigate]);

    
 
// useEffect(() => {
    
//     console.log(1)
//     const storedTokens = localStorage.getItem("authTokens");

//     if (storedTokens) {
//         setAuthToken(JSON.parse(storedTokens));
//         setUser(jwtDecode(storedTokens));

//     } else {
//         navigate("/login");
//         return; 
//     }

//     if (loading) {
//         console.log("Interval - Loading call updateToken")
//         updateToken();
//     }

//     let fourMinutes = 1000 * 60 * 1;
//     let interval = setInterval(() => {
//         console.log("Interval - storedTokens " + storedTokens)
//         if (localStorage.getItem("authTokens")) {
//             updateToken();
//         } else {
//             navigate("/login");
//             return; 
//         }

//     }, 2000);
    
//     return () => clearInterval(interval);

// }, [loading]);


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
        let curent_refresh = JSON.parse(localStorage.getItem("authTokens"))
        let response = await fetch('http://localhost:8000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authTokens.access}`
            },
            
            body: JSON.stringify({refresh_token: authTokens.refresh })
            // body: JSON.stringify({refresh_token: curent_refresh.refresh })
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

    // let updateToken = async ()=>{
        
    //     if (!authTokens) return;
    //     console.log("Update called")
    //     console.log("current authToken refresh: "+ authTokens.refresh)
    //     let curent_refresh = JSON.parse(localStorage.getItem("authTokens"))
    //     try{
    //         let response = await fetch('http://localhost:8000/auth/token/refresh/', {
    //             method: 'POST',
    //             headers:{
    //                 'Content-Type': 'application/json'
    //             },
    //             body:JSON.stringify({ refresh: authTokens?.refresh })
    //             // body: JSON.stringify({refresh_token: curent_refresh.refresh })
    //         })

    //         let data = await response.json()
    //         console.log("New Data refresh: "+ data.refresh)

    //         if (response.status === 200){
    //             console.log("UPDATE TOKEN with :" + JSON.stringify(data))

    //             localStorage.setItem('authTokens', JSON.stringify(data))
    //             setAuthToken(data)
    //             setUser(jwtDecode(data.access))

    //             console.log("AuthToken after update = " + authTokens.refresh)
    //             console.log("USER after update" + user.access)
    //             console.log("Current Local Storage: " + (localStorage.getItem("authTokens")))

    //         } else{
    //             throw new Error('Failed to refresh token')
    //         }

    //         if(loading){
    //             setLoading(false)
    //         }

    //     }catch (error) {
    //         console.error('Error refreshing token:', error);
    //         logoutUser();
    //     } 
    // }

    console.log("END AuthTokens: " + (authTokens?.refresh ? authTokens.refresh : "Null"))
    
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

