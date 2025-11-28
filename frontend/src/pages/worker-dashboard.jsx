import React from 'react';
import { Calendar, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function WorkerDashboard() {
  const { user } = useAuth();
  const displayName = user?.fullName || user?.name || 'مزود خدمة';
  const profession = user?.profession_ar || 'حرفي';

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

        .stat-desc {
          font-size: 12px;
          color: #16a34a;
          margin-top: 4px;
        }

        .badge-muted {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 999px;
          background: #f9fafb;
          color: #6b7280;
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

        .status-new {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .status-pending {
          background: #fef9c3;
          color: #854d0e;
        }

        .status-confirmed {
          background: #dcfce7;
          color: #166534;
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
          .action-text {
            color: #3b82f6;
            font-weight: 600;
            cursor: default;
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
              <span className="profile-role">مزود خدمة • {profession}</span>
            </div>
          </div>

          <ul className="nav-list">
            <li className="nav-item active">
              <span>نظرة عامة</span>
            </li>
            <li className="nav-item">
              <span>حجوزاتي</span>
              <span className="badge-muted">قريباً</span>
            </li>
            <li className="nav-item">
              <span>ملفي الشخصي</span>
            </li>
            <li className="nav-item">
              <span>الأرباح والتسويات</span>
            </li>
          </ul>

          <div className="nav-footer">
            جاهز تستقبل شغل جديد النهارده؟ 👌
          </div>
        </aside>

        <main className="main">
          <div className="cards-grid">
            <div className="stat-card">
              <div className="stat-label">الجلسات الجاية</div>
              <div className="stat-value">5</div>
              <div className="stat-desc">مؤكدين خلال الأسبوع ده</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الطلبات المعلقة</div>
              <div className="stat-value">2</div>
              <div className="stat-desc">مستنية موافقتك</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">أرباح آخر ٧ أيام</div>
              <div className="stat-value">
                1,200 <span className="earnings-currency">جنيه</span>
              </div>
              <div className="stat-desc">
                <TrendingUp size={14} style={{ marginLeft: 4 }} />
                أعلى من الأسبوع اللي فات بـ 15%
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">الطلبات الجديدة</span>
            </div>
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
                <tr>
                  <td>سباكة</td>
                  <td>خالد</td>
                  <td>15-03-2024</td>
                  <td><span className="status-pill status-pending">معلقة</span></td>
                  <td className="action-text">عرض</td>
                </tr>
                <tr>
                  <td>كهرباء</td>
                  <td>سارة</td>
                  <td>16-03-2024</td>
                  <td><span className="status-pill status-new">جديدة</span></td>
                  <td className="action-text">قبول</td>
                </tr>
                <tr>
                  <td>تنظيف</td>
                  <td>عبدالله</td>
                  <td>17-03-2024</td>
                  <td><span className="status-pill status-confirmed">مؤكدة</span></td>
                  <td className="action-text">عرض</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cards-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">جدولي</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280' }}>
                  <Calendar size={16} />
                  مارس 2024
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
                  const isActive = day === 5;
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
                <span className="earnings-amount">1,200</span>
                <span className="earnings-currency">جنيه</span>
              </div>
              <p className="earnings-note">آخر تحويل تم يوم 18 مارس 2024</p>
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


