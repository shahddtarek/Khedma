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
  Home,
  Monitor,
} from 'lucide-react';

export const mainCategories = [
  {
    key: 'electricity',
    title: 'الكهرباء',
    icon: Zap,
    color: '#eab308',
    bgGradient: 'from-yellow-50 to-amber-50',
    description: 'خدمات كهربائية آمنة من فنيين معتمدين',
  },
  {
    key: 'plumbing',
    title: 'السباكة',
    icon: Wrench,
    color: '#06b6d4',
    bgGradient: 'from-cyan-50 to-sky-50',
    description: 'حلول سباكة سريعة وفعالة',
  },
  {
    key: 'carpentry',
    title: 'النجارة',
    icon: Hammer,
    color: '#8b5cf6',
    bgGradient: 'from-purple-50 to-violet-50',
    description: 'أعمال نجارة دقيقة وتركيب أثاث احترافي',
  },
  {
    key: 'painting',
    title: 'الدهانات',
    icon: Paintbrush,
    color: '#f59e0b',
    bgGradient: 'from-amber-50 to-orange-50',
    description: 'دهانات احترافية بأعلى معايير الجودة',
  },
  {
    key: 'home-appliances',
    title: 'صيانة الأجهزة المنزلية',
    icon: Home,
    color: '#10b981',
    bgGradient: 'from-emerald-50 to-teal-50',
    description: 'صيانة شاملة للأجهزة المنزلية (غسالات، أفران، ثلاجات، مكيفات)',
  },
  {
    key: 'electronics',
    title: 'صيانة الإلكترونيات',
    icon: Monitor,
    color: '#6366f1',
    bgGradient: 'from-indigo-50 to-purple-50',
    description: 'صيانة متخصصة للأجهزة الإلكترونية (تلفزيونات، شاشات)',
  },
];

export const detailedCategories = [
  {
    title: 'الكهرباء',
    color: '#eab308',
    icon: Zap,
    key: 'electrician',
    subServices: [
      { name: 'صيانة دورية', icon: Clock, features: ['فحص شامل', 'تقرير مفصل', 'ضمان سنة'] },
      { name: 'إصلاح أعطال', icon: Search, features: ['تشخيص دقيق', 'إصلاح سريع', 'قطع أصلية'] },
      { name: 'تركيبات كهربائية', icon: Settings, features: ['تركيب احترافي', 'اختبار السلامة', 'ضمان العمل'] },
    ],
  },
  {
    title: 'السباكة',
    color: '#06b6d4',
    icon: Wrench,
    key: 'plumber',
    subServices: [
      { name: 'تسليك مجاري', icon: AlertCircle, features: ['معدات حديثة', 'تنظيف كامل', 'متاح 24/7'] },
      { name: 'إصلاح تسريبات', icon: Waves, features: ['كشف دقيق', 'إصلاح فوري', 'ضمان شامل'] },
      { name: 'تركيبات سباكة', icon: Settings, features: ['تركيب محترف', 'مواد عالية الجودة', 'ضمان طويل'] },
    ],
  },
  {
    title: 'النجارة',
    color: '#8b5cf6',
    icon: Hammer,
    key: 'carpenter',
    subServices: [
      { name: 'إصلاح أثاث', icon: Wand2, features: ['ترميم كامل', 'مواد أصلية', 'كالجديد تماماً'] },
      { name: 'تركيب أثاث', icon: Armchair, features: ['تجميع سريع', 'تثبيت آمن', 'تنظيف بعد التركيب'] },
      { name: 'تركيب أبواب', icon: DoorOpen, features: ['قياس دقيق', 'تركيب محكم', 'ضبط مثالي'] },
    ],
  },
  {
    title: 'الدهانات',
    color: '#f59e0b',
    icon: Paintbrush,
    key: 'painting',
    subServices: [
      { name: 'دهان داخلي', icon: Palette, features: ['ألوان حديثة', 'تشطيب ناعم', 'بدون روائح'] },
      { name: 'دهان خارجي', icon: Paintbrush, features: ['مقاوم للعوامل', 'حماية طويلة', 'ألوان ثابتة'] },
      { name: 'رش دهانات', icon: Move, features: ['توزيع متساوي', 'سطح أملس', 'توفير الوقت'] },
    ],
  },
  {
    title: 'صيانة الأجهزة المنزلية',
    color: '#10b981',
    icon: Home,
    key: 'home-appliances',
    subServices: [
      { name: 'صيانة غسالات', icon: Settings, features: ['فحص شامل', 'إصلاح الأعطال', 'ضمان على القطع'] },
      { name: 'صيانة أفران ومواقد', icon: Settings, features: ['تنظيف احترافي', 'إصلاح الأعطال', 'فحص السلامة'] },
      { name: 'صيانة ثلاجات', icon: Settings, features: ['فحص التبريد', 'إصلاح الأعطال', 'صيانة دورية'] },
      { name: 'صيانة مكيفات', icon: Settings, features: ['تنظيف الفلاتر', 'إصلاح الأعطال', 'شحن الغاز'] },
    ],
  },
  {
    title: 'صيانة الإلكترونيات',
    color: '#6366f1',
    icon: Monitor,
    key: 'electronics',
    subServices: [
      { name: 'صيانة تلفزيونات', icon: Monitor, features: ['تشخيص دقيق', 'إصلاح الأعطال', 'استبدال القطع'] },
      { name: 'صيانة شاشات', icon: Monitor, features: ['إصلاح الشاشات', 'استبدال الأجزاء', 'معايرة الألوان'] },
    ],
  },
];

export const getServicesByProfessionKey = (professionKey) => {
  const match = detailedCategories.find((category) => category.key === professionKey);
  return match ? match.subServices : [];
};

