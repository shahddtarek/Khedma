import React from 'react';
import { Search, MapPin, Phone, Calendar, PenTool, Shield, Settings, Mail, Instagram, Twitter, Facebook, Linkedin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Himg from '../assets/Images/H.jpg'
import Cimg from '../assets/Images/c.jpg'

// بيانات وهمية لنتائج البحث
const CRAFTSMEN_DATA = [
    {
        name: "بدر حسن",
        job: "كهربائي",
        rating: 4.8,
        reviews: 25,
        imgSrc: Himg,
        status: "مميز"
    },
    {
        name: "خالد علي",
        job: "سباك",
        rating: 4.8,
        reviews: 18,
        imgSrc: Himg,
        status: "مميز"
    },
    {
        name: "يوسف محمود",
        job: "نجار",
        rating: 4.8,
        reviews: 30,
        imgSrc: Himg,
        status: "مميز"
    },
    {
        name: "محمد إبراهيم",
        job: "مهندس تكيفات", 
        rating: 4.8,
        reviews: 42,
        imgSrc: Himg,
        status: "مميز"
    },
];
const SERVICES_DATA = [
    { icon: MapPin, title: "توصيل" },
    { icon: Phone, title: "استشارة" },
    { icon: Calendar, title: "تنظيف" },
    { icon: PenTool, title: "تصميم" },
    { icon: Shield, title: "تأمين" },
    { icon: Settings, title: "صيانة" },
];
const testimonialClient = {
    name: "سلمى منصور",
    title: "صاحبة منزل",
    quote: "خدمة ممتازة وحرفيون محترفون أنصح بشدة باستخدام هذه المنصة.",
    img: Cimg
};

const CraftsmanCard = ({ craftsman }) => {

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star 
                    key={i} 
                    size={16} 
                    fill={i < fullStars ? '#FFC107' : '#E0E0E0'} 
                    strokeWidth={i < fullStars ? 0 : 1.5}
                    color={i < fullStars ? '#FFC107' : '#999'}
                />
            );
        }
        return stars;
    };

    return (
        <div className="craftsman-card">
            {craftsman.status && (
                <span className="status-tag">{craftsman.status}</span>
            )}
            <img src={craftsman.imgSrc} alt={craftsman.name} className="craftsman-image" />
            
            <h3 className="craftsman-name">{craftsman.name}</h3>
            <p className="craftsman-job">{craftsman.job}</p>

            <div className="rating">
                <span className="rating-value">{craftsman.rating}</span>
                <div className="star-icons">{renderStars(craftsman.rating)}</div>
                <span className="reviews-count">({craftsman.reviews})</span>
            </div>

            <div className="actions">
                <button className="btn btn-secondary">رسالة</button>
                <button className="btn btn-primary">ملف شخصي</button>
            </div>
        </div>
    );
};
// مكون قسم الخدمات
const ServicesSection = () => (
    <section className="services-section">
        <h2 className="section-title">الخدمات</h2>
        <div className="services-grid">
            {SERVICES_DATA.map((service, index) => {
                const IconComponent = service.icon;
                return (
                    <div key={index} className="service-item">
                        <div className="service-icon-wrapper">
                            <IconComponent size={30} className="service-icon" />
                        </div>
                        <p className="service-title">{service.title}</p>
                    </div>
                );
            })}
        </div>
    </section>
);

