import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import * as dataService from '../services/dataService';
import { detailedCategories } from '../data/serviceCategoriesData';
import example1 from '../assets/Images/example1.jpeg';
import example2 from '../assets/Images/example2.jpeg';
import example3 from '../assets/Images/example3.jpeg';
import example4 from '../assets/Images/example4.jpeg';
import example5 from '../assets/Images/example5.jpeg';
import example6 from '../assets/Images/example6.jpeg';

export default function ServiceProviderProfile() {
  const location = useLocation();
  const { workerId } = useParams();
  const { user } = useAuth();
  const [workerData, setWorkerData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    description: '',
    name: '',
    phone: '',
    appointmentDate: '',
  });
  const [ratingSummary, setRatingSummary] = useState({
    average: 0,
    total: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    ratings: [],
  });

  useEffect(() => {
    if (workerId) {
      const worker = dataService.getUserById(workerId);
      if (worker) {
        setWorkerData(worker);
        return;
      }
    }
    if (location?.state?.provider) {
      const fromState = location.state.provider;
      if (fromState?.id) {
        const fullWorker = dataService.getUserById(fromState.id);
        setWorkerData(fullWorker || fromState);
      } else {
        setWorkerData(fromState);
      }
    }
  }, [workerId, location]);

  const providerSource = workerData || location?.state?.provider || null;
  const providerId = providerSource?.id || null;

  useEffect(() => {
    if (!providerId) return;
    setRatingSummary(dataService.getRatingStatsForUser(providerId));
  }, [providerId]);

  const provider = {
    id: providerSource?.id,
    name: providerSource?.fullName || providerSource?.name || 'مزود خدمة',
    job: providerSource ? `${providerSource.profession_ar || 'حرفي'} محترف` : 'سباك خبير',
    summary:
      providerSource?.bio?.trim() ||
      (providerSource
        ? `خبرة أكثر من ${providerSource.yearsExperience || providerSource.yearsExp || 5} سنوات في أعمال ${
            providerSource.profession_ar || 'الخدمات'
          }. موثوق من خدمة.`
        : 'خبرة أكثر من 10 سنوات في أعمال السباكة والصرف الصحي. موثوق من خدمة.'),
    rating: providerSource?.rating || 4.8,
    reviewsCount: providerSource?.completedJobs || 125,
    profession: providerSource?.professionKey || providerSource?.profession || 'plumber',
    professionKey: providerSource?.professionKey || providerSource?.profession || null,
    profession_ar: providerSource?.profession_ar || 'سباك',
    availableDays: providerSource?.availableDays || [],
    availableHours: providerSource?.availableHours || '',
    yearsExperience: providerSource?.yearsExperience || providerSource?.yearsExp || 5,
    workPhotos: providerSource?.workPhotos || providerSource?.photos || [],
    profilePhoto: providerSource?.profilePhoto || null,
  };

  if (!providerSource) {
    return (
      <div className="provider-profile-page" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <p>لم يتم العثور على مزود الخدمة المطلوب.</p>
      </div>
    );
  }

  const dayLabels = {
    sunday: 'الأحد',
    monday: 'الإثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
  };

  const matchedCategory =
    detailedCategories.find((category) => category.key === provider.profession || category.key === provider.professionKey) ||
    detailedCategories.find((category) => category.title === provider.profession_ar);

  const services = matchedCategory
    ? matchedCategory.subServices.map((sub) => ({
        label: sub.name,
        features: sub.features,
      }))
    : [
        { label: 'إصلاح وصيانة المواسير', features: [] },
        { label: 'كشف تسربات المياه', features: [] },
        { label: 'تأسيس شبكات السباكة', features: [] },
        { label: 'تركيب الأدوات الصحية', features: [] },
        { label: 'تجديد سباكة الحمامات', features: [] },
        { label: 'صيانة وتركيب السخانات', features: [] },
      ];

  const availability = provider.availableDays.length
    ? provider.availableDays.map((day) => ({
        days: dayLabels[day] || day,
        time: provider.availableHours || 'مرن حسب الاتفاق',
        closed: false,
      }))
    : [
        { days: 'الإثنين - الخميس', time: 'من 5:00 م حتى 9:00 م', closed: false },
        { days: 'الجمعة', time: 'من 12:00 م حتى 9:00 م', closed: false },
        { days: 'السبت - الأحد', time: 'عطلة', closed: true },
      ];

  const hasRatings = ratingSummary.total > 0;
  const roundedAverage = hasRatings ? ratingSummary.average.toFixed(1) : '0.0';
  const averageStars = Math.round(ratingSummary.average || 0);
  const ratingBars = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percent: hasRatings ? Math.round(((ratingSummary.breakdown[stars] || 0) / ratingSummary.total) * 100) : 0,
    count: ratingSummary.breakdown[stars] || 0,
  }));
  const ratingList = ratingSummary.ratings;
  const workImages =
    provider.workPhotos && provider.workPhotos.length > 0
      ? provider.workPhotos
      : [example1, example2, example3, example4, example5, example6];

  const isElectrician =
    provider.professionKey === 'electrician' ||
    provider.profession === 'electrician' ||
    provider.profession_ar === 'الكهرباء' ||
    matchedCategory?.key === 'electrician';

  const electricServiceLabels = matchedCategory
    ? matchedCategory.subServices.map((sub) => sub.name)
    : services.map((service) => service.label);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serviceType || !formData.name || !formData.phone || !formData.appointmentDate) {
      alert('برجاء ملء جميع الحقول المطلوبة');
      return;
    }
    if (!user) {
      alert('يجب تسجيل الدخول أولاً لطلب خدمة');
      return;
    }
    if (!provider.id) {
      alert('لا يمكن تحديد مقدم الخدمة');
      return;
    }

    dataService.createJob({
      clientId: user.id,
      clientName: user.fullName || user.name,
      workerId: provider.id,
      workerName: provider.name,
      serviceName: formData.serviceType,
      description: formData.description,
      phone: formData.phone,
      location: user.address || user.city || 'غير محدد',
      appointmentDate: formData.appointmentDate,
    });

    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    setModalOpen(false);
    setFormData({ serviceType: '', description: '', name: '', phone: '', appointmentDate: '' });
  };

  return (
    <div className="provider-profile-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Tajawal', sans-serif;
          direction: rtl;
        }

        .provider-profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%);
          direction: rtl;
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
        }

        .card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        /* Profile Header */
        .profile-header {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .avatar-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60A5FA, #38BDF8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: white;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
          animation: floating 3s ease-in-out infinite;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .verified-badge {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 32px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .profile-job {
          font-size: 18px;
          color: #3B82F6;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .profile-summary {
          color: #64748b;
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .request-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          transition: all 0.3s;
          font-family: 'Tajawal', sans-serif;
        }

        .request-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        /* Section Title */
        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 24px;
        }

        /* Availability */
        .availability-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .availability-item:last-child {
          border-bottom: none;
        }

        /* Work Grid */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .work-item {
          aspect-ratio: 1;
          border-radius: 16px;
          background: #cbd5e1;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .work-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .work-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .work-item:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .work-item:hover img {
          transform: scale(1.08);
        }

        .work-item:hover::after {
          opacity: 1;
        }

        /* Rating Summary */
        .rating-summary {
          display: flex;
          gap: 48px;
          padding-bottom: 32px;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 32px;
        }

        .rating-score {
          text-align: center;
        }

        .rating-number {
          font-size: 56px;
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
        }

        .stars {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 12px;
        }

        .star {
          color: #fbbf24;
          font-size: 20px;
        }

        .rating-bars {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rating-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rating-bar {
          flex: 1;
          height: 10px;
          background: #e2e8f0;
          border-radius: 5px;
          overflow: hidden;
        }

        .rating-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          border-radius: 5px;
        }

        /* Reviews */
        .review-item {
          display: flex;
          gap: 16px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }

        .review-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .review-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 20px;
          flex-shrink: 0;
        }

        .review-content {
          flex: 1;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .review-name {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .review-text {
          color: #475569;
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .review-actions {
          display: flex;
          gap: 20px;
        }

        .review-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 2px solid #e2e8f0;
          cursor: pointer;
          font-family: 'Tajawal', sans-serif;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
          padding: 8px 16px;
          border-radius: 8px;
          color: #64748b;
          position: relative;
        }

        .review-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .review-btn.active-like {
          color: #3B82F6;
          background: #EFF6FF;
          border-color: #3B82F6;
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
        }

        .review-btn.active-dislike {
          color: #ef4444;
          background: #FEF2F2;
          border-color: #ef4444;
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
        }

        .review-btn-emoji {
          font-size: 18px;
          line-height: 1;
          transition: transform 0.2s;
        }

        .review-btn.active-like .review-btn-emoji,
        .review-btn.active-dislike .review-btn-emoji {
          transform: scale(1.2);
        }

        .review-btn-count {
          font-size: 14px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }

        .review-btn:active {
          transform: scale(0.95);
        }

        .review-btn.active-like:active {
          transform: scale(1);
        }

        .review-btn.active-dislike:active {
          transform: scale(1);
        }

        /* Sidebar */
        .sidebar {
          position: sticky;
          top: 120px;
          height: fit-content;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .service-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border: 1px solid #e5e7eb;
        }

        .service-name {
          font-weight: 700;
          color: #1e293b;
        }

        .service-features {
          margin: 0;
          padding-right: 18px;
          list-style: disc;
          color: #6b7280;
          font-size: 13px;
        }

        .electric-services-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .electric-services-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #fef9c3, #fde68a);
          border-radius: 14px;
          padding: 12px 16px;
          font-weight: 600;
          color: #92400e;
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.25);
          transform: translateX(12px);
          opacity: 0;
          animation: slideIn 0.4s forwards;
        }

        .electric-services-list li:nth-child(even) {
          background: linear-gradient(135deg, #e0f2fe, #bae6fd);
          color: #075985;
          box-shadow: 0 10px 25px rgba(14, 165, 233, 0.25);
        }

        .pulse-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #f97316;
          box-shadow: 0 0 0 rgba(249, 115, 22, 0.7);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
          }
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .no-reviews {
          margin-top: 12px;
          padding: 16px;
          border-radius: 12px;
          background: #f8fafc;
          color: #64748b;
          text-align: center;
          font-weight: 600;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 9998;
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 20px;
          padding: 40px;
          width: 90%;
          max-width: 550px;
          z-index: 9999;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.8s ease-out forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          left: 20px;
          background: none;
          border: none;
          font-size: 32px;
          font-weight: 700;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: #64748b;
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .label {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }

        .input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-family: 'Tajawal', sans-serif;
          font-size: 15px;
          transition: border-color 0.3s;
        }

        .input:focus {
          outline: none;
          border-color: #3B82F6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .layout {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .work-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .rating-summary {
            flex-direction: column;
            gap: 24px;
          }
          
          .profile-header {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
        }
      `}</style>

      <main>
        <div className="container">
          <div className="layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <section className="card">
                <div className="profile-header">
                  <div className="avatar-wrapper">
                    <div className="avatar">
                      {provider.profilePhoto ? (
                        <img src={provider.profilePhoto} alt={`صورة ${provider.name}`} />
                      ) : (
                        provider.name.charAt(0)
                      )}
                    </div>
                    <div className="verified-badge">
                      <span style={{ fontSize: '14px' }}>✓</span>
                    </div>
                  </div>
                  <div className="profile-info">
                    <h1 className="profile-name">{provider.name}</h1>
                    <p className="profile-job">{provider.job}</p>
                    <p className="profile-summary">{provider.summary}</p>
                    <button className="request-btn" onClick={() => setModalOpen(true)}>
                      <span style={{ fontSize: '20px' }}>✉️</span>
                      اطلب خدمة الآن
                    </button>
                  </div>
                </div>
              </section>

              <section className="card">
                <h2 className="section-title">التواجد</h2>
                {availability.map((item, i) => (
                  <div key={i} className="availability-item">
                    <span style={{ color: '#64748b', fontSize: '14px' }}>{item.days}</span>
                    <span style={{ 
                      fontSize: '14px', 
                      color: item.closed ? '#ef4444' : '#10b981', 
                      fontWeight: 500 
                    }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </section>

              <section className="card">
                <h2 className="section-title">أمثلة الأعمال</h2>
                <div className="work-grid">
                  {workImages.map((imageSrc, index) => (
                    <div key={imageSrc} className="work-item">
                      <img src={imageSrc} alt={`مثال عمل رقم ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </section>

              <section className="card">
                <h2 className="section-title">التقييمات</h2>
                <div className="rating-summary">
                  <div className="rating-score">
                    <div className="rating-number">{roundedAverage}</div>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className="star"
                          style={{ opacity: averageStars >= i ? 1 : 0.2 }}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px' }}>
                      {hasRatings ? `${ratingSummary.total} تقييم` : 'لم يتم إضافة تقييمات بعد'}
                    </div>
                  </div>
                  <div className="rating-bars">
                    {ratingBars.map((r) => (
                      <div key={r.stars} className="rating-bar-row">
                        <span style={{ 
                          color: '#64748b', 
                          fontSize: '14px', 
                          width: '20px', 
                          textAlign: 'center' 
                        }}>
                          {r.stars}
                        </span>
                        <div className="rating-bar">
                          <div 
                            className="rating-bar-fill" 
                            style={{ width: `${r.percent}%` }}
                          ></div>
                        </div>
                        <span style={{ 
                          color: '#64748b', 
                          fontSize: '14px', 
                          width: '40px', 
                          textAlign: 'right' 
                        }}>
                          {r.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {hasRatings ? (
                  ratingList.map((review) => {
                    const gradient =
                      review.fromRole === 'worker'
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : 'linear-gradient(135deg, #3b82f6, #6366f1)';
                    return (
                      <div key={review.id} className="review-item">
                        <div className="review-avatar" style={{ background: gradient }}>
                          {(review.fromName || 'م').charAt(0)}
                        </div>
                        <div className="review-content">
                          <div className="review-header">
                            <h3 className="review-name">{review.fromName || 'مستخدم من خدمة'}</h3>
                            <div className="stars">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <span
                                  key={i}
                                  style={{ color: '#fbbf24', fontSize: '14px', opacity: i <= review.score ? 1 : 0.2 }}
                                >
                                  ⭐
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="review-text">{review.comment || 'لا يوجد تعليق مكتوب، لكن التقييم إيجابي. ✨'}</p>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {new Date(review.createdAt).toLocaleDateString('ar-EG')} • خدمة {review.serviceName || 'خدمة'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-reviews">لا توجد تقييمات بعد لهذا المزود. كن أول من يشاركه تجربتك!</p>
                )}
              </section>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h2 className="section-title">الخدمات المقدمة</h2>
                {isElectrician ? (
                  <ul className="electric-services-list">
                    {electricServiceLabels.map((label, index) => (
                      <li key={label} style={{ animationDelay: `${index * 0.05}s` }}>
                        <span className="pulse-dot" />
                        {label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="services-grid">
                    {services.map((service) => (
                      <div key={service.label} className="service-card">
                        <span className="service-name">{service.label}</span>
                        {service.features && service.features.length > 0 && (
                          <ul className="service-features">
                            {service.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      {modalOpen && (
        <>
          <div 
            onClick={() => setModalOpen(false)} 
            className="modal-backdrop"
          ></div>
          <div className="modal">
            <button 
              onClick={() => setModalOpen(false)} 
              className="modal-close"
            >
              ×
            </button>
            <h2 className="modal-title">طلب خدمة جديدة</h2>
            <p style={{ 
              fontSize: '15px', 
              color: '#64748b', 
              marginBottom: '32px' 
            }}>
              برجاء ملء البيانات التالية وسنتواصل معك في أقرب وقت.
            </p>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">نوع الخدمة المطلوبة</label>
                <select 
                  value={formData.serviceType} 
                  onChange={e => setFormData({ ...formData, serviceType: e.target.value })} 
                  className="input"
                >
                <option value="">-- اختر خدمة --</option>
                  {services.map(s => (
                    <option key={s.label} value={s.label}>
                      {s.label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label className="label">وصف المشكلة</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  rows={4} 
                  placeholder="اشرح المشكلة بالتفصيل..." 
                  className="input" 
                  style={{ resize: 'vertical' }}
                ></textarea>
            </div>
            <div className="form-group">
              <label className="label">الاسم بالكامل</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="input" 
                />
            </div>
            <div className="form-group">
              <label className="label">رقم الهاتف</label>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                  className="input" 
                />
            </div>
            <div className="form-group">
              <label className="label">ميعاد الزيارة المتوقع</label>
                <input 
                  type="datetime-local" 
                  value={formData.appointmentDate} 
                  onChange={e => setFormData({ ...formData, appointmentDate: e.target.value })} 
                  className="input" 
                />
            </div>
              <button type="submit" className="request-btn">
              <span>✉️</span>
              إرسال الطلب
            </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
