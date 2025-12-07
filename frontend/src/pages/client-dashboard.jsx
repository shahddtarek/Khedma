import React, { useEffect, useState } from 'react';
import { CalendarDays, Heart, MapPin, Wallet, Bell, CheckCircle2, XCircle, Clock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import * as dataService from '../services/dataService';

import { useModal } from '../context/ModalContext'; // Import useModal

export default function ClientDashboard() {
  const { user } = useAuth();
  const { showModal } = useModal(); // Destructure showModal
  const displayName = user?.fullName || user?.name || 'عميل خدمة';
  const [jobs, setJobs] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [authoredRatings, setAuthoredRatings] = useState({});
  const [ratingDrafts, setRatingDrafts] = useState({});
  const [submittingJobId, setSubmittingJobId] = useState(null);

  useEffect(() => {

    window.scrollTo(0, 0);

    if (user?.id) {
      refreshDashboard();
    }
  }, [user]);

  const refreshDashboard = () => {
    if (!user?.id) return;
    setJobs(dataService.getJobsForClient(user.id));
    setUnreadCount(dataService.getUnreadNotificationCount(user.id));
    const ownRatings = dataService.getRatingsAuthoredByUser(user.id);
    const mapped = ownRatings.reduce((acc, rating) => {
      acc[rating.jobId] = rating;
      return acc;
    }, {});
    setAuthoredRatings(mapped);
  };

  const handleNotificationClick = () => {
    if (!user?.id || unreadCount === 0) return;
    dataService.markAllNotificationsAsRead(user.id);
    setUnreadCount(0);
  };

  const pendingJobs = jobs.filter((job) => job.status === 'pending');
  const acceptedJobs = jobs.filter((job) => job.status === 'accepted');
  const declinedJobs = jobs.filter((job) => job.status === 'declined');
  const completedJobs = jobs.filter((job) => job.status === 'completed');
  const totalJobs = jobs.length;
  const totalSpending = (acceptedJobs.length + completedJobs.length) * 250;
  const nextAppointment = acceptedJobs[0] || completedJobs[0];
  const averageRating = jobs.length > 0
    ? (jobs.reduce((sum, job) => {
      const rating = dataService.getRatingStatsForUser?.(job.workerId)?.average || 0;
      return sum + rating;
    }, 0) / jobs.length).toFixed(1)
    : '0.0';

  const handleDraftChange = (jobId, field, value) => {
    setRatingDrafts((prev) => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [field]: value,
      },
    }));
  };

  const handleRatingSubmit = (job) => {
    const draft = ratingDrafts[job.id];
    if (!draft?.score) {
      showModal('اختر تقييم من 1 إلى 5 نجوم', 'تنبيه', 'info');
      return;
    }
    setSubmittingJobId(job.id);
    try {
      dataService.addRating({
        jobId: job.id,
        fromUserId: user.id,
        toUserId: job.workerId,
        score: Number(draft.score),
        comment: draft.comment || '',
        fromRole: 'client',
      });
      refreshDashboard();
      setRatingDrafts((prev) => ({
        ...prev,
        [job.id]: { score: '', comment: '' },
      }));
    } catch (error) {
      showModal(error.message || 'حدث خطأ أثناء إرسال التقييم', 'خطأ', 'error');
    } finally {
      setSubmittingJobId(null);
    }
  };

  const renderRatingForm = (job) => {
    const canRate = (job.status === 'accepted' || job.status === 'completed') && !authoredRatings[job.id];
    if (!canRate) {
      const existing = authoredRatings[job.id];
      if (!existing) return null;
      return (
        <div className="rating-status">
          <span>⭐ {existing.score}</span>
          <span>تم إرسال تقييمك</span>
        </div>
      );
    }

    const draft = ratingDrafts[job.id] || { score: '', comment: '' };
    return (
      <div className="rating-form">
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`star-button ${Number(draft.score) >= value ? 'active' : ''}`}
              onClick={() => handleDraftChange(job.id, 'score', value)}
            >
              <Star size={16} />
            </button>
          ))}
        </div>
        <textarea
          className="rating-textarea"
          rows={2}
          placeholder="اترك تعليقك للمزود..."
          value={draft.comment || ''}
          onChange={(e) => handleDraftChange(job.id, 'comment', e.target.value)}
        />
        <button
          className="rating-submit"
          onClick={() => handleRatingSubmit(job)}
          disabled={submittingJobId === job.id}
        >
          {submittingJobId === job.id ? 'جاري الإرسال...' : 'إرسال التقييم'}
        </button>
      </div>
    );
  };

  const renderStatusChip = (job) => {
    if (job.status === 'accepted') {
      return (
        <span className="badge-status badge-accepted">
          <CheckCircle2 size={14} />
          <span>مقبول</span>
        </span>
      );
    }
    if (job.status === 'declined') {
      return (
        <span className="badge-status badge-declined">
          <XCircle size={14} />
          <span>مرفوض</span>
        </span>
      );
    }
    if (job.status === 'completed') {
      return (
        <span className="badge-status badge-completed">
          <CheckCircle2 size={14} />
          <span>مكتمل</span>
        </span>
      );
    }
    return (
      <span className="badge-status badge-pending">
        <Clock size={14} />
        <span>معلق</span>
      </span>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="page-wrapper" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%);
          padding: 40px 20px;
          font-family: 'Tajawal', sans-serif;
          margin-top: 40px;
        }

        .layout {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 24px;
        }

        .sidebar {
          background: #ffffff;
          border-radius: 24px;
          padding: 24px 20px;
          box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 800;
          font-size: 18px;
          overflow: hidden;
          border: 2px solid #e0e7ff;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .profile-name {
          font-weight: 700;
          color: #0f172a;
        }

        .profile-role {
          font-size: 13px;
          color: #6b7280;
        }

        .nav-list {
          list-style: none;
          margin-top: 16px;
        }

        .nav-item {
          padding: 10px 12px;
          border-radius: 12px;
          font-size: 14px;
          color: #4b5563;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
          transition: all 0.2s ease;
        }

        .nav-item.active {
          background: #eff6ff;
          color: #1d4ed8;
          font-weight: 600;
        }

        .badge-muted {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 999px;
          background: #f9fafb;
          color: #6b7280;
        }

        .nav-footer {
          margin-top: 32px;
          font-size: 13px;
          color: #9ca3af;
        }

        .main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 20px 18px;
          box-shadow: 0 8px 32px rgba(15, 23, 42, 0.06);
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .stat-value {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
        }

        .stat-sub {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 4px;
        }

        .panel {
          background: #ffffff;
          border-radius: 24px;
          padding: 20px 18px;
          box-shadow: 0 8px 32px rgba(15, 23, 42, 0.06);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .panel-title {
          font-weight: 700;
          color: #0f172a;
        }

        .notification-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #eff6ff;
          color: #1d4ed8;
          border: none;
          cursor: pointer;
        }

        .notification-count {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ef4444;
          color: white;
          border-radius: 999px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .booking-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 12px;
          border-radius: 16px;
          background: #f9fafb;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .booking-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .booking-service {
          font-weight: 600;
          color: #111827;
        }

        .booking-meta {
          display: flex;
          gap: 8px;
          color: #6b7280;
          font-size: 12px;
        }

        .badge-status {
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .badge-pending {
          background: #fef9c3;
          color: #854d0e;
        }

        .badge-accepted {
          background: #dcfce7;
          color: #166534;
        }

        .badge-declined {
          background: #fee2e2;
          color: #991b1b;
        }

        .badge-completed {
          background: #dbeafe;
          color: #1e40af;
        }

        .rating-form {
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #e0e7ff;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
          animation: fadeInUp 0.4s ease;
        }

        .rating-stars {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }

        .star-button {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #e2e8f0;
          color: #fbbf24;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }

        .star-button.active {
          background: #fde68a;
          transform: translateY(-2px);
        }

        .rating-textarea {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 10px;
          font-family: 'Tajawal', sans-serif;
          font-size: 13px;
          resize: vertical;
          margin-bottom: 10px;
        }

        .rating-submit {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #38bdf8);
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .rating-submit:disabled {
          opacity: 0.7;
          cursor: progress;
        }

        .rating-status {
          margin-top: 10px;
          padding: 10px;
          border-radius: 10px;
          background: #ecfccb;
          color: #166534;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 600;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .next-appointment {
          background: #f0f9ff;
          border: 2px solid #3b82f6;
          border-radius: 16px;
          padding: 16px;
          margin-top: 12px;
          font-size: 13px;
          color: #4b5563;
        }

        .wallet-amount {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
        }

        .wallet-currency {
          font-size: 14px;
          margin-right: 4px;
        }

        .wallet-note {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <div className="profile-header">
            <div className="avatar">
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt="صورة العميل" />
              ) : (
                displayName.charAt(0)
              )}
            </div>
            <div className="profile-text">
              <span className="profile-name">{displayName}</span>
              <span className="profile-role">عميل خدمة</span>
            </div>
          </div>



          <div className="nav-footer">
            {unreadCount > 0 ? (
              <button type="button" className="notification-badge" onClick={handleNotificationClick}>
                <Bell size={18} />
                <span className="notification-count">{unreadCount}</span>
              </button>
            ) : (
              'مين تحب تحجز معاه تاني؟ تقدر ترجع لأقرب مزودي خدمة ليك في أي وقت.'
            )}
          </div>
        </aside>

        <main className="main">
          <div className="cards-grid">
            <div className="stat-card">
              <div className="stat-label">إجمالي الطلبات</div>
              <div className="stat-value">{totalJobs}</div>
              <div className="stat-sub">جميع الطلبات منذ البداية</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المعلقة</div>
              <div className="stat-value">{pendingJobs.length}</div>
              <div className="stat-sub">في انتظار رد المزود</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المؤكدة</div>
              <div className="stat-value">{acceptedJobs.length}</div>
              <div className="stat-sub">قيد التنفيذ</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المكتملة</div>
              <div className="stat-value">{completedJobs.length}</div>
              <div className="stat-sub">تم إنجازها بنجاح</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المرفوضة</div>
              <div className="stat-value">{declinedJobs.length}</div>
              <div className="stat-sub">لم يتم قبولها</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">إجمالي الإنفاق</div>
              <div className="wallet-amount">
                {totalSpending}
                <span className="wallet-currency">جنيه</span>
              </div>
              <div className="wallet-note">منذ انضمامك لخدمة</div>
            </div>
          </div>

          <div className="cards-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">حجوزاتي الأخيرة</span>
              </div>

              {jobs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>
                  لا توجد حجوزات حتى الآن
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="booking-card">
                    <div className="booking-main">
                      <span className="booking-service">{job.serviceName || 'خدمة'}</span>
                      <div className="booking-meta">
                        <span>مع: {job.workerName}</span>
                        <span>•</span>
                        <span>{new Date(job.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                      {job.description && (
                        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{job.description}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      {renderStatusChip(job)}
                      {renderRatingForm(job)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">موقعك وميعاد الزيارة القادمة</span>
              </div>
              <div className="next-appointment">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={16} />
                  {user?.address || user?.city || 'لم يتم تحديد العنوان'}
                </div>
                {nextAppointment ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                      <CalendarDays size={16} />
                      {nextAppointment.appointmentDate
                        ? new Date(nextAppointment.appointmentDate).toLocaleDateString('ar-EG', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : new Date(nextAppointment.createdAt).toLocaleDateString('ar-EG', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}
                    </div>
                    <p style={{ marginTop: 10, fontSize: 12, color: '#6b7280' }}>
                      المزود: {nextAppointment.workerName} • {nextAppointment.serviceName || 'خدمة'}
                    </p>
                    {nextAppointment.status === 'accepted' && (
                      <p style={{ marginTop: 8, fontSize: 11, color: '#16a34a', fontWeight: 600 }}>
                        ✓ سنذكرك قبل الموعد بساعة
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ marginTop: 12, color: '#6b7280', fontSize: 13 }}>لا توجد مواعيد مؤكدة حالياً.</p>
                )}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">ملخص المحفظة</span>
              <Wallet size={18} />
            </div>
            <p className="stat-label">الرصيد الجاهز للاستخدام</p>
            <div className="wallet-amount">
              350 <span className="wallet-currency">جنيه</span>
            </div>
            <p className="wallet-note">
              تقدر تستخدم الرصيد ده في خصم على أي حجز جديد من خلال خدمة.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

