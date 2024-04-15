import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';;

export default function HomePageBreadCrumbs() {

  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard" >
            Dashboard
        </Link>
    </Breadcrumbs>
  );
}