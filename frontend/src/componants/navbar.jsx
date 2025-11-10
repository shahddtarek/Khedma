// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import KhidmahLogo from '../assets/Images/Logo.jpg';

const navLinkStyle = {
  color: "#444",
  textDecoration: "none",
  transition: "color 0.2s",
};

export default function NavBar() {
  return (
    <nav
      style={{
        background: "#fff",
        display: "flex",
        // Adjusted to typically put the Logo on the Right (start) for RTL
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "18px 48px",
        borderBottom: "1px solid #e8e8e8",
        fontWeight: 600,
        fontSize: "1.1rem",
        // Force direction right-to-left for correct visual flow
        direction: "rtl", 
      }}
    >
      {/* Right: Logo/Brand (Now using an <img> tag) */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/home">
          <img 
            src={KhidmahLogo} // Placeholder image source as requested
            alt="شعار خدمة" // Arabic alt text for accessibility
            style={{ 
                height: "60px", // Set a size for the logo image
                marginRight: "10px" 
            }}
          />
        </Link>
      </div>

      {/* Left: Navigation (Using Link component and reversed order for RTL reading) */}
      <div style={{ display: "flex", gap: "32px" }}>
        {/* Note: Links are ordered as they would appear visually from right to left */}
        
        <Link to="/home" style={navLinkStyle}>
          الرئيسية
        </Link>
        <Link to="/service-categories" style={navLinkStyle}>
          الخدمات
        </Link>
        <Link to="/contact-us" style={navLinkStyle}>
          تواصل معنا
        </Link>
        <Link to="/about" style={navLinkStyle}>
          معلومات عنا
        </Link>
        
      </div>
    </nav>
  );
}