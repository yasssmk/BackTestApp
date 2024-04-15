import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export default function HomePageBreadCrumbs() {

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate('/dashboard')
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={handleClick} style={{ cursor: 'pointer' }} >
            Dashboard
        </Link>
    </Breadcrumbs>
  );
}