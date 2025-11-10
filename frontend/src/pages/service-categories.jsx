import React from "react";

// --- 0. Custom Reusable SVG Component ---
// This component renders an SVG, allowing you to set color and size easily.
const SvgIcon = ({ svgContent, color = '#4a74ff', size = 24, strokeWidth = "2" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    {svgContent}
  </svg>
);


// --- 1. Icons and Data (Corrected SVG Paths) ---
const icons = {
    // Main Categories SVGs
    gardening: <path d="M12 2a5 5 0 0 1 5 5c0 4-5 9-5 9s-5-5-5-9a5 5 0 0 1 5-5z M12 16v6" />, // Flower/Plant
    cleaning: <path d="M11 5L6 17H2l3-12h6z M22 2l-4 4 4 4z M17 4l-4 4" />, // Broom
    painting: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 12v-6 M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />, // Roller
    carpentry: <path d="M14 6l-3-3-3 3 6 6 3-3z M18 18l-3 3-3-3 6-6 3 3z" />, // Hammer
    plumbing: <path d="M12 2v20 M18 10h-12 M18 14h-12 M20 12h-4 M4 12h-4" />, // Faucet/Raindrop
    electricity: <path d="M12 2L6 12h4l-2 8 8-10h-4l6-10z" />, // Lightning Bolt

    // Sub Categories SVGs (Multi-element icons are wrapped in <>...</>)
    subWrench: <path d="M20.5 21l-3.5-3.5 M2 14l6 6 2-2 6-6-2-2-6 6z M15 5l3-3 4 4-3 3z" />,
    subSearch: <path d="M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M21 21l-4.35-4.35" />,
    subClock: (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </>
    ),
    subWater: <path d="M12 2a5 5 0 0 1 5 5c0 4-5 9-5 9s-5-5-5-9a5 5 0 0 1 5-5z M12 16v6" />,
    subDrain: <path d="M10 14l-8 8 M22 2l-8 8 M14 10a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />,
    subDoor: <path d="M3 3h18v18H3z M12 3v18 M12 15h2" />,
    subFurniture: <path d="M18 10a2 2 0 0 1 2 2v8h-2V12h-4v8h-2V12h-4v8H6v-8a2 2 0 0 1 2-2z" />,
    subFix: <path d="M12 20h9 M16.5 3.5l4 4L7 19 3 20l1-4z" />,
};

const mainCategories = [
  { key: "gardening", title: "البستنة", icon: <SvgIcon svgContent={icons.gardening} size={30} /> },
  { key: "cleaning", title: "التنظيف", icon: <SvgIcon svgContent={icons.cleaning} size={30} /> },
  { key: "painting", title: "الدهانات", icon: <SvgIcon svgContent={icons.painting} size={30} /> },
  { key: "carpentry", title: "النجارة", icon: <SvgIcon svgContent={icons.carpentry} size={30} /> },
  { key: "plumbing", title: "السباكة", icon: <SvgIcon svgContent={icons.plumbing} size={30} /> },
  { key: "electricity", title: "الكهرباء", icon: <SvgIcon svgContent={icons.electricity} size={30} /> },
];

const detailedCategories = [
  {
    title: "الكهرباء",
    subServices: [
      { name: "صيانة دورية", icon: <SvgIcon svgContent={icons.subClock} size={20} color="#5e77db" strokeWidth="2.5" /> },
      { name: "إصلاح أعطال", icon: <SvgIcon svgContent={icons.subSearch} size={20} color="#5e77db" strokeWidth="2.5" /> },
      { name: "تركيبات كهربائية", icon: <SvgIcon svgContent={icons.subWrench} size={20} color="#5e77db" strokeWidth="2.5" /> },
    ],
  },
  {
    title: "السباكة",
    subServices: [
      { name: "تسليك مجاري", icon: <SvgIcon svgContent={icons.subDrain} size={20} color="#5e77db" strokeWidth="2.5" /> },
      { name: "إصلاح تسريبات", icon: <SvgIcon svgContent={icons.subWater} size={20} color="#5e77db" strokeWidth="2.5" /> },
      { name: "تركيبات سباكة", icon: <SvgIcon svgContent={icons.subWrench} size={20} color="#5e77db" strokeWidth="2.5" /> },
    ],
  },
  {
    title: "النجارة",
    subServices: [
      { name: "إصلاح أثاث", icon: <SvgIcon svgContent={icons.subFix} size={20} color="#5e77db" strokeWidth="2.5" /> },
      { name: "تركيب أثاث", icon: <SvgIcon svgContent={icons.subFurniture} size={20} color="#5e77db" strokeWidth="2.5" /> },
      { name: "تركيب أبواب", icon: <SvgIcon svgContent={icons.subDoor} size={20} color="#5e77db" strokeWidth="2.5" /> },
    ],
  },
];

// --- 2. Reusable Components (for cleaner JSX) ---

const CategoryBox = ({ title, icon }) => (
  <div style={categoryBoxStyle}>
    <div style={categoryIconContainerStyle}>
      <span style={categoryIconStyle}>{icon}</span>
    </div>
    <div style={categoryTitleStyle}>{title}</div>
  </div>
);

const SubServiceItem = ({ name, icon }) => (
  <div style={subServiceItemStyle}>
    <div style={subServiceIconContainerStyle}>
      <span style={subServiceIconStyle}>{icon}</span>
    </div>
    <span style={subServiceNameStyle}>{name}</span>
  </div>
);

const DetailedCategorySection = ({ title, subServices, isLast }) => (
  <div style={{ ...detailedCategorySectionStyle, ...(isLast ? { borderBottom: 'none', marginBottom: 30 } : {}) }}>
    <h3 style={detailedCategoryTitleStyle}>{title}</h3>
    <div style={subServicesGridStyle}>
      {subServices.map((service) => (
        <SubServiceItem key={service.name} name={service.name} icon={service.icon} />
      ))}
    </div>
  </div>
);

// --- 3. Main Component ---

export default function ServiceCategories() {
  return (
    <div dir="rtl" style={mainContainerStyle}>
      <div style={contentWrapperStyle}>

        {/* Categories Row */}
        <div style={categoriesRowStyle}>
          {mainCategories.map((cat) => (
            <CategoryBox key={cat.key} title={cat.title} icon={cat.icon} />
          ))}
        </div>

        {/* Detailed Category Sections */}
        <div style={detailedSectionsWrapperStyle}>
          {detailedCategories.map((cat, index) => (
            <DetailedCategorySection
              key={cat.title}
              title={cat.title}
              subServices={cat.subServices}
              isLast={index === detailedCategories.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 4. Styling (CSS-in-JS) ---

const mainContainerStyle = {
  fontFamily: "Tajawal, Tahoma, Arial, sans-serif",
  background: "#f3f5f8",
  padding: "30px 0",
  minHeight: "100vh",
  color: "#222",
  display: "flex",
  justifyContent: "center",
};

const contentWrapperStyle = {
    width: "100%",
    maxWidth: 960,
    padding: "0 15px",
};

// --- Top Categories Row Styling ---

const categoriesRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  margin: "0 0 40px 0",
  flexWrap: "wrap",
};

const categoryBoxStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 15px rgba(100, 110, 140, 0.05)",
  flex: "1 1 120px",
  textAlign: "center",
  padding: "18px 8px 10px",
  cursor: "pointer",
  border: "1px solid #f0f0f0",
  transition: "all 0.2s ease-in-out",
};

const categoryIconContainerStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: 50,
  height: 50,
  borderRadius: 10,
  marginBottom: 8,
  background: "#eef4ff",
  color: "#4a74ff", 
};

const categoryIconStyle = {
  fontSize: 24,
};

const categoryTitleStyle = {
  fontWeight: 600,
  fontSize: "0.95rem",
  color: "#333",
  paddingBottom: 6
};

// --- Detailed Sections Styling ---

const detailedSectionsWrapperStyle = {
  background: "#fff",
  borderRadius: 18,
  padding: "20px 25px 5px",
  boxShadow: "0 8px 25px rgba(67, 89, 128, 0.08)",
  border: "1px solid #e0e4e8",
};

const detailedCategorySectionStyle = {
  marginBottom: 20,
  paddingBottom: 20,
  borderBottom: "1px solid #eee",
};

const detailedCategoryTitleStyle = {
  color: "#11204c",
  fontWeight: 700,
  fontSize: "1.25rem",
  marginBottom: 10,
};

const subServicesGridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  margin: "12px 0",
};

const subServiceItemStyle = {
  flex: "1 1 250px",
  display: "flex",
  alignItems: "center",
  background: "#f8f9fb",
  borderRadius: 8,
  padding: "10px 15px",
  minWidth: 200,
  cursor: "pointer",
  border: "1px solid #eaeaea",
  transition: "all 0.15s ease-in-out",
};

const subServiceIconContainerStyle = {
    display: "inline-flex",
    marginRight: 10,
    fontSize: 20,
    color: "#5e77db",
};

const subServiceIconStyle = {
  fontSize: 18,
};

const subServiceNameStyle = {
  fontWeight: 500,
  color: "#3d467f",
  fontSize: "0.98rem",
};