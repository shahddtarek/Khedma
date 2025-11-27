import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import example1 from '../assets/Images/example1.jpeg';
import example2 from '../assets/Images/example2.jpeg';
import example3 from '../assets/Images/example3.jpeg';
import example4 from '../assets/Images/example4.jpeg';
import example5 from '../assets/Images/example5.jpeg';
import example6 from '../assets/Images/example6.jpeg';

export default function ServiceProviderProfile() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    serviceType: '', 
    description: '', 
    name: '', 
    phone: '' 
  });
  const [reviewStates, setReviewStates] = useState({});

  const reviewStatesRef = useRef({});
  
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      name: 'سيف سمير', 
      initial: 'س', 
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)', 
      text: 'بصراحة ممتاز ومحترم في عمله. أنهى العمل بسرعة ودقة واحترافية.',
      likes: 10,
      dislikes: 2
    },
    { 
      id: 2, 
      name: 'عبدالرحمن طارق', 
      initial: 'ع', 
      gradient: 'linear-gradient(135deg, #10b981, #059669)', 
      text: 'خدمة ممتازة وذكي. انصح بهذا الفني.',
      likes: 5,
      dislikes: 1
    },
    { 
      id: 3, 
      name: 'شهد طارق', 
      initial: 'ش', 
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', 
      text: 'ممتاز ومحترف، أنهى العمل باحترافية ودقة. أنصح به الجميع.',
      likes: 12,
      dislikes: 3
    }
  ]);

  const providerFromState = location?.state?.provider;
  const provider = {
    name: providerFromState?.name || 'مصطفى عبد الله',
    job: providerFromState ? `${providerFromState.profession_ar} محترف` : 'سباك خبير',
    summary: providerFromState 
      ? `خبرة أكثر من ${providerFromState.yearsExp || 10} سنوات في أعمال ${providerFromState.profession_ar}. موثوق من خدمة.`
      : 'خبرة أكثر من 10 سنوات في أعمال السباكة والصرف الصحي. موثوق من خدمة.',
    rating: providerFromState?.rating || 4.8,
    reviewsCount: providerFromState?.completedJobs || 125,
    profession: providerFromState?.profession || 'plumber',
    profession_ar: providerFromState?.profession_ar || 'سباك'
  };

  const services = [
    { icon: '🔧', label: 'إصلاح وصيانة المواسير' },
    { icon: '💧', label: 'كشف تسربات المياه' },
    { icon: '🔧', label: 'تأسيس شبكات السباكة' },
    { icon: '🚽', label: 'تركيب الأدوات الصحية' },
    { icon: '💧', label: 'تجديد سباكة الحمامات' },
    { icon: '🔧', label: 'صيانة وتركيب السخانات' }
  ];

  const availability = [
    { days: 'الإثنين - الخميس', time: 'من 5:00 م حتى 9:00 م', closed: false },
    { days: 'الجمعة', time: 'من 12:00 م حتى 9:00 م', closed: false },
    { days: 'السبت - الأحد', time: 'عطلة', closed: true }
  ];

  const ratings = [
    { stars: 5, percent: 75 },
    { stars: 4, percent: 15 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 }
  ];
  const workImages = [example1, example2, example3, example4, example5, example6];


  const handleLike = (reviewId, action) => {
    const currentState = reviewStatesRef.current[reviewId] || null;
    
    let newState = null;
    if (action === 'like') 
    {
      newState = currentState === 'like' ? null : 'like';
    } 
    else if (action === 'dislike') 
    {
      newState = currentState === 'dislike' ? null : 'dislike';
    }

    setReviews(prevReviews => {
      return prevReviews.map(review => {
        if (review.id !== reviewId) return review;

        let newLikes = review.likes;
        let newDislikes = review.dislikes;

        if (action === 'like') 
        {
          if (currentState === 'like') 
          {
            newLikes = Math.max(0, review.likes - 1);
          } 
          else 
          {
            newLikes = review.likes + 1;
            if (currentState === 'dislike') 
            {
              newDislikes = Math.max(0, review.dislikes - 1);
            }
          }
        } 
        else if (action === 'dislike') 
        {
          if (currentState === 'dislike') 
          {
            newDislikes = Math.max(0, review.dislikes - 1);
          } 
          else 
          {
            newDislikes = review.dislikes + 1;
            if (currentState === 'like') 
            {
              newLikes = Math.max(0, review.likes - 1);
            }
          }
        }

        return {
          ...review,
          likes: newLikes,
          dislikes: newDislikes
        };
      });
    });

    reviewStatesRef.current[reviewId] = newState;
    
    setReviewStates(prev => ({ ...prev, [reviewId]: newState }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serviceType || !formData.name || !formData.phone) {
      alert('برجاء ملء جميع الحقول المطلوبة');
      return;
    }
    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    setModalOpen(false);
    setFormData({ serviceType: '', description: '', name: '', phone: '' });
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
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
          border-color: #3B82F6;
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
                    <div className="avatar">{provider.name.charAt(0)}</div>
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
                    <div className="rating-number">{provider.rating.toFixed(1)}</div>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px' }}>
                      {provider.reviewsCount} تقرير
                    </div>
                  </div>
                  <div className="rating-bars">
                    {ratings.map(r => (
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
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div 
                      className="review-avatar" 
                      style={{ background: review.gradient }}
                    >
                      {review.initial}
                    </div>
                    <div className="review-content">
                      <div className="review-header">
                        <h3 className="review-name">{review.name}</h3>
                        <div className="stars">
                          {[1, 2, 3, 4, 5].map(i => (
                            <span 
                              key={i} 
                              style={{ color: '#fbbf24', fontSize: '14px' }}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                      <div className="review-actions">
                        <button 
                          onClick={() => handleLike(review.id, 'like')} 
                          className={`review-btn ${
                            reviewStates[review.id] === 'like' ? 'active-like' : ''
                          }`}
                          title={reviewStates[review.id] === 'like' ? 'إلغاء الإعجاب' : 'إعجاب'}
                        >
                          <span className="review-btn-emoji">
                            {reviewStates[review.id] === 'like' ? '👍' : '👍'}
                          </span>
                          <span className="review-btn-count">{review.likes}</span>
                        </button>
                        <button 
                          onClick={() => handleLike(review.id, 'dislike')} 
                          className={`review-btn ${
                            reviewStates[review.id] === 'dislike' ? 'active-dislike' : ''
                          }`}
                          title={reviewStates[review.id] === 'dislike' ? 'إلغاء عدم الإعجاب' : 'عدم إعجاب'}
                        >
                          <span className="review-btn-emoji">
                            {reviewStates[review.id] === 'dislike' ? '👎' : '👎'}
                          </span>
                          <span className="review-btn-count">{review.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>

            <aside className="sidebar">
              <div className="card">
              <h2 className="section-title">الخدمات المقدمة</h2>
              <div className="services-grid">
                {services.map(service => (
                    <div key={service.label} className="service-card">
                    <span style={{ fontSize: '32px' }}>{service.icon}</span>
                      <span style={{ 
                        fontSize: '13px', 
                        lineHeight: 1.4, 
                        color: '#1e293b', 
                        fontWeight: 600 
                      }}>
                        {service.label}
                      </span>
                  </div>
                ))}
                </div>
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
