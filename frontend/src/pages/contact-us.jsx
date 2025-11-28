import { useState, useEffect } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [visible, setVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          setVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Tajawal', sans-serif;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%);
          direction: rtl;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .gradient-text {
          background: linear-gradient(135deg, #3B82F6 0%, #38BDF8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
        }

        .pulse-ring {
          animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulseRing {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        .gradient-border {
          position: relative;
          background: white;
          border-radius: 16px;
        }

        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(135deg, #3B82F6, #38BDF8, #8B5CF6);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .gradient-border:hover::before {
          opacity: 1;
        }

        .main {
          padding-top: 40px;
        }

        .hero {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px 80px;
          text-align: center;
          margin-top:20p
        }

        .hero-title {
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 700;
          margin-bottom: 24px;
          text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
        }

        .hero-subtitle {
          font-size: clamp(18px, 2.5vw, 24px);
          color: #6B7280;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 24px;
          opacity: 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 48px;
          align-items: stretch;
        }

        .form-section {
          padding: 40px;
          border-radius: 16px;
        }

        .form-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          text-align: center;
        }

        .form-subtitle {
          color: #6B7280;
          margin-bottom: 32px;
          text-align: center;
          line-height: 1.6;
          font-size: 16px;
        }

        .form-label {
          display: block;
          font-weight: 700;
          margin-bottom: 8px;
          font-size: 16px;
          color: #1F2937;
        }

        .form-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          font-size: 16px;
          margin-bottom: 24px;
          outline: none;
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          border-color: #3B82F6;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .form-textarea {
          width: 100%;
          padding: 16px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          font-size: 16px;
          min-height: 120px;
          resize: vertical;
          outline: none;
          margin-bottom: 24px;
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .form-textarea:focus {
          border-color: #3B82F6;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .submit-button {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
          font-weight: 700;
          font-size: 18px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
        }

        .info-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-card {
          padding: 32px;
          border-radius: 16px;
        }

        .info-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
          padding: 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-size: 16px;
          color: #6B7280;
          line-height: 1.6;
        }

        .info-item:hover {
          background: rgba(59, 130, 246, 0.1);
          transform: translateX(5px);
        }

        .social-card {
          padding: 32px;
          border-radius: 16px;
          text-align: center;
        }

        .social-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 24px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          transition: all 0.3s ease;
          filter: grayscale(100%);
          cursor: pointer;
        }

        .social-icon:hover {
          transform: scale(1.2) rotate(5deg);
          filter: grayscale(0%);
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title gradient-text slide-up">اتصل بنا</h1>
          <p className="hero-subtitle fade-in">
            نحن هنا للمساعدة. املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن.
          </p>
        </section>

        <section id="contact" className={`section animate-section ${visible.contact ? 'slide-up' : ''}`}>
          <div className="contact-grid">
            <div className="form-section glass-effect card-hover scale-in">
              <h2 className="form-title gradient-text">ارسل رسالة</h2>
              <p className="form-subtitle">
                يرجى ملء النموذج وسنتواصل معك قريباً
              </p>

              <form onSubmit={handleSubmit}>
                <label className="form-label">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="ادخل اسمك الكامل"
                />

                <label className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="ادخل بريدك الإلكتروني"
                />

                <label className="form-label">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="ادخل رقم هاتفك"
                />

                <label className="form-label">رسالتك</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="ادخل رسالتك"
                ></textarea>

                <button type="submit" className="submit-button">
                  إرسال الرسالة
                </button>
              </form>
            </div>

            <div className="info-section">
              <div className="info-card glass-effect card-hover">
                <h3 className="info-title gradient-text">معلومات الاتصال</h3>
                
                <div className="info-item">
                  <div className="icon-wrapper">📍</div>
                  <div>
                    <strong>العنوان:</strong><br />
                    جامعه الدول بجوار مصطفى محمود
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-wrapper">📞</div>
                  <div>
                    <strong>الهاتف:</strong><br />
                    +201123456789
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-wrapper">✉️</div>
                  <div>
                    <strong>البريد الإلكتروني:</strong><br />
                    support@khedma.com
                  </div>
                </div>
              </div>

              <div className="social-card glass-effect card-hover">
                <h3 className="social-title gradient-text">تابعنا</h3>
                <div className="social-icons">
                  <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <img 
                      className="social-icon" 
                      src="https://cdn-icons-png.flaticon.com/512/733/733547.png" 
                      alt="facebook" 
                    />
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                    <img 
                      className="social-icon" 
                      src="https://cdn-icons-png.flaticon.com/512/733/733579.png" 
                      alt="twitter" 
                    />
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                    <img 
                      className="social-icon" 
                      src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" 
                      alt="instagram" 
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;