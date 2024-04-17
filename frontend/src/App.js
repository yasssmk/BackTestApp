import './App.css';
import { lazy } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SigninPage from './pages/SignInPage';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/HeadersComps';
import Footer from './components/Footer';
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DashboardContext';
import Dashboard from './pages/dashboard';


// routing

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from './routes';
import theme, { customization } from './themes';
import NavigationScroll from './layout/NavigationScroll';

// const Dashboard = lazy(() => import('./pages/dashboard'));


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


  // return (
  //   <div className="App">
  //    <StyledEngineProvider injectFirst>
  //    <CssBaseline />
  //     <Router>
  //       <DataProvider>
  //       <AuthProvider>
  //         <Header/>
  //         <Routes>
  //           <Route element={<PrivateRoutes />} >
  //             <Route element={<HomePage />} path="/" exact />
  //             <Route element={<Dashboard/>} path="/dashboard" />
  //           </Route>
  //           <Route element={<LoginPage />} path="/login"  />
  //           <Route element={<SigninPage />} path="/signup"  />
  //         </Routes>
  //         <footer>
  //           <Footer />
  //         </footer>
  //       </AuthProvider>
  //       </DataProvider>
  //     </Router>
  //     </StyledEngineProvider>
  //   </div>
  // );
}

export default App;
