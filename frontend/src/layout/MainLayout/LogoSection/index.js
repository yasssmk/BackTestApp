
// material-ui
import { Box } from '@mui/material';

// project imports

import Logo from '../../../assets/images/logo/OwizerLogoLight.png';


// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {

  return (
    <Box
    display="flex"
    alignItems="center"
    >
      <img src={Logo} alt="Logo" width='100%'  />
    </Box>
  );
};

export default LogoSection;
