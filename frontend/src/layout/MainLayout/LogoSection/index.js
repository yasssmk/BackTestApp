
// material-ui
import { Box, useMediaQuery, useTheme,  } from '@mui/material';

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
        <Box display="flex" alignItems="center">
          <img src={LogoFull} alt="Logo" width="100%" />
        </Box>
      )}
    </>
  );
};

export default LogoSection;
