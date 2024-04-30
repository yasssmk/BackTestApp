
import {AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DashboardContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from './routes';
import theme, { customization } from './themes';
import NavigationScroll from './layout/NavigationScroll';



function App() {

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme()}>
        <CssBaseline />
        <NavigationScroll>
        <DataProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        </DataProvider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
