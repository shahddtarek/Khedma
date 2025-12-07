import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock, TrendingUp, Bell, Check, XCircle, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import * as dataService from '../services/dataService';

const getJobStatusMeta = (status) =>
  status === 'accepted'
    ? { label: 'قيد التنفيذ', color: '#1d4ed8' }
    : { label: 'مكتمل', color: '#16a34a' };

export default function WorkerDashboard() {
  const { user } = useAuth();
  const displayName = user?.fullName || user?.name || 'مزود خدمة';
  const profession = user?.profession_ar || 'حرفي';
  const [jobs, setJobs] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [authoredRatings, setAuthoredRatings] = useState({});
  const [ratingDrafts, setRatingDrafts] = useState({});
  const [submittingJobId, setSubmittingJobId] = useState(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    if (user?.id) {
      refreshDashboard();
    }
  }, [user]);

  const refreshDashboard = () => {
    if (!user?.id) return;
    setJobs(dataService.getJobsForWorker(user.id));
    setUnreadCount(dataService.getUnreadNotificationCount(user.id));
    const ownRatings = dataService.getRatingsAuthoredByUser(user.id);
    const mapped = ownRatings.reduce((acc, rating) => {
      acc[rating.jobId] = rating;
      return acc;
    }, {});
    setAuthoredRatings(mapped);
  };

  const handleJobAction = (jobId, status) => {
    dataService.updateJobStatus(jobId, status);
    refreshDashboard();
  };

  const handleNotificationClick = () => {
    if (!user?.id || unreadCount === 0) return;
    dataService.markAllNotificationsAsRead(user.id);
    setUnreadCount(0);
  };

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
    if (!job.clientId) {
      alert('لا يمكن تحديد العميل لهذا الطلب');
      return;
    }

    const draft = ratingDrafts[job.id];
    if (!draft?.score) {
      alert('اختر تقييم من 1 إلى 5 نجوم');
      return;
    }

    setSubmittingJobId(job.id);
    try {
      dataService.addRating({
        jobId: job.id,
        fromUserId: user.id,
        toUserId: job.clientId,
        score: Number(draft.score),
        comment: draft.comment || '',
        fromRole: 'worker',
      });
      refreshDashboard();
      setRatingDrafts((prev) => ({
        ...prev,
        [job.id]: { score: '', comment: '' },
      }));
    } catch (error) {
      alert(error.message || 'حدث خطأ أثناء إرسال التقييم');
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
          <span>تم تقييم العميل</span>
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
          placeholder="اكتب تعليقك عن العميل..."
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

  const pendingJobs = jobs.filter((job) => job.status === 'pending');
  const acceptedJobs = jobs.filter((job) => job.status === 'accepted');
  const declinedJobs = jobs.filter((job) => job.status === 'declined');
  const completedJobs = jobs.filter((job) => job.status === 'completed');
  const totalJobs = jobs.length;
  const earningsEstimate = acceptedJobs.length * 200 + completedJobs.length * 300;
  const acceptanceRate = totalJobs > 0 
    ? Math.round((acceptedJobs.length / (totalJobs - declinedJobs.length || 1)) * 100)
    : 0;
  const completionRate = acceptedJobs.length > 0
    ? Math.round((completedJobs.length / acceptedJobs.length) * 100)
    : 0;
  const rateableJobs = jobs.filter(
    (job) => (job.status === 'accepted' || job.status === 'completed') && job.clientId,
  );
  
  // Get average rating received
  const ratingStats = dataService.getRatingStatsForUser?.(user?.id) || { average: 0, total: 0 };
  const averageRating = ratingStats.average ? ratingStats.average.toFixed(1) : '0.0';

  const dayLabels = {
    sunday: 'أحد',
    monday: 'إثنين',
    tuesday: 'ثلاثاء',
    wednesday: 'أربعاء',
    thursday: 'خميس',
    friday: 'جمعة',
    saturday: 'سبت',
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
          background: linear-gradient(135deg, #3b82f6, #38bdf8);
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

        .availability-info {
          margin-top: 16px;
          font-size: 13px;
          color: #4b5563;
        }

        .availability-days {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .day-badge {
          padding: 4px 10px;
          background: #eff6ff;
          color: #1d4ed8;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 16px;
        }

        .photo-grid img {
          width: 100%;
          height: 90px;
          object-fit: cover;
          border-radius: 12px;
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

        .stat-desc {
          font-size: 12px;
          color: #16a34a;
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

        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .table thead {
          background: #f9fafb;
        }

        .table th,
        .table td {
          padding: 10px 8px;
          text-align: right;
          border-bottom: 1px solid #f3f4f6;
        }

        .status-pill {
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          font-weight: 600;
        }

        .status-pending {
          background: #fef9c3;
          color: #854d0e;
        }

        .status-confirmed {
          background: #dcfce7;
          color: #166534;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-action {
          padding: 6px 10px;
          border-radius: 10px;
          border: none;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Tajawal', sans-serif;
        }

        .btn-accept {
          background: #dcfce7;
          color: #166534;
        }

        .btn-decline {
          background: #fee2e2;
          color: #991b1b;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
          margin-top: 12px;
          font-size: 12px;
        }

        .day-cell {
          padding: 8px 0;
          text-align: center;
          border-radius: 10px;
          color: #4b5563;
        }

        .day-cell.active {
          background: #3b82f6;
          color: #ffffff;
          font-weight: 700;
        }

        .earnings-amount {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
        }

        .earnings-currency {
          font-size: 14px;
          margin-right: 4px;
        }

        .earnings-note {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        .rating-panel {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rating-card {
          border: 1px solid #e0e7ff;
          border-radius: 16px;
          padding: 14px;
          background: #f8fafc;
        }

        .rating-form {
          margin-top: 10px;
          padding: 12px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #dbeafe;
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
          background: linear-gradient(135deg, #10b981, #34d399);
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
          background: #dcfce7;
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
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <div className="profile-header">
            <div className="avatar">
              {user?.profilePhoto ? <img src={user.profilePhoto} alt="صورة المزود" /> : displayName.charAt(0)}
            </div>
            <div className="profile-text">
              <span className="profile-name">{displayName}</span>
              <span className="profile-role">مزود خدمة • {profession}</span>
            </div>
          </div>



          <div className="nav-footer">
            {unreadCount > 0 ? (
              <button type="button" className="notification-badge" onClick={handleNotificationClick}>
                <Bell size={18} />
                <div className="notification-count">{unreadCount}</div>
              </button>
            ) : (
              'جاهز تستقبل شغل جديد النهارده؟ 👌'
            )}
          </div>

          {user?.availableDays?.length > 0 && (
            <div className="availability-info">
              <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>أيام العمل:</div>
              <div className="availability-days">
                {user.availableDays.map((day) => (
                  <span key={day} className="day-badge">
                    {dayLabels[day] || day}
                  </span>
                ))}
              </div>
              {user.availableHours && (
                <p style={{ marginTop: 8, color: '#6b7280' }}>الساعات: {user.availableHours}</p>
              )}
            </div>
          )}

          {user?.workPhotos?.length > 0 && (
            <div className="availability-info">
              <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>نماذج أعمالك</div>
              <div className="photo-grid">
                {user.workPhotos.slice(0, 4).map((photo, index) => (
                  <img key={index} src={photo} alt={`work-${index}`} />
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="main">
          <div className="cards-grid">
            <div className="stat-card">
              <div className="stat-label">إجمالي الطلبات</div>
              <div className="stat-value">{totalJobs}</div>
              <div className="stat-desc">جميع الطلبات المستلمة</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المعلقة</div>
              <div className="stat-value">{pendingJobs.length}</div>
              <div className="stat-desc">مستنية موافقتك</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المقبولة</div>
              <div className="stat-value">{acceptedJobs.length}</div>
              <div className="stat-desc">قيد التنفيذ</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المكتملة</div>
              <div className="stat-value">{completedJobs.length}</div>
              <div className="stat-desc">تم إنجازها بنجاح</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">معدل القبول</div>
              <div className="stat-value">{acceptanceRate}%</div>
              <div className="stat-desc">من إجمالي الطلبات</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">التقييم المتوسط</div>
              <div className="stat-value">
                {averageRating} <span style={{ fontSize: '14px', color: '#fbbf24' }}>⭐</span>
              </div>
              <div className="stat-desc">{ratingStats.total || 0} تقييم</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الأرباح المتوقعة</div>
              <div className="stat-value">
                {earningsEstimate} <span className="earnings-currency">جنيه</span>
              </div>
              <div className="stat-desc">
                <TrendingUp size={14} style={{ marginLeft: 4 }} />
                {completedJobs.length} أعمال مكتملة
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">الطلبات الجديدة</span>
            </div>
            {pendingJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                لا توجد طلبات جديدة حالياً
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>الخدمة</th>
                    <th>العميل</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingJobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.serviceName || 'خدمة'}</td>
                      <td>{job.clientName}</td>
                      <td>{new Date(job.createdAt).toLocaleDateString('ar-EG')}</td>
                      <td>
                        <span className="status-pill status-pending">معلقة</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action btn-accept" onClick={() => handleJobAction(job.id, 'accepted')}>
                            <Check size={14} style={{ marginLeft: 4 }} />
                            قبول
                          </button>
                          <button className="btn-action btn-decline" onClick={() => handleJobAction(job.id, 'declined')}>
                            <XCircle size={14} style={{ marginLeft: 4 }} />
                            رفض
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {acceptedJobs.length > 0 && (
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">الطلبات المقبولة</span>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>الخدمة</th>
                    <th>العميل</th>
                    <th>تاريخ الطلب</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedJobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.serviceName || 'خدمة'}</td>
                      <td>{job.clientName}</td>
                      <td>{new Date(job.createdAt).toLocaleDateString('ar-EG')}</td>
                      <td>
                        <span className="status-pill status-confirmed">مقبول</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {rateableJobs.length > 0 && (
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">تقييم العملاء</span>
              </div>
              <div className="rating-panel">
                {rateableJobs.map((job) => {
                  const { label, color } = getJobStatusMeta(job.status);
                  return (
                    <div key={job.id} className="rating-card">
                      <div style={{ display: 'flex', "justify-content": 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{job.clientName}</div>
                          <div style={{ fontSize: 12, color: '#6b7280' }}>
                            خدمة: {job.serviceName || 'خدمة'} • بتاريخ{' '}
                            {new Date(job.createdAt).toLocaleDateString('ar-EG')}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      {renderRatingForm(job)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="cards-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">جدولي</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280' }}>
                  <Calendar size={16} />
                  {new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="calendar-grid">
                {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'].map((d) => (
                  <div key={d} className="day-cell" style={{ fontWeight: 600, color: '#6b7280' }}>
                    {d}
                  </div>
                ))}
                {Array.from({ length: 31 }).map((_, index) => {
                  const day = index + 1;
                  const isActive =
                    user?.availableDays?.length > 0
                      ? user.availableDays.some(
                          (availableDay) =>
                            ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(
                              availableDay,
                            ) === (day % 7),
                        )
                      : false;
                  return (
                    <div
                      key={day}
                      className={`day-cell ${isActive ? 'active' : ''}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">الأرباح الأخيرة</span>
              </div>
              <p className="stat-label">إجمالي الأرباح خلال آخر ٧ أيام</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                <span className="earnings-amount">{earningsEstimate}</span>
                <span className="earnings-currency">جنيه</span>
              </div>
              <p className="earnings-note">
                {completedJobs.length} عمل مكتمل • {acceptedJobs.length} عمل قيد التنفيذ
              </p>
              <div style={{ marginTop: 16, fontSize: 13, color: '#6b7280', display: 'flex', gap: 8 }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>كل المدفوعات بتوصلك بأمان عن طريق خدمة.</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

