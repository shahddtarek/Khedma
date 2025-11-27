import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('تم تسجيل الدخول بنجاح!');
    }, 1500);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: "Tajawal", sans-serif;
          direction: rtl;
          overflow-x: hidden;
        }

        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #56a3c7 0%, #4db8d8 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .page-container::before {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          top: -100px;
          right: -100px;
          animation: float 6s ease-in-out infinite;
        }

        .page-container::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          bottom: -80px;
          left: -80px;
          animation: float 8s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          width: 100%;
          max-width: 480px;
          padding: 50px 45px;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
          animation: slideUp 0.6s ease-out;
          margin-top:45px;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo-container {
          text-align: center;
          margin-bottom: 10px;
        }

        h1 {
          text-align: center;
          margin-bottom: 8px;
          font-size: 28px;
          font-weight: 800;
          color: #1a202c;
        }

        .subtitle {
          text-align: center;
          color: #718096;
          font-size: 15px;
          margin-bottom: 35px;
        }

        .create-link {
          color: #4db8d8;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .create-link:hover {
          color: #56a3c7;
          text-decoration: underline;
        }

        .form-group {
          margin-bottom: 22px;
          position: relative;
        }

        .form-label {
          display: block;
          text-align: right;
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 15px;
          color: #2d3748;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          right: 16px;
          color: #a0aec0;
          pointer-events: none;
        }

        .input {
          width: 100%;
          padding: 15px 48px 15px 15px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          text-align: right;
          background: #f7fafc;
          transition: all 0.3s ease;
          font-family: "Tajawal", sans-serif;
        }

        .input:focus {
          outline: none;
          border-color: #4db8d8;
          background: white;
          box-shadow: 0 0 0 4px rgba(77, 184, 216, 0.15);
        }

        .input::placeholder {
          color: #cbd5e0;
        }

        .password-toggle {
          position: absolute;
          left: 16px;
          cursor: pointer;
          color: #a0aec0;
          transition: color 0.3s ease;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .password-toggle:hover {
          color: #4db8d8;
        }

        .options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .remember-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }

        .checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #4db8d8;
        }

        .forgot {
          color: #4db8d8;
          font-size: 14px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .forgot:hover {
          color: #56a3c7;
          text-decoration: underline;
        }

        .primary-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #56a3c7 0%, #4db8d8 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Tajawal", sans-serif;
          box-shadow: 0 8px 20px rgba(77, 184, 216, 0.3);
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(77, 184, 216, 0.4);
        }

        .primary-btn:active {
          transform: translateY(0);
        }

        .primary-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 35px 0 30px;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }

        .divider span {
          padding: 0 15px;
          color: #a0aec0;
          font-size: 14px;
          font-weight: 500;
        }

        .social-container {
          display: flex;
          gap: 15px;
        }

        .social-btn {
          flex: 1;
          padding: 14px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background: white;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.3s ease;
          font-family: "Tajawal", sans-serif;
          color: #4a5568;
        }

        .social-btn:hover {
          border-color: #4db8d8;
          background: #f7fafc;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .social-btn.facebook {
          color: #1877f2;
        }

        .social-btn.google {
          color: #ea4335;
        }

        @media (max-width: 640px) {
          .card {
            padding: 40px 30px;
          }

          h1 {
            font-size: 24px;
          }

          .social-container {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="page-container">
        <div className="card">
          <div className="logo-container">
            <h1>مرحباً بعودتك</h1>
            <p className="subtitle">
              ليس لديك حساب؟ <span className="create-link" onClick={goToRegister}>إنشاء حساب جديد</span>
            </p>
          </div>

          <div>
            <div className="form-group">
              <label className="form-label">البريد الإلكتروني</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  className="input"
                  placeholder="example@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">كلمة المرور</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="options-row">
              <label className="remember-row">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>تذكرني</span>
              </label>
              <a href="#" className="forgot">نسيت كلمة المرور؟</a>
            </div>

            <button className="primary-btn" onClick={handleLogin} disabled={isLoading}>
              <div className="btn-content">
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>جاري تسجيل الدخول...</span>
                  </>
                ) : (
                  <span>تسجيل الدخول</span>
                )}
              </div>
            </button>
          </div>

          <div className="divider">
            <span>أو سجل الدخول باستخدام</span>
          </div>

          <div className="social-container">
            <button className="social-btn facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>

            <button className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}