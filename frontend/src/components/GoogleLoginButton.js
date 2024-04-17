// import React, {useEffect, useContext }  from "react";
// import AuthContext from "../context/AuthContext"



// const GoogleLogin = () => {

//     const {googleLogin} = useContext(AuthContext);

//     function handleCallbackresponse(response){
//         googleLogin(response.credential)
//     }

//     useEffect(() => {
//         /* global google */

//         google.accounts.id.initialize({
//             client_id: process.env.REACT_APP_OATH_CLIENT_ID,
//             callback: handleCallbackresponse
//         });

//         window.onload = google.accounts.id.renderButton(
//             document.getElementById("signInDiv"),
//             {theme: "filled_blue", size: "medium"}
//         )

//     }, [])

//     return (
//         <div id="signInDiv" ></div>
//     )
// }

// export default GoogleLogin

import React, { useEffect, useContext } from "react";
import { Button, Box, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import AnimateButton  from '../ui-component/extended/AnimateButton';
import AuthContext from "../context/AuthContext";
import GoogleIcon from "../assets/images/icons/GoogleIcon.svg"

const GoogleLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    function handleCallbackresponse(response) {
        googleLogin(response.credential);
    }

    useEffect(() => {
        /* global google */

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_OATH_CLIENT_ID,
            callback: handleCallbackresponse
        });

        window.onload = google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "filled_blue", size: "medium" }
        );
    }, []);

    return (
        <AnimateButton>
            <Button
              id = "signInDiv"
              variant="outlined"
              fullWidth
            //   onClick={() => {google.accounts.id.prompt() }}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >

                <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                    <img src={GoogleIcon} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                </Box>
                Sign in with Google
            </Button>
        </AnimateButton>
    );
};

export default GoogleLogin;