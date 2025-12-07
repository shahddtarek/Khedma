import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Droplets,
    Paintbrush,
    Hammer,
    Wrench,
    Zap,
    Clock,
    Search,
    Settings,
    Waves,
    AlertCircle,
    DoorOpen,
    Armchair,
    Wand2,
    Palette,
    Move,
    ArrowLeft,
    Check,
    Mail,
    Instagram,
    Twitter,
    Facebook,
    Linkedin,
    ChevronLeft,
    ChevronRight,
    Star,
    Phone
} from 'lucide-react';
import Himg from '../assets/Images/H.jpg';
import Cimg from '../assets/Images/c.jpg';

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
    { icon: Zap, title: "الكهرباء", color: "#06b6d4", bgGradient: "from-cyan-50 to-sky-50" },
    { icon: Hammer, title: "النجارة", color: "#eab308", bgGradient: "from-yellow-50 to-amber-50" },
    { icon: Droplets, title: "تنظيف", color: "#06b6d4", bgGradient: "from-cyan-50 to-sky-50" },
    { icon: Paintbrush, title: "الدهانات", color: "#f59e0b", bgGradient: "from-amber-50 to-orange-50" },
    { icon: Wrench, title: "السباكة", color: "#8b5cf6", bgGradient: "from-purple-50 to-violet-50" },
];

const CraftsmanCard = ({ craftsman, delay }) => {
    const navigate = useNavigate();

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
        <div className="craftsman-card" style={{ animationDelay: `${delay}ms` }}>
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
                <button
                    className="btn btn-order"
                    onClick={() => {
                        alert('هذا المزود للعرض فقط. للطلب اختر مزوداً مسجلاً.');
                    }}
                    type="button"
                >
                    اطلب الآن
                </button>
                <button
                    className="btn btn-primary btn-profile"
                    onClick={() => navigate('/provider-profile', { state: { provider: craftsman } })}
                    type="button"
                >
                    ملف شخصي
                </button>
            </div>
        </div>
    );
};

