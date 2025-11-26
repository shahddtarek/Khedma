import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('تم إنشاء الحساب بنجاح!');
        goToLogin();
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToLogin = () => {
    navigate('/login');
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

        .progress-container {
          margin-bottom: 30px;
        }

        .step-indicator {
          color: #4db8d8;
          font-weight: 600;
          font-size: 14px;
          text-align: right;
          margin-bottom: 12px;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #56a3c7 0%, #4db8d8 100%);
          border-radius: 10px;
          transition: width 0.4s ease;
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

        .login-link {
          color: #4db8d8;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .login-link:hover {
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

        .secondary-btn {
          width: 100%;
          padding: 16px;
          background: white;
          color: #4db8d8;
          border: 2px solid #4db8d8;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Tajawal", sans-serif;
        }

        .secondary-btn:hover {
          background: #f7fafc;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(77, 184, 216, 0.2);
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

        .button-group {
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }

        @media (max-width: 640px) {
          .card {
            padding: 40px 30px;
          }

          h1 {
            font-size: 24px;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="page-container">
        <div className="card">
          <div className="progress-container">
            <div className="step-indicator">الخطوة {step} من 3</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>

          <div className="logo-container">
            <h1>إنشاء حسابك</h1>
            <p className="subtitle">
              لديك حساب بالفعل؟ <span className="login-link" onClick={goToLogin}>تسجيل الدخول</span>
            </p>
          </div>

          {step === 1 && (
            <div>
              <div className="form-group">
                <label className="form-label">الاسم الكامل</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    className="input"
                    placeholder="أدخل اسمك الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">البريد الإلكتروني</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    className="input"
                    placeholder="example@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
              </div>

              <button className="primary-btn" onClick={handleNextStep}>
                <div className="btn-content">
                  <span>التالي</span>
                  <ArrowLeft size={20} />
                </div>
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="form-group">
                <label className="form-label">كلمة المرور</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
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

              <div className="form-group">
                <label className="form-label">رقم الهاتف</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={20} />
                  <input
                    type="tel"
                    className="input"
                    placeholder="+20 123 456 7890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="button-group">
                <button className="secondary-btn" onClick={handlePrevStep}>
                  <div className="btn-content">
                    <ArrowRight size={20} />
                    <span>السابق</span>
                  </div>
                </button>
                <button className="primary-btn" onClick={handleNextStep}>
                  <div className="btn-content">
                    <span>التالي</span>
                    <ArrowLeft size={20} />
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="form-group">
                <label className="form-label">المدينة</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="text"
                    className="input"
                    placeholder="أدخل مدينتك"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">العنوان</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="text"
                    className="input"
                    placeholder="أدخل عنوانك بالتفصيل"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="button-group">
                <button className="secondary-btn" onClick={handlePrevStep}>
                  <div className="btn-content">
                    <ArrowRight size={20} />
                    <span>السابق</span>
                  </div>
                </button>
                <button className="primary-btn" onClick={handleNextStep} disabled={isLoading}>
                  <div className="btn-content">
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        <span>جاري إنشاء الحساب...</span>
                      </>
                    ) : (
                      <span>إنشاء الحساب</span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}