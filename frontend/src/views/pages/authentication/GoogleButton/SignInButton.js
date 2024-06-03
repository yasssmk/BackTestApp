import React, { useEffect, useContext } from "react";
import { Button, Box, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import AnimateButton  from '../../../../ui-component/extended/AnimateButton';
import AuthContext from "../../../../context/AuthContext";
import GoogleIcon from "../../../../assets/images/icons/GoogleIcon.svg"
import { useGoogleLogin } from '@react-oauth/google';

const GoogleSignIn = () => {
    const { googleLogin } = useContext(AuthContext);
    
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        // ux_mode: 'redirect',
        // redirect_uri: 'http://localhost:3000/auth/google/callback',
        onSuccess: async (response) => {
            try {
                const code = response.code; 
    
                const res = await fetch('http://localhost:8000/auth/google-login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }),
                });

                googleLogin(res)

            } catch (error) {

                googleLogin(error)
            }
        },
    });



    return (
        <AnimateButton>
            <Button
              id = "signInDiv"
              variant="outlined"
              fullWidth
              onClick={() => handleGoogleLogin()}
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

export default GoogleSignIn;