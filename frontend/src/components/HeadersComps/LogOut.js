import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AuthContext from "../../context/AuthContext";
import  { useNavigate  } from 'react-router-dom'

export default function LogOutButtons() {

let {logoutUser} = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
    logoutUser();
    navigate("/login");
};

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={handleLogout}>LogOut</Button>
    </Stack>
  );
}
