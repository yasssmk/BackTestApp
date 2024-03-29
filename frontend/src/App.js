import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SigninPage from './pages/SignInPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Headers';
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider } from './context/AuthContext'
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
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
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
