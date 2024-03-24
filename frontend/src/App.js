import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route element={<HomePage />} path="/" exact />
          <Route element={<LoginPage />} path="/login"  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
