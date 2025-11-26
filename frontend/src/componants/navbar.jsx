import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import KhidmahLogo from '../assets/Images/Logo.jpg';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        
        .navbar {
          background: ${scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 1)'};
          backdrop-filter: blur(20px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 48px;
          border-bottom: ${scrolled 
            ? '1px solid rgba(229, 231, 235, 0.8)' 
            : '1px solid #e8e8e8'};
          font-weight: 600;
          font-size: 1.1rem;
          direction: rtl;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: ${scrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
            : 'none'};
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.3s ease;
          position: relative;
        }

        .logo-link:hover {
          transform: scale(1.05);
        }

        .logo-image {
          height: 60px;
          margin-right: 10px;
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.2));
        }

        .logo-link:hover .logo-image {
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          color: #444;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          font-family: 'Tajawal', sans-serif;
          font-weight: 500;
          padding: 8px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3B82F6, #38BDF8);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .nav-link:hover {
          color: #3B82F6;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #3B82F6;
          font-weight: 700;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .nav-button {
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          font-family: 'Tajawal', sans-serif;
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .nav-button-secondary {
          background-color: #FFFFFF;
          color: #1F2937;
          border: 1px solid #E5E7EB;
        }

        .nav-button-secondary:hover {
          background-color: #F9FAFB;
          border-color: #3B82F6;
          color: #3B82F6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .nav-button-primary {
          background: linear-gradient(135deg, #38BDF8 0%, #3B82F6 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .nav-button-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .nav-button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
        }

        .nav-button-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .nav-button-primary span {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 15px 20px;
          }

          .nav-links {
            display: none;
          }

          .navbar-right {
            gap: 10px;
          }

          .nav-button {
            padding: 6px 12px;
            font-size: 13px;
          }

          .logo-image {
            height: 50px;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar {
          animation: fadeInDown 0.5s ease;
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img 
              src={KhidmahLogo}
              alt="شعار خدمة"
              className="logo-image"
            />
          </Link>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/service-categories" 
              className={`nav-link ${isActive('/service-categories') ? 'active' : ''}`}
            >
              الخدمات
            </Link>
            <Link 
              to="/contact-us" 
              className={`nav-link ${isActive('/contact-us') ? 'active' : ''}`}
            >
              تواصل معنا
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              معلومات عنا
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <Link to="/login" className="nav-button nav-button-secondary">
            تسجيل الدخول
          </Link>
          <Link to="/register" className="nav-button nav-button-primary">
            <span>إنشاء حساب</span>
          </Link>
        </div>
      </nav>
    </>
  );
}