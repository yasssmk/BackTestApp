import { lazy } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs';
import Header from './Header';
import Loadable from '../../ui-component/Loadable';
import Footer from './Footer';

// assets
import { IconChevronRight } from '@tabler/icons-react';

const DashboardDefault = Loadable(lazy(() => import('../../views/dashboard/Default')))

// styles
const Main = styled('main')(({ theme }) => ({
  ...theme.typography.mainContent,
  width: '100%',
  flexGrow: 1,
  padding: theme.spacing(3),
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
        }}
      >
        <Toolbar
        sx={{
          [theme.breakpoints.down('md')]: {
            paddingInline: '24px'
          }
        }}>
          <Header />
        </Toolbar>
      </AppBar>

      {/* main content */}
      <Main>
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} icon title rightAlign />
        <DashboardDefault />
      </Main>

      {/* footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
