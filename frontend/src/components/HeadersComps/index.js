// material-ui
import { useTheme } from '@mui/material/styles';
import { Box} from '@mui/material';

// project imports
import LogoSection from './LogoSection';
import LogOutButtons from './LogOut'
import SearchSection from './SearchSection';
import HomePageBreadCrumbs from './HomeGreadCrumbs';

import { useNavigate, useLocation  } from 'react-router-dom';


// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
const theme = useTheme();

//   const navigate = useNavigate()
  const location = useLocation();


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        px: '16px',
        backgroundColor: '#fffff',
      }}
    >
      <LogoSection />

      <Box sx={{margin: '50px', padding:'16px', width: '320px'}} >
        {location.pathname === '/dashboard' ? <SearchSection /> : <HomePageBreadCrumbs/>}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <LogOutButtons />
    </Box>
  );
};



export default Header;