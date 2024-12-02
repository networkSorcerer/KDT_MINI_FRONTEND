import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import AdminHome from "./pages/admin/AdminHome";
import Address from "./pages/signup/address";
import OwnPCCustomization from "./components/OwnPCCustomization";
import SuggestedPC from "./components/SuggestedPC";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/address" element={<Address />} />
          <Route path="/own-pc-customization" element={<OwnPCCustomization />} />
          <Route path="/suggested-pc" element={<SuggestedPC />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
