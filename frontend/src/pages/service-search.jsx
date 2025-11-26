import { useState } from 'react';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // بيانات أكثر واقعية للحرفيين
  const allWorkersData = [
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
  ];

  const categories = [
    { key: "all", name: "الكل", icon: "🔧" },
    { key: "electrician", name: "الكهرباء", icon: "⚡" },
    { key: "plumber", name: "السباكة", icon: "🚰" },
    { key: "carpenter", name: "النجارة", icon: "🪚" },
    { key: "hvac", name: "فني تكييفات", icon: "❄️" },
    { key: "naqash", name: "نقاشة", icon: "🎨" },
    { key: "electronics", name: "فني إلكترونيات", icon: "🔌" }
  ];

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
        }

        .header-section {
          text-align: center;
          margin-bottom: 48px;
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
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .category-btn {
          padding: 12px 24px;
          border-radius: 50px;
          border: 2px solid #E5E7EB;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #4B5563;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
          border-color: #3B82F6;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
          border-color: transparent;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
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
        }

        .placeholder-icon {
          font-size: 64px;
          opacity: 0.3;
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

        @media (max-width: 768px) {
          .workers-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .categories-grid {
            gap: 8px;
          }
          
          .category-btn {
            padding: 10px 18px;
            font-size: 14px;
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
            {categories.map(category => (
              <button
                key={category.key}
                className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
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
                    <span className="placeholder-icon">👷</span>
                    <span className={`status-badge ${worker.status === 'available' ? 'status-available' : 'status-busy'}`}>
                      {worker.status === 'available' ? '✓ متاح الآن' : '⏱ مشغول'}
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="card-header-row">
                      <div className="worker-info">
                        <h3>{worker.name}</h3>
                        <p className="profession">{worker.profession_ar}</p>
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
                      <button className="btn btn-primary">اطلب الآن</button>
                      <button className="btn btn-secondary">عرض الملف الشخصي</button>
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
      </div>
    </div>
  );
}