// مكون قسم الخدمات
const ServicesSection = () => (
    <section className="services-section">
        <div className="detailed-wrapper">
            <div className="detailed-header">
                <h2 className="detailed-heading">خدماتنا</h2>
                <p className="detailed-subheading">اختر من بين مجموعة واسعة من الخدمات المتاحة</p>
            </div>

            <div className="services-grid">
                {SERVICES_DATA.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                        <div key={index} className="service-card" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className={`service-icon-bg ${service.bgGradient}`}>
                                <IconComponent size={32} color={service.color} strokeWidth={2.5} />
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const JoinUsSection = ({ onRegister }) => (
    <section className="join-us-section">
        <div className="detailed-wrapper">
            <div className="join-us-content">
                <div className="join-us-text">
                    <h2 className="join-us-title">انضم إلينا الآن</h2>
                    <p className="join-us-description">انضم إلى منصتنا لزيادة وصولك للعملاء وتنمية أعمالك.</p>

                    <div className="steps">
                        <div className="step-item">
                            <span className="step-number" style={{ backgroundColor: '#06b6d4' }}>1</span>
                            <span>تسجيل سهل وسريع</span>
                        </div>
                        <div className="step-item">
                            <span className="step-number" style={{ backgroundColor: '#eab308' }}>2</span>
                            <span>بناء ملفك الشخصي</span>
                        </div>
                        <div className="step-item">
                            <span className="step-number" style={{ backgroundColor: '#8b5cf6' }}>3</span>
                            <span>أضف خدماتك وصور أعمالك لجذب العملاء</span>
                        </div>
                    </div>
                </div>

                <div className="join-us-action-card-wrapper">
                    <div className="join-us-action-card">
                        <button className="btn-create-account" type="button" onClick={onRegister}>
                            إنشاء حساب
                            <ArrowLeft size={20} style={{ marginRight: '8px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "سلمى منصور",
        title: "صاحبة منزل",
        quote: "تجربة رائعة بكل المقاييس. السباك وصل في الميعاد المحدد، وكان احترافياً جداً، وشرح لي المشكلة بوضوح قبل الإصلاح. تطبيق ممتاز!",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
    },
    {
        id: 2,
        name: "خالد العتيبي",
        title: "مدير مطعم",
        quote: "استجابة سريعة جداً في وقت متأخر من الليل. الكهربائي أنقذنا من كارثة حقيقية في المطبخ. الأسعار معقولة جداً مقارنة بالجودة.",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
    },
    {
        id: 3,
        name: "نادية حسن",
        title: "مهندسة ديكور",
        quote: "كمهندسة ديكور، أعتمد على هذا التطبيق للوصول لحرفيين ماهرين لمشاريعي. دقة في المواعيد وإتقان في التشطيبات.",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
    },
    {
        id: 4,
        name: "عمر فاروق",
        title: "صاحب شركة ناشئة",
        quote: "النظافة بعد العمل هي أهم شيء بالنسبة لي، وهذا ما وجدته مع النجارين هنا. عمل نظيف ومرتب وسريع.",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces"
    }
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }
        })
    };

    const swipe = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = TESTIMONIALS_DATA.length - 1;
            if (nextIndex >= TESTIMONIALS_DATA.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

    return (
        <section className="testimonials-section">
            <div className="detailed-wrapper">
                <div className="detailed-header">
                    <Sparkles size={24} color="#3B82F6" style={{ marginBottom: '10px' }} />
                    <h2 className="detailed-heading">ماذا يقول عملاؤنا؟</h2>
                    <p className="detailed-subheading">قصص نجاح حقيقية من أشخاص وثقوا بنا</p>
                </div>

                <div className="testimonial-slider-container">
                    {/* Background decorations */}
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>

                    <div className="slider-controls">
                        <button className="nav-btn prev-btn" onClick={() => swipe(-1)}>
                            <ChevronRight size={28} />
                        </button>

                        <div className="card-animation-wrapper">
                            <AnimatePresence initial={false} custom={direction} mode='wait'>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="premium-testimonial-card"
                                >
                                    <div className="card-top-accent"></div>
                                    <div className="avatar-wrapper-premium">
                                        <img
                                            src={currentTestimonial.img}
                                            alt={currentTestimonial.name}
                                            className="premium-avatar"
                                        />
                                        <div className="quote-badge">
                                            <span style={{ fontSize: '20px', lineHeight: 1 }}>❝</span>
                                        </div>
                                    </div>

                                    <div className="content-body">
                                        <p className="premium-quote">{currentTestimonial.quote}</p>

                                        <div className="divider"></div>

                                        <div className="author-info">
                                            <h4 className="author-name">{currentTestimonial.name}</h4>
                                            <p className="author-role">{currentTestimonial.title}</p>
                                        </div>

                                        <div className="stars-row">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} size={14} fill="#FBBF24" color="#FBBF24" />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button className="nav-btn next-btn" onClick={() => swipe(1)}>
                            <ChevronLeft size={28} />
                        </button>
                    </div>

                    <div className="slider-dots">
                        {TESTIMONIALS_DATA.map((_, idx) => (
                            <span
                                key={idx}
                                className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FinalCTASection = ({ onRegister }) => (
    <section className="final-cta-section">
        <div className="final-cta-container">
            <Sparkles size={48} color="white" className="cta-sparkles" />
            <h2 className="final-cta-title">هل أنت مستعد للبدء؟</h2>
            <p className="final-cta-subtitle">انضم الآن واحصل على أفضل الخدمات أو قدم خدماتك لآلاف العملاء المحتملين.</p>
            <button className="btn-final-cta" type="button" onClick={onRegister}>
                تسجيل مجاناً
                <ArrowLeft size={20} style={{ marginRight: '8px' }} />
            </button>
        </div>
    </section>
);

const FooterSection = () => (
    <footer className="footer-section">
        <div className="footer-content">
            <div className="footer-column">
                <div className="footer-brand">
                    <Sparkles size={24} color="#3B82F6" />
                    <h3 className="column-title">خدمة</h3>
                </div>
                <p>منصة تربط بين الحرفيين المهرة والعملاء الباحثين عن خدمات عالية الجودة.</p>
            </div>

            <div className="footer-column">
                <h3 className="column-title">روابط سريعة</h3>
                <ul className="footer-links">
                    <li><Link to="/service-categories">خدماتنا</Link></li>
                    <li><Link to="/about">كيف نعمل</Link></li>
                </ul>
            </div>

            <div className="footer-column">
                <h3 className="column-title">الدعم</h3>
                <ul className="footer-links">
                    <li><Link to="/contact-us">اتصل بنا</Link></li>
                </ul>
            </div>

            <div className="footer-column contact-column">
                <h3 className="column-title">تواصل معنا</h3>
                <div className="contact-info">
                    <p>
                        <Mail size={16} style={{ marginLeft: '8px' }} />
                        info@hirafee.com
                    </p>
                    <p>
                        <Phone size={16} style={{ marginLeft: '8px' }} />
                        +000000
                    </p>
                </div>
                <div className="social-icons">
                    <Link to="/about" aria-label="لينكدإن">
                        <Linkedin size={20} />
                    </Link>
                    <Link to="/service-categories" aria-label="إنستغرام">
                        <Instagram size={20} />
                    </Link>
                    <Link to="/service-search" aria-label="تويتر">
                        <Twitter size={20} />
                    </Link>
                    <Link to="/contact-us" aria-label="فيسبوك">
                        <Facebook size={20} />
                    </Link>
                </div>
            </div>
        </div>
    </footer>
);

const HomePage = () => {
    const navigate = useNavigate();
    const goToRegister = () => navigate('/register');

    return (
        <div className="page-wrapper" dir="rtl">
            {/* Hero Banner Section */}
            <section className="hero-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-banner"
                >
                    <h2>اعثر على أفضل الحرفيين بسهولة</h2>
                    <p>استكشف خدماتنا واختر الحرفي المناسب لمنزلك أو مشروعك.</p>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/service-search')}
                    >
                        استعرض الحرفيين
                    </button>
                </motion.div>
            </section>



            <ServicesSection />
            <JoinUsSection onRegister={goToRegister} />
            <TestimonialsSection />
            <FinalCTASection onRegister={goToRegister} />
            <FooterSection />

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

                /* Hero Banner Section */
                .hero-section {
                    margin-bottom: 60px;
                    margin-top: 40px;
                }

                .hero-banner {
                    background: linear-gradient(135deg, #3B82F6 0%, #38BDF8 100%);
                    border-radius: 32px;
                    padding: 80px 48px;
                    text-align: center;
                    color: white;
                    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
                    position: relative;
                    overflow: hidden;
                    animation: heroFloat 6s ease-in-out infinite alternate;
                }

                .hero-banner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }

                @keyframes heroFloat {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(-8px); }
                }

                .hero-banner h2 {
                    font-size: clamp(32px, 5vw, 48px);
                    font-weight: 800;
                    margin-bottom: 16px;
                    line-height: 1.3;
                    position: relative;
                    z-index: 1;
                }

                .hero-banner p {
                    font-size: 18px;
                    margin-bottom: 32px;
                    line-height: 1.6;
                    color: #E0F2FE;
                    position: relative;
                    z-index: 1;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .btn-primary {
                    background: white;
                    color: #3B82F6;
                    border: 2px solid white;
                    padding: 16px 40px;
                    border-radius: 16px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'Tajawal', sans-serif;
                    position: relative;
                    z-index: 1;
                }

                .btn-primary:hover {
                    background: transparent;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
                    border: 2px solid white;
                }

                /* Detailed Wrapper */
                .detailed-wrapper {
                    background: white;
                    border-radius: 32px;
                    padding: 48px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    margin-bottom: 40px;
                }

                .detailed-header {
                    text-align: center;
                    margin-bottom: 48px;
                }

                .detailed-heading {
                    font-size: clamp(28px, 4vw, 40px);
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 12px;
                }

                .detailed-subheading {
                    font-size: 16px;
                    color: #6B7280;
                }

                /* Craftsmen Grid */
                .craftsmen-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                }

                .craftsman-card {
                    background: #F9FAFB;
                    border: 2px solid #E5E7EB;
                    border-radius: 24px;
                    padding: 32px 24px;
                    text-align: center;
                    position: relative;
                    transition: all 0.3s ease;
                    animation: fadeInUp 0.6s ease forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .craftsman-card:hover {
                    border-color: #3B82F6;
                    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
                    transform: translateY(-4px);
                }

                .status-tag {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    background: linear-gradient(135deg, #3B82F6, #38BDF8);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .craftsman-image {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 16px;
                    border: 3px solid #E5E7EB;
                }

                .craftsman-name {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 8px;
                }

                .craftsman-job {
                    font-size: 14px;
                    color: #6B7280;
                    margin-bottom: 16px;
                }

                .rating {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 20px;
                }

                .rating-value {
                    font-weight: 700;
                    color: #1F2937;
                }

                .star-icons {
                    display: flex;
                    gap: 2px;
                }

                .reviews-count {
                    font-size: 14px;
                    color: #6B7280;
                }

                .actions {
                    display: flex;
                    gap: 12px;
                }

                .btn {
                    flex: 1;
                    padding: 10px 16px;
                    border: none;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: 'Tajawal', sans-serif;
                }

                .btn-primary {
                    background: white;
                    color: #3B82F6;
                    border: 2px solid #3B82F6;
                }

                .btn-order {
                    flex: 1;
                    padding: 10px 16px;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    border: 2px solid #3B82F6;
                    background: #3B82F6;
                    color: #ffffff;
                    transition: all 0.3s ease;
                    font-family: 'Tajawal', sans-serif;
                }

                .btn-order:hover {
                    background: #ffffff;
                    color: #3B82F6;
                    border-color: #3B82F6;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
                }

                .btn-secondary {
                    background: white;
                    color: #3B82F6;
                    border: 2px solid #3B82F6;
                }

                .btn-profile {
                    background: transparent;
                    color: #1F2937; /* dark gray for elegance */
                    font-weight: 600;
                    border: 1.8px solid transparent;
                    padding: 8px 14px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    font-family: 'Tajawal', sans-serif;
                }

                .btn:hover {
                    background: #3B82F6;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

               .btn-profile:hover {
                    border-color: #3B82F6;
                    color: #3B82F6;
                    background: rgba(59, 130, 246, 0.06);
                    transform: translateY(-2px);
                }

                /* Services Grid */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                }

                .service-card {
                    background: white;
                    border: 2px solid #F3F4F6;
                    border-radius: 20px;
                    padding: 32px 24px;
                    text-align: center;
                    transition: all 0.3s ease;
                    animation: fadeInUp 0.6s ease forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .service-card:hover {
                    border-color: #3B82F6;
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
                }

                .service-icon-bg {
                    width: 80px;
                    height: 80px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                }

                .service-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1F2937;
                }

                /* Join Us Section */
                .join-us-content {
                    display: flex;
                    align-items: center;
                    gap: 48px;
                }

                .join-us-text {
                    flex: 1;
                }

                .join-us-title {
                    font-size: clamp(28px, 4vw, 40px);
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 16px;
                }

                .join-us-description {
                    font-size: 16px;
                    color: #6B7280;
                    margin-bottom: 32px;
                    line-height: 1.6;
                }

                .steps {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .step-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 16px;
                    color: #4B5563;
                }

                .step-number {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 14px;
                    flex-shrink: 0;
                }

                .join-us-action-card-wrapper {
                    flex-shrink: 0;
                }

                .join-us-action-card {
                    background: linear-gradient(135deg, #F9FAFB, #F3F4F6);
                    border-radius: 24px;
                    padding: 40px;
                    text-align: center;
                    border: 2px solid rgba(255, 255, 255, 0.8);
                }

                .btn-create-account {
                    background: #3B82F6;
                    color: white;
                    border: 2px solid #3B82F6;
                    padding: 16px 32px;
                    border-radius: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    font-family: 'Tajawal', sans-serif;
                }

                .btn-create-account:hover {
                    background: white;
                    color: #3B82F6;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
                }

                /* Testimonials Premium Styles */
                .testimonial-slider-container {
                    position: relative;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 20px 0;
                }

                .slider-controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 32px;
                    margin-bottom: 24px;
                }

                .card-animation-wrapper {
                    width: 100%;
                    max-width: 550px;
                    min-height: 380px; /* Force height to prevent layout shifts */
                    position: relative;
                    display: flex;
                    justify-content: center;
                }

                .premium-testimonial-card {
                    background: white;
                    border-radius: 24px;
                    padding: 0;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05); /* Soft, premium shadow */
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    position: absolute;
                    width: 100%;
                    overflow: hidden;
                }

                .card-top-accent {
                    height: 8px;
                    background: linear-gradient(90deg, #3B82F6, #38BDF8);
                    width: 100%;
                }

                .avatar-wrapper-premium {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin: -50px auto 20px; /* Pull up to overlap top */
                    top: 50px;
                }

                .premium-avatar {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid white;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }

                .quote-badge {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 32px;
                    height: 32px;
                    background: #3B82F6;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
                }

                .content-body {
                    padding: 60px 32px 32px;
                    text-align: center;
                }

                .premium-quote {
                    font-size: 17px;
                    line-height: 1.7;
                    color: #374151;
                    font-style: italic;
                    margin-bottom: 24px;
                }

                .divider {
                    width: 40px;
                    height: 4px;
                    background: #F3F4F6;
                    margin: 0 auto 20px;
                    border-radius: 2px;
                }

                .author-name {
                    font-size: 20px;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 4px;
                }

                .author-role {
                    font-size: 14px;
                    color: #6B7280;
                    margin-bottom: 12px;
                }

                .stars-row {
                    display: flex;
                    justify-content: center;
                    gap: 4px;
                }

                /* Nav Buttons */
                .nav-btn {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: white;
                    border: 1px solid #E5E7EB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6B7280;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    z-index: 10;
                }

                .nav-btn:hover {
                    background: #2563EB;
                    color: white;
                    border-color: #2563EB;
                    transform: scale(1.1);
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
                }

                /* Dots */
                .slider-dots {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }

                .slider-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #E5E7EB;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .slider-dot.active {
                    background: #3B82F6;
                    width: 24px;
                    border-radius: 10px;
                }

                /* Background Blobs */
                .blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(40px);
                    opacity: 0.5;
                    z-index: 0;
                }

                .blob-1 {
                    top: -20px;
                    left: 20%;
                    width: 200px;
                    height: 200px;
                    background: #DBEAFE;
                    animation: floatBlob 8s infinite alternate;
                }

                .blob-2 {
                    bottom: -40px;
                    right: 20%;
                    width: 250px;
                    height: 250px;
                    background: #F3E8FF;
                    animation: floatBlob 10s infinite alternate-reverse;
                }

                @keyframes floatBlob {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(20px, 40px); }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .slider-controls {
                        gap: 16px;
                    }
                    
                    .nav-btn {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 40px;
                        height: 40px;
                    }

                    .prev-btn { right: -10px; }
                    .next-btn { left: -10px; }
                }

                /* Final CTA */
                .final-cta-section {
                    background: linear-gradient(135deg, #3B82F6 0%, #38BDF8 100%);
                    border-radius: 32px;
                    padding: 80px 48px;
                    text-align: center;
                    margin-bottom: 40px;
                }

                .final-cta-container {
                    max-width: 600px;
                    margin: 0 auto;
                }

                .cta-sparkles {
                    margin-bottom: 20px;
                }

                .final-cta-title {
                    color: white;
                    font-size: clamp(32px, 5vw, 48px);
                    font-weight: 800;
                    margin-bottom: 16px;
                    line-height: 1.3;
                }

                .final-cta-subtitle {
                    color: #E0F2FE;
                    font-size: 18px;
                    margin-bottom: 32px;
                    line-height: 1.6;
                }

                .btn-final-cta {
                    background: white;
                    color: #3B82F6;
                    border: 2px solid white;
                    padding: 16px 40px;
                    border-radius: 16px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    margin: 0 auto;
                    font-family: 'Tajawal', sans-serif;
                }

                .btn-final-cta:hover {
                    background: transparent;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
                }

                /* Footer */
                .footer-section {
                    background: white;
                    border-radius: 32px;
                    padding: 60px 48px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                }

                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 40px;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 16px;
                }

                .column-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #3B82F6;
                    margin-bottom: 16px;
                }

                .footer-column p {
                    color: #6B7280;
                    line-height: 1.6;
                    margin-bottom: 16px;
                }

                .footer-links {
                    list-style: none;
                }

                .footer-links li {
                    margin-bottom: 8px;
                }

                .footer-links a {
                    color: #6B7280;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-links a:hover {
                    color: #3B82F6;
                }

                .contact-info p {
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .social-icons {
                    display: flex;
                    gap: 12px;
                    margin-top: 20px;
                }

                .social-icons a {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: #F3F4F6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #3B82F6;
                    transition: all 0.3s ease;
                }

                .social-icons a:hover {
                    background: #3B82F6;
                    color: white;
                    transform: translateY(-2px);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .page-wrapper {
                        padding: 20px 16px;
                    }

                    .detailed-wrapper {
                        padding: 32px 24px;
                    }

                    .hero-banner {
                        padding: 60px 24px;
                    }

                    .join-us-content {
                        flex-direction: column;
                        text-align: center;
                    }

                    .testimonial-content {
                        flex-direction: column;
                    }

                    .craftsmen-grid {
                        grid-template-columns: 1fr;
                    }

                    .services-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .footer-content {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }

                    .footer-brand {
                        justify-content: center;
                    }

                    .final-cta-section {
                        padding: 60px 24px;
                    }
                }

                @media (max-width: 480px) {
                    .services-grid {
                        grid-template-columns: 1fr;
                    }

                    .actions {
                        flex-direction: column;
                        gap: 8px;
                        margin-top: 16px;
                        padding-top: 16px;
                        border-top: 1px solid #E5E7EB;
                    }

                    .btn {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default HomePage;