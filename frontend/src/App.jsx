import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/home";
import About from "./pages/about";
import ContactUs from "./pages/contact-us";
import NavBar from "./componants/navbar";
import Service from "./pages/service-categories"
import ProviderRegistration from "./pages/provider-registration";
import UserSettingsPage from "./pages/user-settings";
import HomePage from "./pages/home";

function App() {
  return (
    <Router>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/provider-registration" element={<ProviderRegistration />} />
          <Route path="/service-categories" element={<Service />} />
          <Route path="/user-settings" element={<UserSettingsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

