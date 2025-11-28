import React, { useState, useEffect } from 'react';
import { ChevronLeft, Heart, Activity, Sparkles, ArrowLeft } from 'lucide-react';
import meImage from '../assets/Images/electrical.webp';
import { useAuth } from '../context/AuthContext.jsx';

const fallbackUser = {
  email: 'user@example.com',
  name: 'مستخدم جديد',
  address: '—',
  phone: '—',
  city: '—',
  job: '',
  image: meImage,
};

const settingsItems = [
    { 
        title: "تغيير كلمة المرور", 
        description: "ينصح بالتغيير بشكل دوري للحفاظ على أمان حسابك." 
    },
    { 
        title: "تفضيلات الإشعارات", 
        description: "تحكم في الإشعارات التي تصلك من الخدمة." 
    },
];

const emptyStates = {
    favorites: {
        img: <Heart size={64} className="icon-large text-gray-300 mx-auto" />,
        title: "لا توجد مفضلات حالياً",
    },
    activity: {
        img: <Activity size={64} className="icon-large text-gray-300 mx-auto" />,
        title: "لا توجد أنشطة حالياً",
    }
};

const ProfileCard = ({ user }) => (
  <div className="profile-card">
    <div className="profile-card-content">
      <img 
        src={user.image || meImage} 
        alt={`صورة ${user.name || 'المستخدم'}`} 
        className="profile-avatar"
      />
      <div className="profile-text-wrapper">
        <h3 className="profile-name">{user.name}</h3>
        <p className="profile-detail">الدور: {user.role === 'worker' ? 'عامل' : 'مستخدم'}</p>
        {user.role === 'worker' && (
          <p className="profile-detail">
            التخصص: {user.profession_ar || 'غير محدد'}
          </p>
        )}
        <p className="profile-detail">المدينة: {user.city || 'غير محددة'}</p>
      </div>
    </div>
  </div>
);

const PersonalInfoForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user || fallbackUser);

    useEffect(() => {
      setFormData(user || fallbackUser);
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave?.(formData);
    };

    return (
        <section className="personal-info-section">
            <div className="section-header">
                <Sparkles size={24} color="#3B82F6" />
                <h2 className="section-title">معلوماتي الشخصية</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">الاسم</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={formData.name} 
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">العنوان</label>
                        <input 
                            type="text" 
                            id="address" 
                            value={formData.address} 
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">رقم الهاتف</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            value={formData.phone} 
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        حفظ التغييرات
                        <ArrowLeft size={20} style={{ marginRight: '8px' }} />
                    </button>
                </div>
            </form>
        </section>
    );
};

const AccountSettingsList = () => (
    <section className="settings-list-container">
        <div className="section-header">
            <Sparkles size={24} color="#3B82F6" />
            <h2 className="section-title">إعدادات الحساب</h2>
        </div>
        
        {settingsItems.map((item, index) => (
            <div 
                key={index} 
                className="setting-item"
            >
                <div className="setting-details">
                    <h3 className="setting-title">{item.title}</h3>
                    <p className="setting-description">{item.description}</p>
                </div>
                <ChevronLeft size={20} className="chevron-icon" />
            </div>
        ))}
    </section>
);

