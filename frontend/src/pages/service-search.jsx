import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Hammer, ChevronLeft, ChevronRight, Cog, PaintRoller, Fan, Cpu, Wrench  } from "lucide-react";
import * as dataService from '../services/dataService';
import { useAuth } from '../context/AuthContext.jsx';

import { useModal } from '../context/ModalContext'; 

export default function ServicesPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showModal } = useModal(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [registeredWorkers, setRegisteredWorkers] = useState([]);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [orderForm, setOrderForm] = useState({
        serviceName: '',
        description: '',
        appointmentDate: '',
        phone: '',
    });
    const [orderSubmitting, setOrderSubmitting] = useState(false);

    const staticWorkers = [
        {
            id: 2,
            name: "يوسف محمود",
            profession: "carpenter",
            profession_ar: "نجار",
            distance: 5.3,
            rating: 4.7,
            status: "available",
            completedJobs: 203,
            yearsExp: 12
        },
        {
            id: 3,
            name: "خالد علي",
            profession: "plumber",
            profession_ar: "سباك",
            distance: 3.1,
            rating: 4.5,
            status: "busy",
            completedJobs: 89,
            yearsExp: 5
        },
        {
            id: 4,
            name: "عمر حسن",
            profession: "electrician",
            profession_ar: "كهربائي",
            distance: 2.4,
            rating: 4.8,
            status: "available",
            completedJobs: 178,
            yearsExp: 10
        },
        {
            id: 6,
            name: "محمد عبدالله",
            profession: "electronics",
            profession_ar: "فني إلكترونيات",
            distance: 6.2,
            rating: 4.4,
            status: "available",
            completedJobs: 92,
            yearsExp: 6
        },
        {
            id: 7,
            name: "حسن إبراهيم",
            profession: "carpenter",
            profession_ar: "نجار",
            distance: 3.7,
            rating: 4.9,
            status: "busy",
            completedJobs: 245,
            yearsExp: 15
        },
        {
            id: 8,
            name: "سعيد أحمد",
            profession: "plumber",
            profession_ar: "سباك",
            distance: 2.1,
            rating: 4.7,
            status: "available",
            completedJobs: 167,
            yearsExp: 9
        }
    ].map((worker) => ({ ...worker, isRegistered: false }));

    const categories = [
  { key: "all", name: "الكل", icon: Cog, color: "#2563eb", bg: "#eff6ff", bgGradient: "from-blue-50 to-sky-50" },
  { key: "electrician", name: "الكهرباء", icon: Zap, color: "#eab308", bg: "#fef9c3", bgGradient: "from-yellow-50 to-amber-50" },
  { key: "plumber", name: "السباكة", icon: Wrench, color: "#0284c7", bg: "#e0f2fe", bgGradient: "from-sky-50 to-blue-50" },
  { key: "carpenter", name: "النجارة", icon: Hammer, color: "#8b5cf6", bg: "#ede9fe", bgGradient: "from-purple-50 to-violet-50" },
  { key: "hvac", name: "فني تكييفات", icon: Fan, color: "#0ea5e9", bg: "#e0f2fe", bgGradient: "from-sky-50 to-blue-50" },
  { key: "naqash", name: "نقاشة", icon: PaintRoller, color: "#f97316", bg: "#ffedd5", bgGradient: "from-orange-50 to-amber-50" },
  { key: "electronics", name: "فني إلكترونيات", icon: Cpu, color: "#16a34a", bg: "#dcfce7", bgGradient: "from-green-50 to-emerald-50" }
];

    const checkWorkerAvailability = (worker) => {
        if (!worker.availableHours || !worker.availableDays || worker.availableDays.length === 0) {
            return false;
        }
        const now = new Date();
        const dayIndex = now.getDay(); 
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDayKey = dayNames[dayIndex];
        if (!worker.availableDays.includes(currentDayKey)) {
            return false;
        }
        const hoursMatch = worker.availableHours.match(/(\d+)\s+(AM|PM)\s*-\s*(\d+)\s+(AM|PM)/);
        if (!hoursMatch) {
            return true; 
        }

        const [, startHour, startPeriod, endHour, endPeriod] = hoursMatch;
        let startTime = parseInt(startHour);
        let endTime = parseInt(endHour);

        if (startPeriod === 'PM' && startTime !== 12) startTime += 12;
        if (startPeriod === 'AM' && startTime === 12) startTime = 0;
        if (endPeriod === 'PM' && endTime !== 12) endTime += 12;
        if (endPeriod === 'AM' && endTime === 12) endTime = 0;
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime24 = currentHour * 60 + currentMinute; 
        const startTime24 = startTime * 60;
        const endTime24 = endTime * 60;
        return currentTime24 >= startTime24 && currentTime24 <= endTime24;
    };

    useEffect(() => {
        const workers = dataService.getAllWorkers();
        const mapped = workers.map((worker) => {
            const ratingStats = dataService.getRatingStatsForUser?.(worker.id) || { average: 0 };
            const jobs = dataService.getJobsForWorker?.(worker.id) || [];
            const completedCount = jobs.filter((job) => job.status === 'completed').length;

            const isAvailable = checkWorkerAvailability(worker);

            return {
                id: worker.id,
                name: worker.fullName || worker.name || worker.email,
                profession: worker.professionKey,
                profession_ar: worker.profession_ar || 'حرفي',
                distance: (Math.random() * 5 + 1).toFixed(1),
                rating: ratingStats.average ? Number(ratingStats.average.toFixed(1)) : 0,
                status: isAvailable ? 'available' : 'busy',
                completedJobs: completedCount,
                yearsExp: worker.yearsExperience || 1,
                photos: worker.workPhotos || worker.photos || [],
                isRegistered: true,
                profilePhoto: worker.profilePhoto || null,
                availableHours: worker.availableHours || '',
                availableDays: worker.availableDays || [],
            };
        });
        setRegisteredWorkers(mapped);
    }, []);

    const allWorkersData = [...staticWorkers, ...registeredWorkers];

    const handleOrderNow = (worker) => {
        if (!user) {
            showModal('يرجى تسجيل الدخول لتقديم طلب خدمة.', 'تنبيه');
            return;
        }
        if (!worker?.isRegistered) {
            showModal('هذا المزود للعرض فقط. اختر مزوداً مسجلاً لعمل طلب حقيقي.', 'تنبيه');
            return;
        }
        setSelectedWorker(worker);
        setOrderForm({
            serviceName: worker.profession_ar || '',
            description: '',
            appointmentDate: '',
            phone: user?.phone || '',
        });
        setOrderModalOpen(true);
    };

    const handleOrderSubmit = (event) => {
        event.preventDefault();
        if (!selectedWorker || !user) return;
        if (!orderForm.description || !orderForm.appointmentDate) {
            showModal('من فضلك اكتب وصف المشكلة وحدد موعداً مناسباً.', 'خطأ', 'error');
            return;
        }
        setOrderSubmitting(true);
        try {
            dataService.createJob({
                clientId: user.id,
                clientName: user.fullName || user.name || user.email,
                workerId: selectedWorker.id,
                workerName: selectedWorker.name,
                serviceName: orderForm.serviceName || selectedWorker.profession_ar,
                description: orderForm.description,
                phone: orderForm.phone || user.phone || 'غير محدد',
                location: user.address || user.city || 'غير محدد',
                appointmentDate: orderForm.appointmentDate,
            });
            showModal('تم إرسال طلبك بنجاح! سيتم إشعار المزود فوراً.', 'تم بنجاح', 'success');
            setOrderModalOpen(false);
            setOrderForm({
                serviceName: '',
                description: '',
                appointmentDate: '',
                phone: '',
            });
            setSelectedWorker(null);
        } catch (error) {
            showModal(error.message || 'حدث خطأ أثناء إرسال الطلب', 'خطأ', 'error');
        } finally {
            setOrderSubmitting(false);
        }
    };

    const closeOrderModal = () => {
        setOrderModalOpen(false);
        setSelectedWorker(null);
        setOrderForm({
            serviceName: '',
            description: '',
            appointmentDate: '',
            phone: user?.phone || '',
        });
    };

    const handleViewProfile = (worker) => {
        if (worker.id) {
            navigate(`/provider-profile/${worker.id}`, { state: { provider: worker } });
        } else {
            navigate('/provider-profile', { state: { provider: worker } });
        }
    };

    const filteredWorkers = allWorkersData.filter(worker => {
        const matchesCategory = selectedCategory === 'all' || worker.profession === selectedCategory;
        const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.profession_ar.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const CategoriesCarousel = ({ categories, selectedCategory, onCategorySelect }) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [itemsPerView, setItemsPerView] = useState(4);
        const carouselRef = useRef(null);
        const trackRef = useRef(null);

        useEffect(() => {
            const updateItemsPerView = () => {
                const width = window.innerWidth;
                if (width < 640) {
                    setItemsPerView(2);
                } else if (width < 1024) {
                    setItemsPerView(3);
                } else {
                    setItemsPerView(4);
                }
            };

            updateItemsPerView();
            window.addEventListener('resize', updateItemsPerView);
            return () => window.removeEventListener('resize', updateItemsPerView);
        }, []);

        useEffect(() => {
            setCurrentIndex(0);
        }, [itemsPerView]);

        const needsCarousel = categories.length > itemsPerView;
        const maxIndex = needsCarousel ? Math.max(0, categories.length - itemsPerView) : 0;
        const canScrollPrev = needsCarousel && currentIndex > 0;
        const canScrollNext = needsCarousel && currentIndex < maxIndex;
        const scrollNext = () => { 
            if (canScrollNext) {
                setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
            }
        };

        const scrollPrev = () => { 
            if (canScrollPrev) {
                setCurrentIndex(prev => Math.max(0, prev - 1));
            }
        };

        const translateX = currentIndex * (100 / itemsPerView);
        return (
            <div className="carousel-container">
                {needsCarousel && (
                    <button
                        className={`carousel-nav-btn carousel-nav-right ${!canScrollPrev ? 'disabled' : ''}`}
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        aria-label="السابق (يمين)" 
                    >
                        <ChevronRight size={20} />
                    </button>
                )}

                <div className="carousel-wrapper" ref={carouselRef}>
                    <div
                        className="carousel-track"
                        ref={trackRef}
                        style={{
                            transform: needsCarousel ? `translateX(${translateX}%)` : 'translateX(0)',
                        }}
                    >
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = selectedCategory === category.key;
                            return (
                                <div
                                    key={category.key}
                                    className={`carousel-category-card ${isActive ? 'active' : ''}`}
                                    onClick={() => onCategorySelect(category.key)}
                                >
                                    <div className={`carousel-category-inner bg-gradient-to-br ${category.bgGradient || ''}`}>
                                        <div className="carousel-category-top">
                                            <div
                                                className="carousel-category-icon-bg"
                                                style={{ backgroundColor: category.color }}
                                            >
                                                <Icon size={20} color="white" strokeWidth={2.5} />
                                            </div>
                                        </div>
                                        <div className="carousel-category-content">
                                            <span className="carousel-category-name">{category.name}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {needsCarousel && (
                    <button
                        className={`carousel-nav-btn carousel-nav-left ${!canScrollNext ? 'disabled' : ''}`}
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        aria-label="التالي (يسار)" 
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="app-container">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Tajawal', sans-serif;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%);
          direction: rtl;
          padding: 40px 20px;
        }

        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          animation: pageFadeIn 0.8s ease-out;
        }

        .header-section {
          text-align: center;
          margin-bottom: 48px;
          margin-top: 20px;
        }

        .main-title {
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6 0%, #38BDF8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
        }

        .subtitle {
          font-size: clamp(16px, 2vw, 20px);
          color: #6B7280;
          margin-bottom: 32px;
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 50px;
          padding: 8px 24px;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .search-icon {
          color: #3B82F6;
          font-size: 20px;
          margin-left: 12px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          padding: 12px 0;
          color: #1F2937;
        }

        .search-input::placeholder {
          color: #9CA3AF;
        }

        .categories-section {
          margin: 48px 0;
          text-align: center;
        }

        .carousel-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .carousel-wrapper {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          gap: 12px;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .carousel-category-card {
          flex: 0 0 calc((100% - (12px * 3)) / 4);
          min-width: 0;
          flex-shrink: 0;
          cursor: pointer;
        }

        .carousel-category-inner {
          position: relative;
          border-radius: 16px;
          padding: 16px 14px;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .carousel-category-inner:hover {
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
          border-color: rgba(255, 255, 255, 1);
          transform: translateY(-4px);
        }

        .carousel-category-card.active .carousel-category-inner {
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.25);
          border-color: #3B82F6;
        }

        .carousel-category-top {
          margin-bottom: 12px;
        }

        .carousel-category-icon-bg {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .carousel-category-card:hover .carousel-category-icon-bg {
          box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }

        .carousel-category-content {
          flex: 1;
        }

        .carousel-category-name {
          font-size: 14px;
          font-weight: 700;
          color: #1F2937;
          display: block;
          text-align: center;
        }

        .carousel-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }

        .carousel-nav-btn:hover:not(.disabled) {
          background: #3B82F6;
          border-color: #3B82F6;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }

        .carousel-nav-btn.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .carousel-nav-btn:active:not(.disabled) {
          transform: scale(0.95);
        }

        @media (max-width: 1024px) {
          .carousel-category-card {
            flex: 0 0 calc((100% - (12px * 2)) / 3);
          }
        }

        @media (max-width: 640px) {
          .carousel-category-card {
            flex: 0 0 calc((100% - 12px) / 2);
          }
          
          .carousel-category-inner {
            min-height: 120px;
            padding: 12px 10px;
          }

          .carousel-category-icon-bg {
            width: 40px;
            height: 40px;
          }

          .carousel-category-name {
            font-size: 13px;
          }

          .carousel-nav-btn {
            width: 36px;
            height: 36px;
          }
        }

        .results-section {
          margin-top: 48px;
        }

        .results-header {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 32px;
          text-align: center;
        }

        .workers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .worker-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: workerFadeIn 0.5s ease both;
        }

        .worker-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }

        .card-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #60A5FA, #38BDF8);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .worker-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.5s ease;
        }

        .worker-card:hover .worker-photo {
          transform: scale(1.05);
        }

        .placeholder-icon {
          font-size: 40px;
          opacity: 0.4;
          animation: floatIcon 4s ease-in-out infinite alternate;
        }

        .status-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .status-available {
          background: rgba(34, 197, 94, 0.9);
          color: white;
        }

        .status-busy {
          background: rgba(239, 68, 68, 0.9);
          color: white;
        }

        @keyframes floatIcon {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }

        @keyframes workerFadeIn {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pageFadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .card-body {
          padding: 20px;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .worker-info h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 4px;
        }

        .profession {
          font-size: 14px;
          color: #6B7280;
        }

        .rating-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #FCD34D, #F59E0B);
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 700;
          color: white;
          font-size: 14px;
        }

        .stats-row {
          display: flex;
          gap: 16px;
          margin: 16px 0;
          padding: 12px 0;
          border-top: 1px solid #F3F4F6;
          border-bottom: 1px solid #F3F4F6;
        }

        .stat-item {
          flex: 1;
          text-align: center;
        }

        .stat-value {
          font-size: 16px;
          font-weight: 700;
          color: #3B82F6;
          display: block;
        }

        .stat-label {
          font-size: 12px;
          color: #6B7280;
          margin-top: 4px;
        }

        .distance-info {
          color: #6B7280;
          font-size: 14px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #3B82F6;
          border: 2px solid #3B82F6;
        }

        .btn-secondary:hover {
          background: #EFF6FF;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #6B7280;
        }

        .no-results-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.3;
        }

        .no-results-text {
          font-size: 20px;
          font-weight: 600;
        }

        .order-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.58);
          backdrop-filter: blur(4px);
          z-index: 40;
        }

        .order-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(520px, 92%);
          background: #ffffff;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 30px 70px rgba(15, 23, 42, 0.25);
          z-index: 41;
        }

        .order-modal h3 {
          font-size: 22px;
          margin-bottom: 6px;
        }

        .order-modal p {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .order-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .order-form-group label {
          font-weight: 600;
          font-size: 14px;
          color: #0f172a;
        }

        .order-form-input {
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 10px 12px;
          font-family: 'Tajawal', sans-serif;
          font-size: 14px;
        }

        .order-form-textarea {
          min-height: 90px;
          resize: vertical;
        }

        .order-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .order-submit-btn,
        .order-cancel-btn {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Tajawal', sans-serif;
        }

        .order-submit-btn {
          background: linear-gradient(135deg, #3B82F6, #38BDF8);
          color: white;
        }

        .order-submit-btn:disabled {
          opacity: 0.7;
          cursor: progress;
        }

        .order-cancel-btn {
          background: #f1f5f9;
          color: #475569;
        }

        @media (max-width: 768px) {
          .workers-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>

            <div className="main-container">
                <header className="header-section">
                    <h1 className="main-title">خدماتنا</h1>
                    <p className="subtitle">أهلاً بك في خدمة لتقديم خدمات الحرفيين المحترفين</p>

                    <div className="search-container">
                        <div className="search-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="ابحث بالاسم أو المهنة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                <section className="categories-section">
                    <CategoriesCarousel
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                    />
                </section>

                <section className="results-section">
                    <h2 className="results-header">
                        {filteredWorkers.length > 0
                            ? `وجدنا ${filteredWorkers.length} حرفي متاح`
                            : 'نتائج البحث'}
                    </h2>

                    {filteredWorkers.length > 0 ? (
                        <div className="workers-grid">
                            {filteredWorkers.map(worker => (
                                <div key={worker.id} className="worker-card">
                                    <div className="card-image">
                                        {worker.profilePhoto ? (
                                            <img
                                                src={worker.profilePhoto}
                                                alt={`صورة ${worker.name}`}
                                                className="worker-photo"
                                            />
                                        ) : (
                                            <span className="placeholder-icon">👷</span>
                                        )}
                                        <span className={`status-badge ${worker.status === 'available' ? 'status-available' : 'status-busy'}`}>
                                            {worker.status === 'available' ? '✓ متاح الآن' : '⏱ مشغول'}
                                        </span>
                                    </div>

                                    <div className="card-body">
                                        <div className="card-header-row">
                                            <div className="worker-info">
                                                <h3>{worker.name}</h3>
                                                <p className="profession">{worker.profession_ar}</p>
                                                {worker.photos && worker.photos.length > 0 && (
                                                    <p className="profession" style={{ marginTop: '4px', fontSize: '12px' }}>
                                                        لديه {worker.photos.length} صور لأعماله
                                                    </p>
                                                )}
                                            </div>
                                            <div className="rating-badge">
                                                <span>⭐</span>
                                                <span>{worker.rating}</span>
                                            </div>
                                        </div>

                                        <div className="stats-row">
                                            <div className="stat-item">
                                                <span className="stat-value">{worker.completedJobs}</span>
                                                <span className="stat-label">عملية منجزة</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="stat-value">{worker.yearsExp}</span>
                                                <span className="stat-label">سنوات خبرة</span>
                                            </div>
                                        </div>

                                        <div className="distance-info">
                                            <span>📍</span>
                                            <span>على بعد {worker.distance} كم</span>
                                        </div>

                                        <div className="card-actions">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleOrderNow(worker)}
                                            >
                                                اطلب الآن
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => handleViewProfile(worker)}
                                            >
                                                عرض الملف الشخصي
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <p className="no-results-text">لم نجد نتائج مطابقة لبحثك</p>
                            <p style={{ marginTop: '12px', color: '#9CA3AF' }}>جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
                        </div>
                    )}
                </section>

                {orderModalOpen && selectedWorker && (
                    <>
                        <div className="order-modal-backdrop" onClick={closeOrderModal}></div>
                        <div className="order-modal">
                            <h3>طلب خدمة من {selectedWorker.name}</h3>
                            <p>سيتم إرسال تفاصيلك فوراً إلى المزود ليؤكد الموعد.</p>
                            <form onSubmit={handleOrderSubmit}>
                                <div className="order-form-group">
                                    <label>نوع الخدمة</label>
                                    <input
                                        className="order-form-input"
                                        type="text"
                                        value={orderForm.serviceName}
                                        onChange={(e) => setOrderForm((prev) => ({ ...prev, serviceName: e.target.value }))}
                                    />
                                </div>
                                <div className="order-form-group">
                                    <label>وصف المشكلة</label>
                                    <textarea
                                        className="order-form-input order-form-textarea"
                                        value={orderForm.description}
                                        onChange={(e) => setOrderForm((prev) => ({ ...prev, description: e.target.value }))}
                                        placeholder="اشرح احتياجك ليقدر المزود مدة وتكلفة الخدمة"
                                    />
                                </div>
                                <div className="order-form-group">
                                    <label>ميعاد الزيارة</label>
                                    <input
                                        className="order-form-input"
                                        type="datetime-local"
                                        value={orderForm.appointmentDate}
                                        onChange={(e) => setOrderForm((prev) => ({ ...prev, appointmentDate: e.target.value }))}
                                    />
                                </div>
                                <div className="order-form-group">
                                    <label>رقم التواصل</label>
                                    <input
                                        className="order-form-input"
                                        type="tel"
                                        value={orderForm.phone}
                                        onChange={(e) => setOrderForm((prev) => ({ ...prev, phone: e.target.value }))}
                                        placeholder="رقم هاتفك لتأكيد الموعد"
                                    />
                                </div>
                                <div className="order-modal-actions">
                                    <button type="submit" className="order-submit-btn" disabled={orderSubmitting}>
                                        {orderSubmitting ? 'يتم الإرسال...' : 'تأكيد الطلب'}
                                    </button>
                                    <button type="button" className="order-cancel-btn" onClick={closeOrderModal}>
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}