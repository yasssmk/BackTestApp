import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Headers';
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route element={<PrivateRoutes />} />
            <Route element={<HomePage />} path="/" exact />
            <Route element={<LoginPage />} path="/login"  />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