const JoinUsSection = () => (
    <section className="join-us-section">
        <div className="join-us-content">
            <div className="join-us-text">
                <h2 className="join-us-title">انضم إلينا الآن</h2>
                <p className="join-us-description">انضم إلى منصتنا لزيادة وصولك للعملاء وتنمية أعمالك.</p>
                
                <div className="steps">
                    <p className="step-item"><span className="step-number step-1">1</span> تسجيل سهل وسريع</p>
                    <p className="step-item"><span className="step-number step-2">2</span> بناء ملفك الشخصي</p>
                    <p className="step-item"><span className="step-number step-3">3</span> أضف خدماتك وصور أعمالك لجذب العملاء</p>
                </div>
            </div>
           <div className="join-us-action-card-wrapper">
            <div className="join-us-action-card">
                <button className="btn btn-create-account">إنشاء حساب</button>
            </div>
            </div>
        </div>
    </section>
);
const TestimonialsSection = () => (
    <section className="testimonials-section" dir="rtl">
        <h2 className="section-title testimonials-title">ثقة عملائنا</h2>
        <div className="testimonial-content">
            <button className="nav-arrow right-arrow"><ChevronRight size={30} /></button>
            
            <div className="testimonial-card">
                <img src={testimonialClient.img} alt={testimonialClient.name} className="testimonial-avatar" />
                <p className="quote">"{testimonialClient.quote}"</p>
                <h4 className="client-name">{testimonialClient.name}</h4>
                <p className="client-title">{testimonialClient.title}</p>
            </div>
            
            <button className="nav-arrow left-arrow"><ChevronLeft size={30} /></button>
        </div>
    </section>
);
const FinalCTASection = () => (
    <section className="final-cta-section" dir="rtl">
        <div className="final-cta-container">
            <h2 className="final-cta-title">هل أنت مستعد للبدء؟</h2>
            <p className="final-cta-subtitle">انضم الآن واحصل على أفضل الخدمات أو قدم خدماتك لآلاف العملاء المحتملين.</p>
            <button className="btn-final-cta">تسجيل مجاناً</button>
        </div>
    </section>
);
const FooterSection = () => (
    <footer className="footer-section" dir="rtl">
        <div className="footer-content main-content-wrapper">
            

            <div className="footer-column">
                <h3 className="column-title">خدمة</h3>
                <p>منصة تربط بين الحرفيين المهرة والعملاء الباحثين عن خدمات عالية الجودة.</p>
            </div>


            <div className="footer-column">
                <h3 className="column-title">روابط سريعة</h3>
                <ul className="footer-links">
                    <li><a href="#">خدماتنا</a></li>
                    <li><a href="#">كيف نعمل</a></li>
                </ul>
            </div>


            <div className="footer-column">
                <h3 className="column-title">الدعم</h3>
                <ul className="footer-links">
                    <li><a href="#">اتصل بنا</a></li>
                </ul>
            </div>


            <div className="footer-column contact-column">
                <h3 className="column-title">تواصل معنا</h3>
                <p>info@hirafee.com</p>
                <p>+000000</p>
                <div className="social-icons">
                    <a href="#"><Linkedin size={24} /></a>
                    <a href="#"><Instagram size={24} /></a>
                    <a href="#"><Twitter size={24} /></a>
                    <a href="#"><Facebook size={24} /></a>
                </div>
            </div>

        </div>
    </footer>
);
const HomePage = () => {
    return (
        <div className="search-page-container" dir="rtl">
            <style jsx="true">{`
                /* Global/Typography */
                .search-page-container {
                    
                    background-color: #f3f5f8;
                    min-height: 100vh;
                }
                a {
                    text-decoration: none;
                    color: inherit;
                }
                .text-right {
                    text-align: right;
                }

                .btn {
                    padding: 8px 20px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .btn-primary {
                    background-color: rgba(100, 205, 221, 1); 
                    color: #f8f8f8;
                }
                .btn-secondary {
                    background-color: #ffc107; /* أصفر فاتح */
                    color: #333;
                }
                .btn-primary:hover {
                    background-color: #53a8c7ff;
                }
                .btn-secondary:hover {
                    background-color: #e0a800;
                }
                .action-btn {
                    padding: 10px 25px;
                    border-radius: 6px;
                    font-size: 14px;
                }
                
                /* Hero Section (The Blue Banner) */
                .hero-section {
                    background: linear-gradient(to right, #53a8c7ff, rgba(100, 205, 221, 1)); /* تدرج أزرق */
                    color: #f8f8f8;
                    padding: 60px 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .hero-content {
                    max-width: 1200px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-align: right;
                }
                .hero-text {
                    flex-basis: 60%;
                }
                .hero-text h1 {
                    font-size: 3rem;
                    font-weight: 800;
                    margin: 0 0 10px 0;
                }
                .hero-text p {
                    font-size: 1.1rem;
                    color: #e0e0e0;
                    margin-bottom: 30px;
                }
                .hero-image-container {
                    flex-basis: 30%;
                    display: flex;
                    justify-content: flex-start; /* الصورة على اليسار في هذا القسم */
                }
                .hero-image {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 5px solid #f8f8f8;
                }

                /* Search Input */
                .search-form {
                    display: flex;
                    max-width: 500px;
                    background-color: #f8f8f8;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                .search-input {
                    flex-grow: 1;
                    padding: 12px 15px;
                    border: none;
                    font-size: 16px;
                    text-align: right;
                }
                .search-button {
                    background-color: #ffc107;
                    padding: 10px 15px;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .search-button:hover {
                    background-color: #e0a800;
                }
                .search-button .search-icon {
                    color: #333;
                }
                .results-wrapper {
                    background-color: #eaeef4ff; /* اللون الرمادي الفاتح الذي يحيط بالبطاقات */
                   
                }
                /* Search Results Section */
                .results-section {
                    
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 50px;
                    
                }
                .craftsmen-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 30px;
                }

                /* Craftsman Card Styling */
                .craftsman-card {
                    background-color: #eaeef4ff;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                    text-align: center;
                    position: relative;
                }
                .status-tag {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background-color: rgba(100, 205, 221, 1); 
                    color: #ffffff;
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                }
                .craftsman-image {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 15px;
                    border: 3px solid #f8f8f8;
                }
                .craftsman-name {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #333;
                    margin-bottom: 5px;
                }
                .craftsman-job {
                    font-size: 0.9rem;
                    color: #333;
                    margin-bottom: 10px;
                }
                .rating {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    margin-bottom: 15px;
                }
                .rating-value {
                    font-weight: 600;
                    color: #333;
                    font-size: 0.9rem;
                }
                .star-icons {
                    display: flex;
                    gap: 2px;
                }
                .reviews-count {
                    font-size: 0.8rem;
                    color: #777;
                }
                .actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }
                .actions .btn {
                    flex-grow: 1;
                    padding: 8px 10px;
                    font-size: 14px;
                    border-radius: 6px;
                }
                                    /* Services Section */
                .services-section {
                    max-width: 1200px;
                    margin: 60px auto;
                    padding: 0 50px;
                    text-align: center;
                    background-color: #f3f5f8;
                }
                .services-section .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #333;
                    margin-bottom: 40px;
                }
                .services-grid {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                .service-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100px; /* لتقييد عرض الأيقونة والنص */
                    text-align: center;
                }
                .service-icon-wrapper {
                    background-color: #d6f0f7ff; /* أزرق فاتح جداً */
                    border-radius: 50%;
                    width: 65px;
                    height: 65px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .service-icon {
                    color:  rgba(94, 192, 207, 1);
                }
                .service-title {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #333;
                }
                /* Join Us Section */
                .join-us-section {
                    background-color: #eaeef4ff; 
                    padding: 60px 50px;
                    margin-bottom: 60px;
                }
                .join-us-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 50px;
                    text-align: right;
                }
                .join-us-text {
                    flex-basis: 50%;
                }
                .join-us-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #333;
                    margin-bottom: 15px;
                }
                .join-us-description {
                    font-size: 1rem;
                    color: #555;
                    margin-bottom: 30px;
                }
                .steps {
                    font-size: 1rem;
                    color: #555;
                }
                .step-item {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: flex-start;
                }
                .step-number {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: 700;
                    color: #ffffff;
                    font-size: 14px;
                    margin-left: 10px; 
                    flex-shrink: 0;
                }
                .step-1 { background-color: #ffc107; } 
                .step-2 { background-color: #ffc107; } 
                .step-3 { background-color: #ffc107; } 
                .join-us-action-card-wrapper {
                    flex-basis: 40%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .join-us-action-card {
                    width: 250px
                    aspect-ratio: 1 / 1;
                    background-color: #f3f5f8;
                    padding: 50px;
                    border-radius: 12px;
                    box-shadow: 0 px 20px rgba(0, 0, 0, 0.08);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .btn-create-account {
                    background-color: rgba(100, 205, 221, 1);  
                    color: #ffffff;
                    padding: 12px 40px;
                    font-size: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }
                .btn-create-account:hover {
                    background-color: rgba(100, 205, 221, 1); ;
                }
               /* Testimonials Section */
                .testimonials-section {
                    padding: 0px 20px 50px 20px;
                    max-width: 1000px;
                    margin: 0 auto;
                    text-align: center;
                }
                .testimonials-title {
                    color: #333;
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 40px;
                }
                .testimonial-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                }
                .testimonial-card {
                    background-color: #f3f5f8;;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                    max-width: 600px;
                    flex-grow: 1;
                    position: relative;
                }
                .testimonial-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin: 0 auto 20px;
                    display: block;
                }
                .quote {
                    font-style: italic;
                    color: #555;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .client-name {
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 5px;
                }
                .client-title {
                    font-size: 14px;
                    color: #999;
                }
                .nav-arrow {
                    background: none;
                    border: none;
                    color:  rgba(100, 205, 221, 1); ;
                    cursor: pointer;
                    padding: 10px;
                    transition: color 0.3s;
                }
                .nav-arrow:hover {
                    color: #53a8c7ff;
                }
                
                /* Final CTA Section */
                .final-cta-section {
                    background-color: #53a8c7ff; 
                    padding: 80px 50px;
                    text-align: center;
                }
                .final-cta-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .final-cta-title {
                    color: white;
                    font-size: 36px;
                    font-weight: 800;
                    margin-bottom: 10px;
                }
                .final-cta-subtitle {
                    color: #e3f2fd;
                    font-size: 18px;
                    margin-bottom: 30px;
                }
                .btn-final-cta {
                    background-color: #ffc107; /* Yellow */
                    color: #1a1a1a;
                    padding: 15px 40px;
                    border: none;
                    border-radius: 8px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.1s;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .btn-final-cta:hover {
                    background-color: #ffda6a;
                }
                /* Media Queries for Responsiveness */
                @media (max-width: 992px) {
                    .hero-content {
                        flex-direction: column-reverse;
                        text-align: center;
                    }
                    .hero-text, .hero-image-container {
                        flex-basis: 100%;
                    }
                    .hero-image-container {
                        justify-content: center;
                        margin-bottom: 30px;
                    }
                    .hero-text h1 {
                        font-size: 2.5rem;
                    }
                    .hero-text p {
                        font-size: 1rem;
                    }
                }
                @media (max-width: 768px) {
                    .hero-section {
                        padding: 40px 20px;
                    }
                    .results-section {
                        padding: 0 20px;
                    }
                    .craftsmen-grid {
                        grid-template-columns: 1fr;
                    }
                }
            /* 8. Footer Section Styles */
            .footer-section {
                background-color: var(--background-light);
                padding-bottom: 50px;
            }
            .footer-content {
                display: flex;
                justify-content: space-around;
                text-align: right;
                border-top: 1px solid #ddd;
                padding-top: 40px;
            }
            .footer-column {
                color: #666;
            }
            .column-title {
                font-size: 18px;
                font-weight: 700;
                color: var(--primary-color);
                margin-bottom: 15px;
            }
            .footer-column p, .footer-links a {
                font-size: 14px;
                margin-bottom: 10px;
                display: block;
                color: #777;
            }
            .footer-links {
                list-style: none;
                padding: 0;
            }
            .social-icons {
                display: flex;
                gap: 15px;
                margin-top: 15px;
            }
            .social-icons a {
                color: var(--primary-color);
                transition: color 0.2s;
            }
            .social-icons a:hover {
                color: var(--accent-teal);
            }
            
            /* Footer Responsive */
            @media (max-width: 768px) {
                .footer-content {
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }
                .footer-column {
                    margin-bottom: 20px;
                }
            }
            @media (max-width: 500px) {
                .footer-content {
                    grid-template-columns: 1fr;
                }
                .header, .hero-content {
                    flex-direction: column;
                    text-align: center;
                }
                .nav-links {
                    margin-top: 15px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .nav-links a {
                    margin: 5px 10px;
                }
                .hero-image {
                    margin-top: 30px;
                }
                .search-box {
                    max-width: 100%;
                }
            }

            `}</style>

           
            {/* Hero Section / القسم البطل */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>اعثر على الحرفي الموثوق بسهولة</h1>
                        <p>ابحث عن أفضل الحرفيين في منطقتك بأسعار تنافسية وجودة عالية.</p>
                        
                        {/* Search Input */}
                        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                            <button className="search-button" type="submit">
                                <Search size={24} className="search-icon" />
                            </button>
                            <input 
                                type="text" 
                                placeholder="ابحث عن كهربائي، سباك، نجار..." 
                                className="search-input" 
                            />
                        </form>
                    </div>
                    
                    <div className="hero-image-container">
                        <img 
                            src={Himg}
                            alt="حرفي يعمل" 
                            className="hero-image" 
                        />
                    </div>
                </div>
            </section>

            {/* Search Results / نتائج البحث */}
             <div className="results-wrapper">
                <section className="results-section">
                    <div className="craftsmen-grid">
                        {CRAFTSMEN_DATA.map((craftsman, index) => (
                            <CraftsmanCard key={index} craftsman={craftsman} />
                        ))}
                    </div>
                </section>
             </div>
            <ServicesSection/>
            <JoinUsSection/>
            <TestimonialsSection />
            <FinalCTASection />
            <FooterSection/>
        </div>
    );
};

export default HomePage;
