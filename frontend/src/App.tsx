import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginProvider from "./context/AuthContext";
import AddPref from "./pages/addPref";
import AdminHome from "./pages/Adminpage";
import EditPref from "./pages/editPref";
import Home from "./pages/home";
import Login from "./pages/login";
import NotificationCard from "./pages/notification";
import Preference from "./pages/preference";
import Signup from "./pages/signup";

export default function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Admin" element={<AdminHome />} />
          <Route path="/preferences" element={<Preference />} />
          <Route path="/addPref" element={<AddPref />} />
          <Route path="/editPref" element={<EditPref />} />
          <Route path="/notification" element={<NotificationCard />} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}
