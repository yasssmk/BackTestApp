import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { lazy, useContext } from 'react';
import MainLayout from '../layout/MainLayout';

// project imports
import Loadable from '../ui-component/Loadable';
import PrivateRoutes from '../utils/PrivateRoutes';
import AuthContext from "../context/AuthContext";
import UserRoutes from '../utils/UserRoute';

const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')))
const Register = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')))
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));


// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {

  return (
      <Routes>
          <Route element={<UserRoutes />} >
            <Route path="/" element={ <AuthLogin3 /> } />
            <Route path="/pages/register/register3" element={<Register />} />\
          </Route>
          <Route element={<PrivateRoutes />} >
            <Route path="/dashboard" element={<MainLayout />} />
          </Route>
          
      </Routes>

  );
}