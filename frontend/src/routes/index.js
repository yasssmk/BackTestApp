import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useLocation } from 'react-router-dom';
import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';

const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')))
const Register = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')))

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const location = useLocation();

  // Check if the current URL is the root URL '/'
  const isRootUrl = location.pathname === '/';

  return (
      <Routes>
        <Route path="/" element={<AuthLogin3 />} />
        <Route path="/pages/register/register3" element={<Register />} />
      </Routes>

  );
}


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
