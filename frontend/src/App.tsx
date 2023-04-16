import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginProvider from './context/AuthContext';
import AdminHome from './pages/Adminpage';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

export default function App() {
  return (
    <LoginProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Admin" element={<AdminHome />} />

      </Routes>
    </Router>
    </LoginProvider>
  );
}
