// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";


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
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 48px",
        borderBottom: "1px solid #e8e8e8",
        fontWeight: 600,
        fontSize: "1.1rem",
      }}
    >
      {/* Left: Navigation */}
      <div style={{ display: "flex", gap: "32px" }}>
        
        <a href="/about" style={navLinkStyle}>
          معلومات عنا
        </a>
        <a href="/contact-us" style={navLinkStyle}>
          تواصل معنا
        </a>
        <a href="/service-categories" style={navLinkStyle}>
          الخدمات
        </a>
        <a href="/home" style={navLinkStyle}>
          الرئيسية
        </a>
        <a href="/provider-registration" style={navLinkStyle}>
          مزودو الخدمة
        </a>
      </div>
      {/* Right: Icons and Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ fontSize: 22, color: "#357eff" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            style={{ verticalAlign: "middle" }}
          >
            <path
              fill="currentColor"
              d="M16 3l13 12-1.5 1.5L28 17h-1v11H5V17H4l.5-1.5-1.5-1.5L16 3zm8 25V17h-6v7h-4v-7H8v11h16zm-4-7v-5h-4v5h4z"
            />
          </svg>
        </span>
        <span
          style={{
            fontWeight: 900,
            color: "#357eff",
            fontSize: 23,
            marginRight: 6,
          }}
        >
          خدمة
        </span>
        <span style={{ fontSize: 20, color: "#85aef5" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <rect
              x="2.5"
              y="2.5"
              width="15"
              height="15"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 .83l.5.43c.69.59 1.71.59 2.4 0l.5-.43M9 8.33l-.5.43c-.69.59-1.71.59-2.4 0l-.5-.43"
              stroke="currentColor"
              strokeWidth=".8"
              fill="none"
            />
          </svg>
        </span>
      </div>
    </nav>
  );
}

