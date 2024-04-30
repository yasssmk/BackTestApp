import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box} from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import LogOutButtons from './LogOut';



// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();


  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          paddingRight: 1,
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            width: '60px',
            padding: '4px'
          }
        }}
      >
       <Box component="span" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <LogoSection />
        </Box>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <LogOutButtons />

    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
