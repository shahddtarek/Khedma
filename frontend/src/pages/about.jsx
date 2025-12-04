import { useState, useEffect } from 'react';
import photo1 from '../assets/Images/photo1.png';
import teamPhoto from '../assets/Images/photo2.jpg';

export default function AboutPage() {
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

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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

        .shine {
          position: relative;
          overflow: hidden;
        }

        .shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
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

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .mission-image {
          min-height: 380px;
        }

        .mission-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .mission-image .image-overlay {
          opacity: 0.35;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(56, 189, 248, 0.3));
          opacity: 0;
          transition: opacity 0.4s;
        }

        .image-container:hover .image-overlay {
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
          max-width: 1000px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 24px;
          opacity: 0;
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 48px;
          align-items: stretch;
        }

        .mission-text {
          text-align: right;
        }

        .badge {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          border-radius: 50px;
          margin-bottom: 32px;
        }

        .badge-text {
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 700;
          color: white;
        }

        .mission-cards {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mission-card {
          padding: 32px;
          border-radius: 16px;
        }

        .mission-card-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mission-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
        }

        .mission-card-text {
          color: #6B7280;
          font-size: 18px;
          line-height: 1.8;
        }

        .image-placeholder {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #60A5FA, #38BDF8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }

        .image-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
        }

        .floating-icon {
          width: 128px;
          height: 128px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: white;
          position: relative;
          z-index: 1;
        }

        .image-text {
          font-size: 24px;
          font-weight: 700;
          color: white;
          position: relative;
          z-index: 1;
        }

        .values-section {
          padding: 80px 0;
          background: linear-gradient(180deg, transparent, #dbeafe);
          border-top: 1px solid #E5E7EB;
          border-bottom: 1px solid #E5E7EB;
          opacity: 0;
        }

        .values-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .values-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .values-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          margin-bottom: 16px;
        }

        .values-divider {
          width: 96px;
          height: 6px;
          background: linear-gradient(90deg, #3B82F6, #38BDF8);
          margin: 0 auto;
          border-radius: 3px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .value-card {
          padding: 32px;
          text-align: center;
        }

        .value-icon-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
        }

        .value-icon-ring {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          border-radius: 16px;
        }

        .value-icon {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .value-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 16px;
        }

        .value-text {
          font-size: 16px;
          color: #6B7280;
          line-height: 1.8;
        }

        .team-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .team-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          margin-bottom: 24px;
        }

        .team-subtitle {
          font-size: clamp(16px, 2vw, 20px);
          color: #6B7280;
          max-width: 1000px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .team-visual {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          min-height: 420px;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.2);
        }

        .team-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .team-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.05), rgba(15, 23, 42, 0.75));
        }

        .team-avatars {
          display: none;
        }

        @media (max-width: 768px) {
          .mission-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>


      <main className="main">
        <section className="hero">
          <h1 className="hero-title gradient-text slide-up">من نحن</h1>
          <p className="hero-subtitle fade-in">
            في "خدمة"، نحن ملتزمون بتقديم حلول منزلية مبتكرة وموثوقة. نشأت رؤيتنا بشغف لتبسيط حياة الناس، ونهدف لتحويل كل تجربة إلى تجربة متميزة، مما يضمن راحة البال والجودة في كل خدمة نقدمها.
          </p>
        </section>

        <section id="mission" className={`section animate-section ${visible.mission ? 'slide-up' : ''}`}>
          <div className="mission-grid">
            <div className="mission-text">
              <div className="badge">
                <h2 className="badge-text">رسالتنا ورؤيتنا</h2>
              </div>
              
              <div className="mission-cards">
                <div className="mission-card glass-effect card-hover">
                  <h3 className="mission-card-title">
                    <span className="mission-number">١</span>
                    رسالتنا
                  </h3>
                  <p className="mission-card-text">
                    تمكين كل عميل من الحصول على خدمات عالية الجودة بكفاءة ويسر، وذلك من خلال منصة آمنة تربط بين العملاء وأفضل مزودي الخدمات.
                  </p>
                </div>

                <div className="mission-card glass-effect card-hover">
                  <h3 className="mission-card-title">
                    <span className="mission-number" style={{background: 'linear-gradient(135deg, #38BDF8, #3B82F6)'}}>٢</span>
                    رؤيتنا
                  </h3>
                  <p className="mission-card-text">
                    أن نكون المنصة الرائدة والأكثر ثقة للخدمات المنزلية في المنطقة، معياراً للتميز في الخدمة والتزامنا بالجودة.
                  </p>
                </div>
              </div>
            </div>

            <div className="image-container mission-image">
              <img src={photo1} alt="رسالتنا ورؤيتنا" />
              <div className="image-overlay" />
            </div>
          </div>
        </section>

        <section id="values" className={`values-section animate-section ${visible.values ? 'fade-in' : ''}`}>
          <div className="values-content">
            <div className="values-header">
              <h2 className="values-title gradient-text">قيمنا الأساسية</h2>
              <div className="values-divider"></div>
            </div>

            <div className="values-grid">
              <div className="value-card gradient-border glass-effect card-hover scale-in">
                <div className="value-icon-wrapper">
                  <div className="value-icon-ring pulse-ring"></div>
                  <div className="value-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="value-title">الثقة</h3>
                <p className="value-text">نبني علاقات متينة مع عملائنا مبنية على الأمانة والشفافية.</p>
              </div>

              <div className="value-card gradient-border glass-effect card-hover scale-in">
                <div className="value-icon-wrapper">
                  <div className="value-icon-ring pulse-ring"></div>
                  <div className="value-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="7"/>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                    </svg>
                  </div>
                </div>
                <h3 className="value-title">الجودة</h3>
                <p className="value-text">نلتزم بأعلى معايير الجودة في كل خدمة نقدمها لضمان رضاكم.</p>
              </div>

              <div className="value-card gradient-border glass-effect card-hover scale-in">
                <div className="value-icon-wrapper">
                  <div className="value-icon-ring pulse-ring"></div>
                  <div className="value-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 7 12 22 22 7 12 2"/>
                      <polyline points="12 22 12 7"/>
                      <polyline points="2 7 12 7 22 7"/>
                    </svg>
                  </div>
                </div>
                <h3 className="value-title">الكفاءة</h3>
                <p className="value-text">نسعى لتقديم خدماتنا بسرعة وفعالية لتوفير وقتك وجهدك.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className={`section animate-section ${visible.team ? 'slide-up' : ''}`}>
          <div className="team-header">
            <h2 className="team-title gradient-text">فريقنا المتميز</h2>
            <p className="team-subtitle">
              نحن نفخر بفريقنا من المبدعين والمهنيين الذين يمتلكون الخبرة والشغف لتقديم أفضل ما لديهم. كل فرد في فريقنا يتم اختياره بعناية لضمان تقديم خدمة استثنائية تستحقونها.
            </p>
          </div>

          <div className="team-visual">
            <img src={teamPhoto} alt="فريق العمل المحترف" />
          </div>
        </section>
      </main>
    </div>
  );
}