import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PaymentPage() {
  const location = useLocation();
  const provider = location?.state?.provider;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('digital');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardName: ''
  });
  const [errors, setErrors] = useState({});

  // معلومات الخدمة - استخدام البيانات من provider أو القيم الافتراضية
  const serviceInfo = {
    name: provider ? `خدمة ${provider.profession_ar}` : 'خدمة نجار محترف',
    price: 100,
    workerName: provider?.name || 'يوسف محمود',
    rating: provider?.rating || 4.7,
    duration: '2-3 ساعات'
  };

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setFormData({
      cardNumber: '',
      expDate: '',
      cvv: '',
      cardName: ''
    });
    setErrors({});
  };

  const handleContinue = () => {
    if (paymentMethod === 'cod') {
      // محاكاة التحقق من تسجيل الدخول
      const isLoggedIn = false; // غير هذه القيمة لـ true لاختبار حالة تسجيل الدخول
      
      if (isLoggedIn) {
        setCurrentStep(3);
      } else {
        alert('لإتمام الطلب بالدفع عند الاستلام، يرجى تسجيل الدخول أولاً.');
        closeModal();
      }
    } else {
      setCurrentStep(2);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'اسم حامل البطاقة مطلوب';
    }
    
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'رقم البطاقة يجب أن يكون 16 رقم';
    }
    
    if (!formData.expDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expDate)) {
      newErrors.expDate = 'التاريخ يجب أن يكون بصيغة MM/YY';
    }
    
    if (!formData.cvv.trim() || formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV يجب أن يكون 3 أرقام';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // محاكاة معالجة الدفع
      setTimeout(() => {
        setCurrentStep(3);
      }, 500);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setFormData({...formData, cardNumber: formatted});
    }
  };

  const handleExpDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData({...formData, expDate: value});
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
          padding: 40px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-card {
          max-width: 500px;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-header {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          padding: 32px;
          text-align: center;
          color: white;
        }

        .service-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .service-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .worker-info {
          font-size: 14px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .card-body {
          padding: 32px;
        }

        .service-details {
          margin-bottom: 24px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          color: #6B7280;
          font-size: 14px;
        }

        .detail-value {
          font-weight: 600;
          color: #1F2937;
        }

        .price-section {
          background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-label {
          font-size: 18px;
          font-weight: 600;
          color: #1F2937;
        }

        .price-value {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pay-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .pay-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #F3F4F6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
        }

        .close-button {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #F3F4F6;
          color: #6B7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: #E5E7EB;
          color: #1F2937;
        }

        .modal-body {
          padding: 24px;
        }

        .invoice-list {
          list-style: none;
          margin-bottom: 24px;
        }

        .invoice-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .invoice-item:last-child {
          border-bottom: none;
          font-weight: 700;
          font-size: 18px;
          color: #1F2937;
          padding-top: 16px;
          margin-top: 8px;
          border-top: 2px solid #3B82F6;
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .payment-option {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .payment-option:hover {
          border-color: #3B82F6;
          background: #EFF6FF;
        }

        .payment-option.selected {
          border-color: #3B82F6;
          background: #EFF6FF;
        }

        .payment-option input[type="radio"] {
          margin-left: 12px;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .payment-label {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .payment-icon {
          font-size: 24px;
        }

        .payment-text {
          display: flex;
          flex-direction: column;
        }

        .payment-name {
          font-weight: 600;
          color: #1F2937;
        }

        .payment-desc {
          font-size: 12px;
          color: #6B7280;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input.error {
          border-color: #EF4444;
        }

        .error-message {
          color: #EF4444;
          font-size: 12px;
          margin-top: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 16px;
        }

        .card-preview {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          padding: 24px;
          border-radius: 16px;
          color: white;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .card-chip {
          width: 40px;
          height: 30px;
          background: linear-gradient(135deg, #FCD34D, #F59E0B);
          border-radius: 6px;
          margin-bottom: 24px;
        }

        .card-number {
          font-size: 20px;
          letter-spacing: 3px;
          margin-bottom: 16px;
          font-family: 'Courier New', monospace;
        }

        .card-info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          opacity: 0.9;
        }

        .success-container {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10B981, #34D399);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 40px;
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 12px;
        }

        .success-message {
          color: #6B7280;
          margin-bottom: 8px;
        }

        .order-number {
          font-size: 18px;
          font-weight: 700;
          color: #3B82F6;
          margin-bottom: 24px;
        }

        .modal-footer {
          padding: 20px 24px;
          border-top: 1px solid #F3F4F6;
          display: flex;
          gap: 12px;
        }

        .btn {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary {
          background: #F3F4F6;
          color: #6B7280;
        }

        .btn-secondary:hover {
          background: #E5E7EB;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .btn-success {
          background: linear-gradient(135deg, #10B981, #34D399);
          color: white;
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            margin: 0;
            border-radius: 16px;
          }
        }
      `}</style>

      <div className="service-card">
        <div className="card-header">
          <div className="service-icon">🔨</div>
          <h1 className="service-title">{serviceInfo.name}</h1>
          <div className="worker-info">
            <span>مع {serviceInfo.workerName}</span>
            <span>⭐ {serviceInfo.rating}</span>
          </div>
        </div>

        <div className="card-body">
          <div className="service-details">
            <div className="detail-row">
              <span className="detail-label">المدة المتوقعة</span>
              <span className="detail-value">⏱ {serviceInfo.duration}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">نوع الخدمة</span>
              <span className="detail-value">نجارة منزلية</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">الضمان</span>
              <span className="detail-value">✓ 7 أيام</span>
            </div>
          </div>

          <div className="price-section">
            <div className="price-row">
              <span className="price-label">الإجمالي</span>
              <span className="price-value">{serviceInfo.price} جنيه</span>
            </div>
          </div>

          <button className="pay-button" onClick={openModal}>
            ادفع الآن واحجز الخدمة
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {currentStep === 1 && 'إتمام عملية الدفع'}
                {currentStep === 2 && 'أدخل بيانات البطاقة'}
                {currentStep === 3 && 'تم الدفع بنجاح'}
              </h2>
              <button className="close-button" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              {currentStep === 1 && (
                <>
                  <ul className="invoice-list">
                    <li className="invoice-item">
                      <span>تأكيد حجز الخدمة</span>
                      <span>{serviceInfo.price} جنيه</span>
                    </li>
                    <li className="invoice-item">
                      <span>رسوم الخدمة</span>
                      <span>مجاناً</span>
                    </li>
                    <li className="invoice-item">
                      <span>الإجمالي</span>
                      <span>{serviceInfo.price} جنيه</span>
                    </li>
                  </ul>

                  <div className="payment-methods">
                    <label className={`payment-option ${paymentMethod === 'digital' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="digital"
                        checked={paymentMethod === 'digital'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-label">
                        <span className="payment-icon">💳</span>
                        <div className="payment-text">
                          <span className="payment-name">دفع رقمي</span>
                          <span className="payment-desc">بطاقة ائتمانية أو مدى</span>
                        </div>
                      </div>
                    </label>

                    <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-label">
                        <span className="payment-icon">💵</span>
                        <div className="payment-text">
                          <span className="payment-name">الدفع عند الاستلام</span>
                          <span className="payment-desc">ادفع نقداً بعد إتمام الخدمة</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="card-preview">
                    <div className="card-chip"></div>
                    <div className="card-number">
                      {formData.cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-info">
                      <div>
                        <div style={{fontSize: '10px', marginBottom: '4px'}}>اسم حامل البطاقة</div>
                        <div>{formData.cardName || 'الاسم الكامل'}</div>
                      </div>
                      <div>
                        <div style={{fontSize: '10px', marginBottom: '4px'}}>تاريخ الانتهاء</div>
                        <div>{formData.expDate || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">اسم حامل البطاقة</label>
                      <input
                        type="text"
                        className={`form-input ${errors.cardName ? 'error' : ''}`}
                        placeholder="الاسم كما يظهر على البطاقة"
                        value={formData.cardName}
                        onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                      />
                      {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">رقم البطاقة</label>
                      <input
                        type="text"
                        className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                      />
                      {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          className={`form-input ${errors.expDate ? 'error' : ''}`}
                          placeholder="MM/YY"
                          value={formData.expDate}
                          onChange={handleExpDateChange}
                          maxLength="5"
                        />
                        {errors.expDate && <div className="error-message">{errors.expDate}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className={`form-input ${errors.cvv ? 'error' : ''}`}
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                              setFormData({...formData, cvv: value});
                            }
                          }}
                          maxLength="3"
                        />
                        {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                      </div>
                    </div>
                  </form>
                </>
              )}

              {currentStep === 3 && (
                <div className="success-container">
                  <div className="success-icon">✓</div>
                  <h3 className="success-title">تم الدفع بنجاح!</h3>
                  <p className="success-message">تم تأكيد حجزك بنجاح</p>
                  <p className="order-number">رقم العملية: #ORD-{Math.floor(Math.random() * 100000)}</p>
                  <p className="success-message" style={{fontSize: '14px'}}>
                    سيتم التواصل معك قريباً لتأكيد موعد الخدمة
                  </p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {currentStep === 1 && (
                <>
                  <button className="btn btn-secondary" onClick={closeModal}>
                    إلغاء
                  </button>
                  <button className="btn btn-primary" onClick={handleContinue}>
                    متابعة
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                    رجوع
                  </button>
                  <button className="btn btn-success" onClick={handleSubmit}>
                    تأكيد الدفع
                  </button>
                </>
              )}

              {currentStep === 3 && (
                <button className="btn btn-primary" onClick={closeModal}>
                  تم
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
