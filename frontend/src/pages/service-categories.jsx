import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Check
} from "lucide-react";

// ------------------------------
// Categories Data
// ------------------------------
const mainCategories = [
  { 
    key: "electricity", 
    title: "الكهرباء", 
    icon: Zap, 
    color: "#eab308",
    bgGradient: "from-yellow-50 to-amber-50",
    description: "خدمات كهربائية آمنة من فنيين معتمدين"
  },
  { 
    key: "plumbing", 
    title: "السباكة", 
    icon: Wrench, 
    color: "#06b6d4",
    bgGradient: "from-cyan-50 to-sky-50",
    description: "حلول سباكة سريعة وفعالة"
  },
  { 
    key: "carpentry", 
    title: "النجارة", 
    icon: Hammer, 
    color: "#8b5cf6",
    bgGradient: "from-purple-50 to-violet-50",
    description: "أعمال نجارة دقيقة وتركيب أثاث احترافي"
  },
  { 
    key: "painting", 
    title: "الدهانات", 
    icon: Paintbrush, 
    color: "#f59e0b",
    bgGradient: "from-amber-50 to-orange-50",
    description: "دهانات احترافية بأعلى معايير الجودة"
  },
];

const detailedCategories = [
  {
    title: "الكهرباء",
    color: "#eab308",
    icon: Zap,
    subServices: [
      { name: "صيانة دورية", icon: Clock, features: ["فحص شامل", "تقرير مفصل", "ضمان سنة"] },
      { name: "إصلاح أعطال", icon: Search, features: ["تشخيص دقيق", "إصلاح سريع", "قطع أصلية"] },
      { name: "تركيبات كهربائية", icon: Settings, features: ["تركيب احترافي", "اختبار السلامة", "ضمان العمل"] },
    ],
  },
  {
    title: "السباكة",
    color: "#06b6d4",
    icon: Wrench,
    subServices: [
      { name: "تسليك مجاري", icon: AlertCircle, features: ["معدات حديثة", "تنظيف كامل", "متاح 24/7"] },
      { name: "إصلاح تسريبات", icon: Waves, features: ["كشف دقيق", "إصلاح فوري", "ضمان شامل"] },
      { name: "تركيبات سباكة", icon: Settings, features: ["تركيب محترف", "مواد عالية الجودة", "ضمان طويل"] },
    ],
  },
  {
    title: "النجارة",
    color: "#8b5cf6",
    icon: Hammer,
    subServices: [
      { name: "إصلاح أثاث", icon: Wand2, features: ["ترميم كامل", "مواد أصلية", "كالجديد تماماً"] },
      { name: "تركيب أثاث", icon: Armchair, features: ["تجميع سريع", "تثبيت آمن", "تنظيف بعد التركيب"] },
      { name: "تركيب أبواب", icon: DoorOpen, features: ["قياس دقيق", "تركيب محكم", "ضبط مثالي"] },
    ],
  },
  {
    title: "الدهانات",
    color: "#f59e0b",
    icon: Paintbrush,
    subServices: [
      { name: "دهان داخلي", icon: Palette, features: ["ألوان حديثة", "تشطيب ناعم", "بدون روائح"] },
      { name: "دهان خارجي", icon: Paintbrush, features: ["مقاوم للعوامل", "حماية طويلة", "ألوان ثابتة"] },
      { name: "رش دهانات", icon: Move, features: ["توزيع متساوي", "سطح أملس", "توفير الوقت"] },
    ],
  },
];

