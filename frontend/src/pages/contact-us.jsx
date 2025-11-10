import React from "react";

const ContactUs = () => {
  const styles = {
    container: {
      direction: "rtl",
      fontFamily: "Tajawal, Arial, sans-serif",
      backgroundColor: "#f9fafc",
      minHeight: "100vh",
      padding: "40px 0",
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      display: "flex",
      gap: "24px",
      width: "90%",
      maxWidth: "1100px",
    },
    leftCard: {
      flex: 2,
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "32px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    },
    rightCard: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    infoCard: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "28px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "8px",
    },
    subtext: {
      color: "#666",
      marginBottom: "28px",
      lineHeight: 1.6,
      fontSize: "15px",
    },
    label: {
      fontWeight: "600",
      marginBottom: "6px",
      display: "block",
      fontSize: "15px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "15px",
      marginBottom: "18px",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "15px",
      minHeight: "100px",
      resize: "vertical",
      outline: "none",
      marginBottom: "18px",
    },
    button: {
      width: "100%",
      backgroundColor: "#0066ff",
      color: "#fff",
      fontWeight: "700",
      padding: "14px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    },
    infoTitle: {
      fontWeight: "700",
      fontSize: "20px",
      marginBottom: "16px",
      color: "#1a1a1a",
    },
    infoItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      marginBottom: "16px",
      lineHeight: 1.5,
      fontSize: "15px",
      color: "#444",
    },
    icon: {
      color: "#0066ff",
      marginTop: "2px",
    },
    socialSection: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      textAlign: "center",
    },
    socialTitle: {
      fontWeight: "700",
      fontSize: "20px",
      marginBottom: "12px",
      color: "#1a1a1a",
    },
    socials: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    socialIcon: {
      width: "26px",
      height: "26px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Left: Form */}
        <div style={styles.leftCard}>
          <h2 style={styles.title}>اتصل بنا</h2>
          <p style={styles.subtext}>
            نحن هنا للمساعدة. املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن.
          </p>

          <form>
            <label style={styles.label}>الاسم الكامل</label>
            <input type="text" style={styles.input} placeholder="ادخل اسمك الكامل" />

            <label style={styles.label}>البريد الإلكتروني</label>
            <input type="email" style={styles.input} placeholder="ادخل بريدك الإلكتروني" />

            <label style={styles.label}>رقم الهاتف</label>
            <input type="tel" style={styles.input} placeholder="ادخل رقم هاتفك" />

            <label style={styles.label}>رسالتك</label>
            <textarea style={styles.textarea} placeholder="ادخل رسالتك"></textarea>

            <button type="submit" style={styles.button}>
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* Right: Contact Info + Socials */}
        <div style={styles.rightCard}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>معلومات الاتصال</h3>
            <div style={styles.infoItem}>
              📍 جامعه الدول بجوار مصطفى محمود
            </div>
            <div style={styles.infoItem}>📞 +201123456789</div>
            <div style={styles.infoItem}>✉️ support@khedma.com</div>
          </div>

          <div style={styles.socialSection}>
            <h3 style={styles.socialTitle}>تابعنا</h3>
            <div style={styles.socials}>
              <a href="#"><img style={styles.socialIcon} src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="facebook" /></a>
              <a href="#"><img style={styles.socialIcon} src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="twitter" /></a>
              <a href="#"><img style={styles.socialIcon} src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="instagram" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
