import React, { useState } from 'react';
import { ChevronLeft, Heart, Activity } from 'lucide-react';
import meImage from '../assets/Images/electrical.webp';
const initialFormData = {
    email: 'ali@example.com',
    name: 'علي محمد',
    address: 'شارع الملك فيصل، الجيزة 1234',
    phone: '+201053673354',
    city:'الجيزة',
    job:'كهربائي',
    image:meImage
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
        src={user.image || "#"} 
        alt={`صورة ${user.name}`} 
        className="profile-avatar"
      />
      <div className="profile-text-wrapper">
        <h3 className="profile-name">{user.name}</h3>
        <p className="profile-detail">{user.job || "الوظيفة غير محددة"}</p>
        <p className="profile-detail">{user.city}</p>
      </div>
    </div>
  </div>
);

const PersonalInfoForm = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving changes:', formData);
        // عرض رسالة نجاح مؤقتة
    };

    return (
        <section className="personal-info-section">
            <h2 className="section-title">معلوماتي الشخصية</h2>
            
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

               
                <div className="form-row mb-6">
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

                <div className="text-right">
                    <button 
                        type="submit" 
                        className="save-btn"
                    >
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </section>
    );
};

const AccountSettingsList = () => (
    <section className="settings-list-container">
        <h2 className="section-title">إعدادات الحساب</h2>
        
        {settingsItems.map((item, index) => (
            <div 
                key={index} 
                className={`setting-item ${index < settingsItems.length - 1 ? 'border-bottom' : ''}`}
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

    return (
        <div className="user-settings-page" dir="rtl">
            
            <style jsx="true">{`
                /* General Styles */
                .user-settings-page {
                    background-color: #f3f5f8;
                    fontFamily: "Tajawal, Tahoma, Arial, sans-serif"
                }
                .main-content {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 32px 16px;
                }
                .page-title {
                    font-size: 32px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 24px;
                }
                .text-right {
                    text-align: right;
                }
                .border-bottom {
                    border-bottom: 1px solid #f3f4f6;
                }
                
                /* Layout Grid */
                .profile-grid {
                    display: grid;
                    grid-template-columns: 1fr; /* Default to single column */
                    gap: 24px;
                }
                
                @media (min-width: 768px) {
                    .profile-grid {
                        grid-template-columns: 2fr 1fr; /* Two columns for desktop */
                    }
                    .nav-links {
                        display: flex;
                    }
                }
                
                /* Profile Card */
                .profile-card {
                    background-color: #ffffff;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: right;
                    height: fit-content;
                    order: -1; /* For mobile, put card on top */
                }

                .profile-card-content {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                
                @media (min-width: 768px) {
                    .profile-card {
                        text-align: right;
                    }
                    .profile-card-content {
                        flex-direction: row-reverse; /* Align text right of image */
                        align-items: flex-start;
                        text-align: right;
                    }
                    .profile-text-wrapper {
                        text-align: right; 
                        margin-right: 16px;
                    }
                    .profile-avatar {
                         margin-bottom: 0 !important;
                    }
                }
                .profile-text-wrapper {
                    /* نأخذ المساحة المتاحة وندفع النصوص لليمين */
                    text-align: right; 
 
                    margin-right: 16px; 
                }
                .profile-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    padding: 2px;
                    margin-bottom: 12px;
                }
                .profile-name {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1f2937;
                }
                .profile-detail {
                    font-size: 14px;
                    color: #6b7280;
                    margin-top: 4px;
                }
                
                /* Personal Info Form */
                .personal-info-section {
                    background-color: #ffffff;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .section-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f2937;
                    padding-bottom: 12px;
                    margin-bottom: 16px;
                    border-bottom: 1px solid #e5e7eb;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                    margin-bottom: 16px;
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
                    font-size: 14px;
                    font-weight: 500;
                    color: #4b5563;
                    margin-bottom: 4px;
                }
                .form-input {
                    padding: 12px;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    background-color: #f9fafb;
                    transition: border-color 0.15s;
                    text-align: right;
                }
                .form-input:focus {
                    border-color: #205c9d;
                    outline: none;
                }
                .save-btn {
                    background-color: #4a74ff;
                    color: #ffffff;
                    padding: 8px 24px;
                    border-radius: 8px;
                    border: none;
                    font-weight: 600;
                    transition: background-color 0.15s, box-shadow 0.15s;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                    cursor: pointer;
                    margin-top: 24px;
                }
                .save-btn:hover {
                    background-color: #456ceeff;
                }
                
                /* Account Settings List */
                .settings-list-container {
                    background-color: #ffffff;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-top: 24px;
                }
                .setting-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 0;
                    cursor: pointer;
                    transition: background-color 0.15s;
                    padding-left: 16px;
                    padding-right: 16px;
                    margin: 0 -16px;
                }
                .setting-item:hover {
                    background-color: #f9fafb;
                }
                .setting-details {
                    text-align: right;
                }
                .setting-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #4b5563;
                }
                .setting-description {
                    font-size: 14px;
                    color: #9ca3af;
                    margin-top: 4px;
                }
                .chevron-icon {
                    color: #9ca3af;
                }
                
                


            `}</style>
            
            
            
            <main className="main-content">
                <h1 className="page-title">إدارة الملف الشخصي</h1>

                
                <div className="profile-grid">
                    <div className="form-column">
                        <PersonalInfoForm />
                    </div>
                    <div className="card-column">
                        <ProfileCard user={initialFormData}/>
                    </div>
                </div>

               
                <AccountSettingsList />

                


            </main>
        </div>
    );
};

export default UserSettingsPage;