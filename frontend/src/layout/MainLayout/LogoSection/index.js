
// material-ui
import { Box,Button, useMediaQuery, useTheme,  } from '@mui/material';

// project imports

import LogoFull from '../../../assets/images/logo/OwizerLogoLight.png';
import LogoSmall from '../../../assets/images/logo/LogoVerde.png'


// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const theme = useTheme(); // Import and use theme
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {isMobile ? (
        <Box display="flex" alignItems="center">
          <img src={LogoSmall} alt="Logo" width='100%' />
        </Box>
      ) : (
        <Button  href="http://localhost:3000/dashboard" display="flex" alignItems="center">
        <img src={LogoFull} alt="Logo" width="100%" />
        </Button> 
      )}
    </>
  );
};

export default LogoSection;
