import React, { useEffect, useState } from 'react';
import { CalendarDays, Heart, MapPin, Wallet, Bell, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import * as dataService from '../services/dataService';

export default function ClientDashboard() {
  const { user } = useAuth();
  const displayName = user?.fullName || user?.name || 'عميل خدمة';
  const [jobs, setJobs] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.id) {
      refreshDashboard();
    }
  }, [user]);

  const refreshDashboard = () => {
    if (!user?.id) return;
    setJobs(dataService.getJobsForClient(user.id));
    setUnreadCount(dataService.getUnreadNotificationCount(user.id));
  };

  const pendingJobs = jobs.filter((job) => job.status === 'pending');
  const acceptedJobs = jobs.filter((job) => job.status === 'accepted');
  const declinedJobs = jobs.filter((job) => job.status === 'declined');
  const completedJobs = jobs.filter((job) => job.status === 'completed');
  const totalSpending = (acceptedJobs.length + completedJobs.length) * 250;
  const nextAppointment = acceptedJobs[0];

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
              {displayName.charAt(0)}
            </div>
            <div className="profile-text">
              <span className="profile-name">{displayName}</span>
              <span className="profile-role">عميل خدمة</span>
            </div>
          </div>

          <ul className="nav-list">
            <li className="nav-item active">
              <span>نظرة عامة</span>
            </li>
            <li className="nav-item">
              <span>حجوزاتي</span>
            </li>
            <li className="nav-item">
              <span>مفضلتي</span>
              <Heart size={14} />
            </li>
            <li className="nav-item">
              <span>بياناتي</span>
            </li>
          </ul>

          <div className="nav-footer">
            {unreadCount > 0 ? (
              <div className="notification-badge">
                <Bell size={18} />
                <span className="notification-count">{unreadCount}</span>
              </div>
            ) : (
              'مين تحب تحجز معاه تاني؟ تقدر ترجع لأقرب مزودي خدمة ليك في أي وقت.'
            )}
          </div>
        </aside>

        <main className="main">
          <div className="cards-grid">
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
                    {renderStatusChip(job)}
                  </div>
                ))
              )}
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">موقعك وميعاد الزيارة الجاية</span>
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
                      {new Date(nextAppointment.createdAt).toLocaleDateString('ar-EG', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </div>
                    <p style={{ marginTop: 10, fontSize: 12, color: '#6b7280' }}>
                      المزود: {nextAppointment.workerName} • سنذكرك قبل الموعد بساعة.
                    </p>
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

