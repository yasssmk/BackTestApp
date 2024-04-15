import './App.css';
import { lazy } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SigninPage from './pages/SignInPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/HeadersComps';
import Footer from './components/Footer';
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DashboardContext';
import Dashboard from './pages/dashboard';

// const Dashboard = lazy(() => import('./pages/dashboard'));


function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route element={<PrivateRoutes />} >
              <Route element={<HomePage />} path="/" exact />
              <Route element={<Dashboard/>} path="/dashboard" />
            </Route>
            <Route element={<LoginPage />} path="/login"  />
            <Route element={<SigninPage />} path="/signup"  />
          </Routes>
          <footer>
            <Footer />
          </footer>
        </AuthProvider>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
