import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import AuthContext from "../../../../context/AuthContext";

export default function LogOutButtons() {
    const theme = useTheme();

    let {logoutUser} = useContext(AuthContext);


    const handleLogout = () => {
        logoutUser();;
    };

    return (
        <Stack direction="row" spacing={2}>
        <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
                backgroundColor: theme.palette.secondary.dark,
                '&:hover': {
                backgroundColor: theme.palette.secondary[200],
                color: theme.palette.secondary.dark,
                },
            }}>
        LOGOUT
        </Button>
        </Stack>
    );
    } 