// ------------------------------
// Components
// ------------------------------
const CategoryCard = ({ title, icon: Icon, color, bgGradient, description, delay, categoryKey }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const element = document.getElementById(`section-${categoryKey}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="category-card"
    >
      <motion.div
        className={`category-inner bg-gradient-to-br ${bgGradient}`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Top Section with Icon */}
        <div className="category-top">
          <motion.div
            className="category-icon-bg"
            style={{ backgroundColor: color }}
            animate={{
              boxShadow: isHovered 
                ? `0 0 0 8px ${color}15, 0 8px 24px ${color}40`
                : `0 0 0 0px ${color}00, 0 4px 12px ${color}20`
            }}
          >
            <motion.div
              animate={{
                y: isHovered ? -4 : 0,
                rotate: isHovered ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon size={32} color="white" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="category-content">
          <h3 className="category-title">{title}</h3>
          <p className="category-desc">{description}</p>
        </div>

        {/* Bottom Arrow */}
        <motion.div 
          className="category-arrow"
          animate={{
            x: isHovered ? -8 : 0,
          }}
          style={{ color }}
        >
          <ArrowLeft size={20} strokeWidth={3} />
        </motion.div>

        {/* Decorative Corner */}
        <motion.div 
          className="category-corner"
          style={{ backgroundColor: color }}
          animate={{
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 0 : 45,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const SubServiceCard = ({ name, icon: Icon, features, color, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="sub-card"
    >
      <motion.div
        className="sub-card-inner"
        whileHover={{ y: -4 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="sub-header">
          <div className="sub-icon-wrapper">
            <motion.div
              className="sub-icon"
              style={{ backgroundColor: `${color}15`, borderColor: color }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon size={22} color={color} strokeWidth={2.5} />
            </motion.div>
            <div>
              <h4 className="sub-name">{name}</h4>
              <span className="sub-badge" style={{ color }}>
                {features.length} مميزات
              </span>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={18} color={color} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Expandable Features */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="sub-features">
            {features.map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="feature-item"
              >
                <Check size={16} color={color} strokeWidth={3} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceSection = ({ title, subServices, color, icon: Icon, categoryKey }) => {
  return (
    <motion.div
      id={`section-${categoryKey}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="service-section"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="service-header">
        <div className="service-header-content">
          <motion.div
            className="service-icon"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon size={24} color="white" strokeWidth={2.5} />
          </motion.div>
          <div>
            <h3 className="service-title" style={{ color }}>{title}</h3>
            <p className="service-subtitle">اختر الخدمة المناسبة لاحتياجاتك</p>
          </div>
        </div>
        <div className="service-line" style={{ backgroundColor: `${color}30` }} />
      </div>

      <div className="sub-grid">
        {subServices.map((service, idx) => (
          <SubServiceCard
            key={service.name}
            name={service.name}
            icon={service.icon}
            features={service.features}
            color={color}
            delay={idx * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ------------------------------
// Main Component
// ------------------------------
export default function ServiceCategories() {
  return (
    <div className="page-wrapper">
      <style>{styles}</style>

      <div className="content-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="page-header"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="header-badge"
          >
            <Sparkles size={20} color="#3B82F6" />
            <span>خدماتنا المميزة</span>
          </motion.div>
          <h1 className="main-heading">
            اختر من بين <span className="highlight">4 خدمات</span> منزلية متكاملة
          </h1>
          <p className="main-subheading">
            نوفر لك أفضل الحلول المنزلية بجودة عالية وأسعار تنافسية
          </p>
        </motion.header>

        {/* Categories Grid */}
        <section className="categories-wrapper">
          <div className="categories-grid">
            {mainCategories.map((cat, idx) => (
              <CategoryCard
                key={cat.key}
                title={cat.title}
                icon={cat.icon}
                color={cat.color}
                bgGradient={cat.bgGradient}
                description={cat.description}
                categoryKey={cat.key}
                delay={idx * 0.08}
              />
            ))}
          </div>
        </section>

        {/* Detailed Services */}
        <section className="detailed-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="detailed-header"
          >
            <h2 className="detailed-heading">تفاصيل كل خدمة</h2>
            <p className="detailed-subheading">انقر على أي خدمة لمعرفة المزيد من التفاصيل</p>
          </motion.div>

          <div className="services-list">
            {detailedCategories.map((cat) => (
              <ServiceSection
                key={cat.title}
                title={cat.title}
                subServices={cat.subServices}
                color={cat.color}
                icon={cat.icon}
                categoryKey={cat.title === "الكهرباء" ? "electricity" : cat.title === "السباكة" ? "plumbing" : cat.title === "النجارة" ? "carpentry" : "painting"}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ------------------------------
// Styles
// ------------------------------
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%);
  padding: 60px 20px;
  direction: rtl;
  font-family: 'Tajawal', sans-serif;
}

.content-wrapper {
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 10px;
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 60px;
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

/* Categories */
.categories-wrapper {
  margin-bottom: 80px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.category-card {
  cursor: pointer;
}

.category-inner {
  position: relative;
  border-radius: 24px;
  padding: 32px 28px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.category-inner:hover {
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
  border-color: rgba(255, 255, 255, 1);
}

.category-top {
  margin-bottom: 20px;
}

.category-icon-bg {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.category-content {
  flex: 1;
}

.category-title {
  font-size: 26px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 12px;
}

.category-desc {
  font-size: 15px;
  color: #4B5563;
  line-height: 1.6;
}

.category-arrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  margin-top: 16px;
}

.category-corner {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 0 20px 0 0;
  opacity: 0.1;
}

/* Detailed Section */
.detailed-wrapper {
  background: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
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

.services-list {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* Service Section */
.service-section {
  
}

.service-header {
  margin-bottom: 24px;
}

.service-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.service-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.service-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
}

.service-subtitle {
  font-size: 14px;
  color: #6B7280;
}

.service-line {
  height: 3px;
  border-radius: 2px;
}

/* Sub Services */
.sub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.sub-card {
  cursor: pointer;
}

.sub-card-inner {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

.sub-card-inner:hover {
  background: white;
  border-color: #D1D5DB;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.sub-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.sub-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sub-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  flex-shrink: 0;
}

.sub-name {
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 2px;
}

.sub-badge {
  font-size: 13px;
  font-weight: 600;
}

.sub-features {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #4B5563;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 40px 16px;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .sub-grid {
    grid-template-columns: 1fr;
  }
  
  .detailed-wrapper {
    padding: 32px 20px;
  }
  
  .category-inner {
    min-height: 200px;
    padding: 24px;
  }
}
`;