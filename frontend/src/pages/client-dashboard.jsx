import React from 'react';
import { CalendarDays, Heart, MapPin, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ClientDashboard() {
  const { user } = useAuth();
  const displayName = user?.fullName || user?.name || 'عميل خدمة';

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
        }

        .badge-status {
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-weight: 600;
        }

        .calendar-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
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
              <span><Heart size={14} /></span>
            </li>
            <li className="nav-item">
              <span>بياناتي</span>
            </li>
          </ul>

          <div className="nav-footer">
            مين تحب تحجز معاه تاني؟ تقدر ترجع لأقرب مزودي خدمة ليك في أي وقت.
          </div>
        </aside>

        <main className="main">
          <div className="cards-grid">
            <div className="stat-card">
              <div className="stat-label">الحجوزات القادمة</div>
              <div className="stat-value">3</div>
              <div className="stat-sub">أول زيارة بكرة الساعة ٦ مساءً</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الخدمات اللي خلصت</div>
              <div className="stat-value">8</div>
              <div className="stat-sub">شكراً لاستخدامك خدمة 🙌</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">إجمالي اللي صرفته</div>
              <div className="wallet-amount">
                2,350 <span className="wallet-currency">جنيه</span>
              </div>
              <div className="wallet-note">من أول ما سجلت عندنا</div>
            </div>
          </div>

          <div className="cards-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">حجوزاتي الأخيرة</span>
              </div>

              <div className="booking-card">
                <div className="booking-main">
                  <span className="booking-service">سباكة • تصليح تسريب</span>
                  <div className="booking-meta">
                    <span>مع خالد</span>
                    <span>•</span>
                    <span>الخميس ٧ مساءً</span>
                  </div>
                </div>
                <span className="badge-status">مؤكد</span>
              </div>

              <div className="booking-card">
                <div className="booking-main">
                  <span className="booking-service">كهرباء • فك وتركيب نجف</span>
                  <div className="booking-meta">
                    <span>مع أحمد</span>
                    <span>•</span>
                    <span>تم من ٣ أيام</span>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#6b7280' }}>تم</span>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">موقعك وميعاد الزيارة الجاية</span>
              </div>
              <div style={{ fontSize: 13, color: '#4b5563', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={16} />
                  الجيزة، شارع جامعة الدول، عمارة ١٢
                </span>
                <div className="calendar-row">
                  <CalendarDays size={16} />
                  الأحد ٢٤ مارس • من ٥ لـ ٧ مساءً
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: '#6b7280' }}>
                  هنبعتلك تذكير قبل الميعاد بساعة على الموبايل.
                </div>
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


