import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme, styled, useMediaQuery } from '@mui/material';
import AuthContext from "../../../../context/AuthContext";
import  { useNavigate  } from 'react-router-dom'

export default function LogOutButtons() {
    const theme = useTheme();

    let {logoutUser} = useContext(AuthContext);


    const handleLogout = () => {
        logoutUser();;
    };

    return (
        <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleLogout} sx={{backgroundColor: theme.palette.primary.dark}}>LOGOUT</Button>
        </Stack>
    );
    }