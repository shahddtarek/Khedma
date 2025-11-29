import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const WORKER_SPECIALTIES = [
  { key: 'electrician', label: 'كهربائي' },
  { key: 'plumber', label: 'سباك' },
  { key: 'carpenter', label: 'نجار' },
  { key: 'painting', label: 'دهانات' },
  { key: 'other', label: 'خدمة أخرى' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('user'); // 'worker' | 'user'
  const [specialtyKey, setSpecialtyKey] = useState('electrician');
  const [workPhotos, setWorkPhotos] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableHours, setAvailableHours] = useState('');
  const [yearsExperience, setYearsExperience] = useState(1);
  const [error, setError] = useState('');
  const { register: registerUser } = useAuth();
  const DAYS_OF_WEEK = [
    { key: 'sunday', label: 'الأحد' },
    { key: 'monday', label: 'الإثنين' },
    { key: 'tuesday', label: 'الثلاثاء' },
    { key: 'wednesday', label: 'الأربعاء' },
    { key: 'thursday', label: 'الخميس' },
    { key: 'friday', label: 'الجمعة' },
    { key: 'saturday', label: 'السبت' },
  ];

  const validateStep = () => {
    if (step === 1) {
      if (!fullName.trim() || !signupEmail.trim()) {
        setError('الرجاء إدخال الاسم الكامل والبريد الإلكتروني');
        return false;
      }
    }
    if (step === 2) {
      if (!signupPassword.trim() || !phoneNumber.trim()) {
        setError('الرجاء إدخال كلمة المرور ورقم الهاتف');
        return false;
      }
      if (!confirmPassword.trim() || confirmPassword.trim() !== signupPassword.trim()) {
        setError('تأكيد كلمة المرور غير مطابق');
        return false;
      }
    }
    if (step === 3) {
      if (!city.trim() || !address.trim()) {
        setError('الرجاء إدخال المدينة والعنوان');
        return false;
      }
      if (role === 'worker' && !specialtyKey) {
        setError('الرجاء اختيار نوع الخدمة التي تقدمها');
        return false;
      }
      if (role === 'worker' && availableDays.length === 0) {
        setError('الرجاء اختيار أيام العمل المتاحة');
        return false;
      }
      if (role === 'worker' && !availableHours.trim()) {
        setError('الرجاء إدخال ساعات العمل المتاحة');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNextStep = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    await handleSubmit();
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
    setError('');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handlePhotosChange = async (event) => {
    const files = Array.from(event.target.files || []);
    const limited = files.slice(0, 5);
    try {
      const base64Photos = await Promise.all(limited.map((file) => convertFileToBase64(file)));
      setWorkPhotos(base64Photos);
    } catch (photoError) {
      console.error(photoError);
      setError('حدث خطأ أثناء تحميل الصور');
    }
  };

  const toggleDay = (dayKey) => {
    setAvailableDays((prev) =>
      prev.includes(dayKey) ? prev.filter((day) => day !== dayKey) : [...prev, dayKey],
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const selectedSpecialty = WORKER_SPECIALTIES.find((s) => s.key === specialtyKey);

      await registerUser({
        fullName: fullName.trim(),
        email: signupEmail.trim(),
        password: signupPassword.trim(),
        phoneNumber: phoneNumber.trim(),
        city: city.trim(),
        address: address.trim(),
        role,
        professionKey: role === 'worker' ? specialtyKey : null,
        profession_ar: role === 'worker' ? selectedSpecialty?.label || null : null,
        availableDays: role === 'worker' ? availableDays : [],
        availableHours: role === 'worker' ? availableHours.trim() : '',
        yearsExperience: role === 'worker' ? Number(yearsExperience) : 0,
        workPhotos: role === 'worker' ? workPhotos : [],
        photos: role === 'worker' ? workPhotos : [],
      });

      if (role === 'worker') {
        navigate('/worker-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setIsLoading(false);
    }
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
          background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .page-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 55%),
                            radial-gradient(circle at bottom right, rgba(56,189,248,0.2), transparent 55%);
          opacity: 0.9;
        }

        .card {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
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
          color: #3B82F6;
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
          background: linear-gradient(90deg, #3B82F6 0%, #38BDF8 100%);
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
          color: #3B82F6;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .login-link:hover {
          color: #1D4ED8;
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
          border-color: #3B82F6;
          background: white;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
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
          color: #3B82F6;
        }

        .primary-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3B82F6 0%, #38BDF8 100%);
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
          box-shadow: 0 12px 28px rgba(59, 130, 246, 0.4);
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
          color: #3B82F6;
          border: 2px solid #3B82F6;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Tajawal", sans-serif;
        }

        .secondary-btn:hover {
          background: #EFF6FF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .error-banner {
          margin-bottom: 20px;
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.1);
          color: #b91c1c;
          font-weight: 600;
          text-align: center;
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

        .role-toggle {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .role-option {
          flex: 1;
          padding: 10px 16px;
          border-radius: 999px;
          border: 2px solid #e2e8f0;
          background: #f7fafc;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .role-option.active {
          border-color: #4db8d8;
          background: #e0f2fe;
          color: #0f172a;
          box-shadow: 0 4px 12px rgba(77, 184, 216, 0.3);
        }

        .helper-text {
          font-size: 13px;
          color: #718096;
          margin-top: 4px;
        }

        .specialty-select {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          background: #f7fafc;
          font-family: "Tajawal", sans-serif;
          font-size: 14px;
        }

        .specialty-select:focus {
          outline: none;
          border-color: #4db8d8;
          background: white;
          box-shadow: 0 0 0 4px rgba(77, 184, 216, 0.15);
        }

        .days-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .day-chip {
          flex: 1 1 30%;
          min-width: 90px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          background: #f7fafc;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .day-chip.active {
          border-color: #3B82F6;
          background: rgba(59, 130, 246, 0.1);
          color: #0f172a;
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.2);
        }

        .photos-input {
          font-size: 13px;
          color: #4a5568;
        }

        .photos-hint {
          font-size: 12px;
          color: #a0aec0;
          margin-top: 4px;
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

          {error && <div className="error-banner">{error}</div>}

          {step === 1 && (
            <div>
              <div className="form-group">
                <label className="form-label">نوع الحساب</label>
                <div className="role-toggle">
                  <button
                    type="button"
                    className={`role-option ${role === 'user' ? 'active' : ''}`}
                    onClick={() => setRole('user')}
                  >
                    مستخدم
                  </button>
                  <button
                    type="button"
                    className={`role-option ${role === 'worker' ? 'active' : ''}`}
                    onClick={() => setRole('worker')}
                  >
                    عامل
                  </button>
                </div>
                <p className="helper-text">
                  اختر إذا كنت تبحث عن خدمة (مستخدم) أو تقدم خدمة (عامل).
                </p>
              </div>

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
                <label className="form-label">تأكيد كلمة المرور</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="أعد إدخال كلمة المرور"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
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

              {role === 'worker' && (
                <>
                  <div className="form-group">
                    <label className="form-label">نوع الخدمة التي تقدمها</label>
                    <select
                      className="specialty-select"
                      value={specialtyKey}
                      onChange={(e) => setSpecialtyKey(e.target.value)}
                    >
                      {WORKER_SPECIALTIES.map((spec) => (
                        <option key={spec.key} value={spec.key}>
                          {spec.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">صور من أعمالك (اختياري)</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotosChange}
                      className="photos-input"
                    />
                    <p className="photos-hint">
                      يمكنك رفع حتى 5 صور لعرض نماذج من أعمالك للعملاء.
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">أيام العمل المتاحة</label>
                    <div className="days-grid">
                      {DAYS_OF_WEEK.map((day) => (
                        <button
                          key={day.key}
                          type="button"
                          className={`day-chip ${availableDays.includes(day.key) ? 'active' : ''}`}
                          onClick={() => toggleDay(day.key)}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">ساعات العمل</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="مثال: من ٤ مساءً إلى ٩ مساءً"
                      value={availableHours}
                      onChange={(e) => setAvailableHours(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">سنوات الخبرة</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      className="input"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                    />
                  </div>
                </>
              )}

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