const UserSettingsPage = () => {
    const { user, updateUser } = useAuth();
    const mergedUser = user
      ? {
          name: user.fullName || user.name || fallbackUser.name,
          email: user.email || fallbackUser.email,
          address: user.address || fallbackUser.address,
          phone: user.phoneNumber || user.phone || fallbackUser.phone,
          city: user.city || fallbackUser.city,
          job: user.profession_ar || fallbackUser.job,
          image: user.image || fallbackUser.image,
          role: user.role || 'user',
          profession_ar: user.profession_ar || null,
        }
      : fallbackUser;

    const handleSave = (data) => {
      updateUser?.({
        fullName: data.name,
        email: data.email,
        city: data.city,
        address: data.address,
        phoneNumber: data.phone,
      });
    };

    return (
        <div className="page-wrapper" dir="rtl">
            <main className="main-content">
                <div className="page-header">
                    <h1 className="main-heading">
                        إدارة <span className="highlight">الملف الشخصي</span>
                    </h1>
                    <p className="main-subheading">
                        قم بإدارة معلوماتك الشخصية وإعدادات حسابك
                    </p>
                </div>

                <div className="profile-grid">
                    <div className="form-column">
                        <PersonalInfoForm user={mergedUser} onSave={handleSave} />
                    </div>
                    <div className="card-column">
                        <ProfileCard user={mergedUser} />
                    </div>
                </div>

                <AccountSettingsList />

            </main>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700;800&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .page-wrapper {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%);
                    padding: 40px 20px;
                    direction: rtl;
                    font-family: 'Tajawal', sans-serif;
                }

                /* Header Styles */
                .page-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .header-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: white;
                    padding: 10px 20px;
                    border-radius: 50px;
                    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
                    margin-bottom: 24px;
                    font-weight: 600;
                    color: #1F2937;
                    font-size: 15px;
                }

                .main-heading {
                    font-size: clamp(32px, 5vw, 52px);
                    font-weight: 800;
                    color: #1F2937;
                    margin-bottom: 16px;
                    line-height: 1.3;
                }

                .highlight {
                    background: linear-gradient(135deg, #3B82F6, #38BDF8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .main-subheading {
                    font-size: 18px;
                    color: #6B7280;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .main-content {
                    max-width: 1300px;
                    margin: 0 auto;
                    margin-top: 40px;
                }

                /* Profile Grid */
                .profile-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                    margin-bottom: 40px;
                }

                @media (min-width: 1024px) {
                    .profile-grid {
                        grid-template-columns: 2fr 1fr;
                    align-items: start;
                    gap: 32px;
                    margin-bottom: 40px;
                    padding: 0;
                    background: transparent;
                        box-shadow: none;
                    }
                }

                /* Profile Card */
                .profile-card {
                    background: white;
                    border-radius: 24px;
                    padding: 32px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    border: 2px solid rgba(255, 255, 255, 0.8);
                    transition: all 0.3s ease;
                }

                .profile-card:hover {
                    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
                    transform: translateY(-4px);
                }

                .profile-card-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 20px;
                }

                @media (min-width: 768px) {
                    .profile-card-content {
                        flex-direction: row;
                        text-align: right;
                        align-items: flex-start;
                    }
                }

                .profile-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #E5E7EB;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .profile-text-wrapper {
                    flex: 1;
                }

                .profile-name {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 8px;
                }

                .profile-detail {
                    font-size: 16px;
                    color: #6B7280;
                    margin-bottom: 4px;
                }

                /* Personal Info Form */
                .personal-info-section {
                    background: white;
                    border-radius: 24px;
                    padding: 32px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    border: 2px solid rgba(255, 255, 255, 0.8);
                    transition: all 0.3s ease;
                }

                .personal-info-section:hover {
                    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 32px;
                    padding-bottom: 16px;
                    border-bottom: 2px solid #F3F4F6;
                }

                .section-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1F2937;
                    margin: 0;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                    margin-bottom: 24px;
                }

                @media (min-width: 768px) {
                    .form-row {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-label {
                    font-size: 16px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 8px;
                }

                .form-input {
                    padding: 16px;
                    border: 2px solid #E5E7EB;
                    border-radius: 12px;
                    background: #F9FAFB;
                    font-size: 16px;
                    font-family: 'Tajawal', sans-serif;
                    color: #1F2937;
                    transition: all 0.3s ease;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #3B82F6;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-start;
                    margin-top: 32px;
                }

                .save-btn {
                    background: white;
                    color: #3B82F6;
                    border: 2px solid #3B82F6;
                    padding: 16px 32px;
                    border-radius: 16px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    font-family: 'Tajawal', sans-serif;
                }

                .save-btn:hover {
                    background: #3B82F6;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
                }

                /* Settings List */
                .settings-list-container {
                    background: white;
                    border-radius: 24px;
                    padding: 32px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    border: 2px solid rgba(255, 255, 255, 0.8);
                    transition: all 0.3s ease;
                }

                .settings-list-container:hover {
                    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
                }

                .setting-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 24px;
                    border-radius: 16px;
                    background: #F9FAFB;
                    border: 2px solid #E5E7EB;
                    margin-bottom: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .setting-item:last-child {
                    margin-bottom: 0;
                }

                .setting-item:hover {
                    border-color: #3B82F6;
                    background: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
                }

                .setting-details {
                    flex: 1;
                }

                .setting-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 4px;
                }

                .setting-description {
                    font-size: 14px;
                    color: #6B7280;
                    line-height: 1.5;
                }

                .chevron-icon {
                    color: #6B7280;
                    transition: all 0.3s ease;
                }

                .setting-item:hover .chevron-icon {
                    color: #3B82F6;
                    transform: translateX(-4px);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .page-wrapper {
                        padding: 20px 16px;
                    }

                    .profile-grid {
                        gap: 20px;
                    }

                    .personal-info-section,
                    .profile-card,
                    .settings-list-container {
                        padding: 24px;
                    }

                    .section-header {
                        margin-bottom: 24px;
                    }

                    .form-actions {
                        justify-content: center;
                    }

                    .save-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .profile-card-content {
                        flex-direction: column;
                        text-align: center;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .setting-item {
                        padding: 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default UserSettingsPage;