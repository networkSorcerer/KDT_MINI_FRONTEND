import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import AdminHome from "./pages/admin/AdminHome";
import Address from "./pages/signup/address";
import StepwisePCCustomizing from "./components/OwnPCCustomization";
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
          <Route path="/own-pc" element={<StepwisePCCustomizing />} />
          <Route path="/suggested-pc" element={<SuggestedPC />} />
        </Routes>
      </Router>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  navbar: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    margin: "0 10px",
  },
};

export default App;
