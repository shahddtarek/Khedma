// src/pages/provider-registration.jsx
import React from "react";
import NavBar from '../componants/navbar';
function MainTitle() {
  return (
    <section style={{ marginBottom: 36, textAlign: "center" }}>
      <h1
        style={{
          color: "#262b4f",
          fontWeight: 900,
          letterSpacing: 1,
          fontSize: 28,
          marginBottom: 7,
        }}
      >
        التسجيل كمزود خدمة
      </h1>
      <p style={{ color: "#6b6e7e", fontWeight: 600, fontSize: 18 }}>
        ابدأ رحلتك معنا في خطوات بسيطة
      </p>
    </section>
  );
}

function RegistrationStep() {
  const labelStyle = {
    fontWeight: 600,
    color: "#38395a",
    marginBottom: 6,
    fontSize: 15,
  };
  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1.6px solid #e4e7ee",
    borderRadius: 8,
    background: "#f7faff",
    fontSize: 15,
    fontWeight: 500,
    outline: "none",
  };

  return (
    <form autoComplete="off">
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#357eff",
            marginBottom: 8,
          }}
        >
          الخطوة 1 من 4
        </div>
        <div
          style={{
            height: 7,
            background: "#e7eafd",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "25%",
              height: "100%",
              background:
                "linear-gradient(90deg, #357eff 80%, #c1d8ff 180%)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          fontSize: 17,
          fontWeight: "bold",
          marginBottom: 25,
          color: "#222",
        }}
      >
        معلومات الحساب
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <label>
          <div style={labelStyle}>الاسم الكامل</div>
          <input
            type="text"
            placeholder="أدخل اسمك الكامل"
            style={inputStyle}
          />
        </label>
        <label>
          <div style={labelStyle}>البريد الإلكتروني</div>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            style={inputStyle}
          />
        </label>
        <label>
          <div style={labelStyle}>كلمة السر</div>
          <input
            type="password"
            placeholder="أدخل كلمة سر قوية"
            style={inputStyle}
          />
        </label>
        <label>
          <div style={labelStyle}>تأكيد كلمة السر</div>
          <input
            type="password"
            placeholder="أعد إدخال كلمة السر"
            style={inputStyle}
          />
        </label>
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #357eff 80%, #619dff 180%)",
          color: "#fff",
          padding: "14px 0",
          border: "none",
          borderRadius: 10,
          fontWeight: 800,
          fontSize: 19,
          marginTop: 30,
          cursor: "pointer",
        }}
      >
        الخطوة التالية
      </button>
    </form>
  );
}

export default function ProviderRegistration() {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "'Tajawal', sans-serif",
      }}
    >
      {/* <NavBar /> */}
      <main
        style={{
          maxWidth: 750,
          margin: "48px auto 0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px #0001",
          padding: 32,
        }}
      >
        <MainTitle />
        <RegistrationStep />
      </main>
    </div>
  );
}
