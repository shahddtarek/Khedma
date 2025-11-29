import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/home";
import About from "./pages/about";
import ContactUs from "./pages/contact-us";
import NavBar from "./componants/navbar";
import Service from "./pages/service-categories";
import ProviderRegistration from "./pages/provider-registration";
import UserSettingsPage from "./pages/user-settings";
import ServiceProviderProfile from "./pages/provider-profile";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ServiceSearch from "./pages/service-search";
import PaymentMethod from "./pages/payment-method";
import WorkerDashboard from "./pages/worker-dashboard";
import ClientDashboard from "./pages/client-dashboard";

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
          <Route path="/provider-profile" element={<ServiceProviderProfile />} />
          <Route path="/provider-profile/:workerId" element={<ServiceProviderProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/service-search" element={<ServiceSearch />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
