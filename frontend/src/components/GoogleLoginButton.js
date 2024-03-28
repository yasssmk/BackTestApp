import React, {useEffect, useContext }  from "react";
import AuthContext from "../context/AuthContext"



const GoogleLogin = () => {

    const {googleLogin} = useContext(AuthContext);

    function handleCallbackresponse(response){
        googleLogin(response.credential)
    }

    useEffect(() => {
        /* global google */

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_OATH_CLIENT_ID,
            callback: handleCallbackresponse
        });

        window.onload = google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "filled_blue", size: "medium"}
        )

    }, [])

    return (
        <div id="signInDiv" ></div>
    )
}

export default GoogleLogin
