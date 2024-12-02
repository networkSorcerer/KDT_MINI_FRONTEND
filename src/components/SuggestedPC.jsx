import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import OwnPCCustomization from "./components/OwnPCCustomization";
import SuggestedPC from "./components/SuggestedPC";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <h1>메인페이지</h1>
        <nav style={styles.navbar}>
          <ul>
            <li>
              <Link to="/own-pc-customization" style={styles.link}>
                상세보기 (Own PC Customizing)
              </Link>
            </li>
            <li>
              <Link to="/suggested-pc" style={styles.link}>
                추천 완본체 (Suggested Custom PC)
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/own-pc-customization"
            element={<OwnPCCustomization />}
          />
          <Route path="/suggested-pc" element={<SuggestedPC />} />
        </Routes>
      </div>
    </Router>
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
