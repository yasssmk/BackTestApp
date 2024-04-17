import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')))
const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLogin3 />} />
    </Routes>
  );
};

export default AuthenticationRoutes;

// const AuthenticationRoutes = {
//   path: '/',
//   element: () => <MinimalLayout />,
//   children: [
//     {
//       path: '/pages/login/login3',
//       element:() => <AuthLogin3 />
//     },
//     {
//       path: '/pages/register/register3',
//       element:() => <AuthRegister3 />
//     }
//   ]
// };

// export default AuthenticationRoutes;
