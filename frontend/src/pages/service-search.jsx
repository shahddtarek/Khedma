import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Wrench, Hammer, Paintbrush } from 'lucide-react';
import * as dataService from '../services/dataService';
import { useAuth } from '../context/AuthContext.jsx';

export default function ServicesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [registeredWorkers, setRegisteredWorkers] = useState([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [orderForm, setOrderForm] = useState({
    serviceName: '',
    description: '',
    appointmentDate: '',
    phone: '',
  });
  const [orderSubmitting, setOrderSubmitting] = useState(false);

  // بيانات أكثر واقعية للحرفيين
  const staticWorkers = [
    {
      id: 1,
      name: "إبراهيم محمد",
      profession: "naqash",
      profession_ar: "نقاش",
      distance: 1.2,
      rating: 4.9,
      status: "available",
      completedJobs: 156,
      yearsExp: 8
    },
    {
      id: 2,
      name: "يوسف محمود",
      profession: "carpenter",
      profession_ar: "نجار",
      distance: 5.3,
      rating: 4.7,
      status: "available",
      completedJobs: 203,
      yearsExp: 12
    },
    {
      id: 3,
      name: "خالد علي",
      profession: "plumber",
      profession_ar: "سباك",
      distance: 3.1,
      rating: 4.5,
      status: "busy",
      completedJobs: 89,
      yearsExp: 5
    },
    {
      id: 4,
      name: "عمر حسن",
      profession: "electrician",
      profession_ar: "كهربائي",
      distance: 2.4,
      rating: 4.8,
      status: "available",
      completedJobs: 178,
      yearsExp: 10
    },
    {
      id: 5,
      name: "أحمد سالم",
      profession: "hvac",
      profession_ar: "فني تكييفات",
      distance: 4.8,
      rating: 4.6,
      status: "available",
      completedJobs: 134,
      yearsExp: 7
    },
    {
      id: 6,
      name: "محمد عبدالله",
      profession: "electronics",
      profession_ar: "فني إلكترونيات",
      distance: 6.2,
      rating: 4.4,
      status: "available",
      completedJobs: 92,
      yearsExp: 6
    },
    {
      id: 7,
      name: "حسن إبراهيم",
      profession: "carpenter",
      profession_ar: "نجار",
      distance: 3.7,
      rating: 4.9,
      status: "busy",
      completedJobs: 245,
      yearsExp: 15
    },
    {
      id: 8,
      name: "سعيد أحمد",
      profession: "plumber",
      profession_ar: "سباك",
      distance: 2.1,
      rating: 4.7,
      status: "available",
      completedJobs: 167,
      yearsExp: 9
    }
  ].map((worker) => ({ ...worker, isRegistered: false }));

  const categories = [
    { key: "all", name: "الكل", icon: Zap, color: "#2563eb", bg: "#eff6ff" },
    { key: "electrician", name: "الكهرباء", icon: Zap, color: "#eab308", bg: "#fef9c3" },
    { key: "plumber", name: "السباكة", icon: Wrench, color: "#06b6d4", bg: "#cffafe" },
    { key: "carpenter", name: "النجارة", icon: Hammer, color: "#8b5cf6", bg: "#ede9fe" },
    { key: "hvac", name: "فني تكييفات", icon: Paintbrush, color: "#0ea5e9", bg: "#e0f2fe" },
    { key: "naqash", name: "نقاشة", icon: Paintbrush, color: "#f97316", bg: "#ffedd5" },
    { key: "electronics", name: "فني إلكترونيات", icon: Zap, color: "#22c55e", bg: "#dcfce7" }
  ];

  useEffect(() => {
    const workers = dataService.getAllWorkers();
    const mapped = workers.map((worker) => {
      const ratingStats = dataService.getRatingStatsForUser?.(worker.id) || { average: 0 };
      const jobs = dataService.getJobsForWorker?.(worker.id) || [];
      const completedCount = jobs.filter((job) => job.status === 'completed').length;

      return {
        id: worker.id,
        name: worker.fullName || worker.name || worker.email,
        profession: worker.professionKey,
        profession_ar: worker.profession_ar || 'حرفي',
        distance: (Math.random() * 5 + 1).toFixed(1),
        rating: ratingStats.average ? Number(ratingStats.average.toFixed(1)) : 0,
        status: 'available',
        completedJobs: completedCount,
        yearsExp: worker.yearsExperience || 1,
        photos: worker.workPhotos || worker.photos || [],
        isRegistered: true,
        profilePhoto: worker.profilePhoto || null,
      };
    });
    setRegisteredWorkers(mapped);
  }, []);

  const allWorkersData = [...staticWorkers, ...registeredWorkers];

  const handleOrderNow = (worker) => {
    if (!user) {
      alert('يرجى تسجيل الدخول لتقديم طلب خدمة.');
      return;
    }
    if (!worker?.isRegistered) {
      alert('هذا المزود للعرض فقط. اختر مزوداً مسجلاً لعمل طلب حقيقي.');
      return;
    }
    setSelectedWorker(worker);
    setOrderForm({
      serviceName: worker.profession_ar || '',
      description: '',
      appointmentDate: '',
      phone: user?.phone || '',
    });
    setOrderModalOpen(true);
  };

  const handleOrderSubmit = (event) => {
    event.preventDefault();
    if (!selectedWorker || !user) return;
    if (!orderForm.description || !orderForm.appointmentDate) {
      alert('من فضلك اكتب وصف المشكلة وحدد موعداً مناسباً.');
      return;
    }
    setOrderSubmitting(true);
    try {
      dataService.createJob({
        clientId: user.id,
        clientName: user.fullName || user.name || user.email,
        workerId: selectedWorker.id,
        workerName: selectedWorker.name,
        serviceName: orderForm.serviceName || selectedWorker.profession_ar,
        description: orderForm.description,
        phone: orderForm.phone || user.phone || 'غير محدد',
        location: user.address || user.city || 'غير محدد',
        appointmentDate: orderForm.appointmentDate,
      });
      alert('تم إرسال طلبك بنجاح! سيتم إشعار المزود فوراً.');
      setOrderModalOpen(false);
      setOrderForm({
        serviceName: '',
        description: '',
        appointmentDate: '',
        phone: '',
      });
      setSelectedWorker(null);
    } catch (error) {
      alert(error.message || 'حدث خطأ أثناء إرسال الطلب');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setSelectedWorker(null);
    setOrderForm({
      serviceName: '',
      description: '',
      appointmentDate: '',
      phone: user?.phone || '',
    });
  };

  // دالة لفتح صفحة الملف الشخصي
  const handleViewProfile = (worker) => {
    if (worker.id) {
      navigate(`/provider-profile/${worker.id}`, { state: { provider: worker } });
    } else {
      navigate('/provider-profile', { state: { provider: worker } });
    }
  };

  // تصفية البيانات
  const filteredWorkers = allWorkersData.filter(worker => {
    const matchesCategory = selectedCategory === 'all' || worker.profession === selectedCategory;
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.profession_ar.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        }

        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          animation: pageFadeIn 0.8s ease-out;
        }

        .header-section {
          text-align: center;
          margin-bottom: 48px;
          margin-top: 20px;
        }

        .main-title {
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6 0%, #38BDF8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
        }

        .subtitle {
          font-size: clamp(16px, 2vw, 20px);
          color: #6B7280;
          margin-bottom: 32px;
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 50px;
          padding: 8px 24px;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .search-icon {
          color: #3B82F6;
          font-size: 20px;
          margin-left: 12px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          padding: 12px 0;
          color: #1F2937;
        }

        .search-input::placeholder {
          color: #9CA3AF;
        }

        .categories-section {
          margin: 48px 0;
          text-align: center;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          max-width: 900px;
          margin: 0 auto;
        }

        .category-card {
          border-radius: 20px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border: 2px solid #e5e7eb;
          background: white;
          transition: all 0.25s ease;
        }

        .category-card.active {
          border-color: #3b82f6;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.25);
        }

        .category-main {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .category-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-name {
          font-weight: 600;
          font-size: 15px;
          color: #111827;
        }

        .results-section {
          margin-top: 48px;
        }

        .results-header {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 32px;
          text-align: center;
        }

        .workers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .worker-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: workerFadeIn 0.5s ease both;
        }

        .worker-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }

        .card-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #60A5FA, #38BDF8);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .worker-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.5s ease;
        }

        .worker-card:hover .worker-photo {
          transform: scale(1.05);
        }

        .placeholder-icon {
          font-size: 40px;
          opacity: 0.4;
          animation: floatIcon 4s ease-in-out infinite alternate;
        }

        .status-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .status-available {
          background: rgba(34, 197, 94, 0.9);
          color: white;
        }

        .status-busy {
          background: rgba(239, 68, 68, 0.9);
          color: white;
        }

        @keyframes floatIcon {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }

        @keyframes workerFadeIn {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pageFadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .card-body {
          padding: 20px;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .worker-info h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 4px;
        }

        .profession {
          font-size: 14px;
          color: #6B7280;
        }

        .rating-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #FCD34D, #F59E0B);
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 700;
          color: white;
          font-size: 14px;
        }

        .stats-row {
          display: flex;
          gap: 16px;
          margin: 16px 0;
          padding: 12px 0;
          border-top: 1px solid #F3F4F6;
          border-bottom: 1px solid #F3F4F6;
        }

        .stat-item {
          flex: 1;
          text-align: center;
        }

        .stat-value {
          font-size: 16px;
          font-weight: 700;
          color: #3B82F6;
          display: block;
        }

        .stat-label {
          font-size: 12px;
          color: #6B7280;
          margin-top: 4px;
        }

        .distance-info {
          color: #6B7280;
          font-size: 14px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #3B82F6;
          border: 2px solid #3B82F6;
        }

        .btn-secondary:hover {
          background: #EFF6FF;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #6B7280;
        }

        .no-results-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.3;
        }

        .no-results-text {
          font-size: 20px;
          font-weight: 600;
        }

        .order-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.58);
          backdrop-filter: blur(4px);
          z-index: 40;
        }

        .order-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(520px, 92%);
          background: #ffffff;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 30px 70px rgba(15, 23, 42, 0.25);
          z-index: 41;
        }

        .order-modal h3 {
          font-size: 22px;
          margin-bottom: 6px;
        }

        .order-modal p {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .order-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .order-form-group label {
          font-weight: 600;
          font-size: 14px;
          color: #0f172a;
        }

        .order-form-input {
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 10px 12px;
          font-family: 'Tajawal', sans-serif;
          font-size: 14px;
        }

        .order-form-textarea {
          min-height: 90px;
          resize: vertical;
        }

        .order-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .order-submit-btn,
        .order-cancel-btn {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Tajawal', sans-serif;
        }

        .order-submit-btn {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
        }

        .order-submit-btn:disabled {
          opacity: 0.7;
          cursor: progress;
        }

        .order-cancel-btn {
          background: #f1f5f9;
          color: #475569;
        }

        @media (max-width: 768px) {
          .workers-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .categories-grid {
            gap: 8px;
          }
        }
      `}</style>

      <div className="main-container">
        <header className="header-section">
          <h1 className="main-title">خدماتنا</h1>
          <p className="subtitle">أهلاً بك في خدمة لتقديم خدمات الحرفيين المحترفين</p>
          
          <div className="search-container">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="ابحث بالاسم أو المهنة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <section className="categories-section">
          <div className="categories-grid">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.key;
              return (
                <div
                  key={category.key}
                  className={`category-card ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.key)}
                  style={{ backgroundColor: category.bg }}
                >
                  <div className="category-main">
                    <div
                      className="category-icon-wrapper"
                      style={{ backgroundColor: '#ffffff', color: category.color }}
                    >
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="category-name">{category.name}</span>
                  </div>
                  <span style={{ color: category.color }}>●</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="results-section">
          <h2 className="results-header">
            {filteredWorkers.length > 0
              ? `وجدنا ${filteredWorkers.length} حرفي متاح`
              : 'نتائج البحث'}
          </h2>

          {filteredWorkers.length > 0 ? (
            <div className="workers-grid">
              {filteredWorkers.map(worker => (
                <div key={worker.id} className="worker-card">
                  <div className="card-image">
                    {worker.profilePhoto ? (
                      <img
                        src={worker.profilePhoto}
                        alt={`صورة ${worker.name}`}
                        className="worker-photo"
                      />
                    ) : (
                      <span className="placeholder-icon">👷</span>
                    )}
                    <span className={`status-badge ${worker.status === 'available' ? 'status-available' : 'status-busy'}`}>
                      {worker.status === 'available' ? '✓ متاح الآن' : '⏱ مشغول'}
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="card-header-row">
                      <div className="worker-info">
                        <h3>{worker.name}</h3>
                        <p className="profession">{worker.profession_ar}</p>
                        {worker.photos && worker.photos.length > 0 && (
                          <p className="profession" style={{ marginTop: '4px', fontSize: '12px' }}>
                            لديه {worker.photos.length} صور لأعماله
                          </p>
                        )}
                      </div>
                      <div className="rating-badge">
                        <span>⭐</span>
                        <span>{worker.rating}</span>
                      </div>
                    </div>

                    <div className="stats-row">
                      <div className="stat-item">
                        <span className="stat-value">{worker.completedJobs}</span>
                        <span className="stat-label">عملية منجزة</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">{worker.yearsExp}</span>
                        <span className="stat-label">سنوات خبرة</span>
                      </div>
                    </div>

                    <div className="distance-info">
                      <span>📍</span>
                      <span>على بعد {worker.distance} كم</span>
                    </div>

                    <div className="card-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleOrderNow(worker)}
                      >
                        اطلب الآن
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleViewProfile(worker)}
                      >
                        عرض الملف الشخصي
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <p className="no-results-text">لم نجد نتائج مطابقة لبحثك</p>
              <p style={{marginTop: '12px', color: '#9CA3AF'}}>جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
            </div>
          )}
        </section>

        {orderModalOpen && selectedWorker && (
          <>
            <div className="order-modal-backdrop" onClick={closeOrderModal}></div>
            <div className="order-modal">
              <h3>طلب خدمة من {selectedWorker.name}</h3>
              <p>سيتم إرسال تفاصيلك فوراً إلى المزود ليؤكد الموعد.</p>
              <form onSubmit={handleOrderSubmit}>
                <div className="order-form-group">
                  <label>نوع الخدمة</label>
                  <input
                    className="order-form-input"
                    type="text"
                    value={orderForm.serviceName}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, serviceName: e.target.value }))}
                  />
                </div>
                <div className="order-form-group">
                  <label>وصف المشكلة</label>
                  <textarea
                    className="order-form-input order-form-textarea"
                    value={orderForm.description}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="اشرح احتياجك ليقدر المزود مدة وتكلفة الخدمة"
                  />
                </div>
                <div className="order-form-group">
                  <label>ميعاد الزيارة</label>
                  <input
                    className="order-form-input"
                    type="datetime-local"
                    value={orderForm.appointmentDate}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, appointmentDate: e.target.value }))}
                  />
                </div>
                <div className="order-form-group">
                  <label>رقم التواصل</label>
                  <input
                    className="order-form-input"
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="رقم هاتفك لتأكيد الموعد"
                  />
                </div>
                <div className="order-modal-actions">
                  <button type="submit" className="order-submit-btn" disabled={orderSubmitting}>
                    {orderSubmitting ? 'يتم الإرسال...' : 'تأكيد الطلب'}
                  </button>
                  <button type="button" className="order-cancel-btn" onClick={closeOrderModal}>
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}