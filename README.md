# Khedma (خدمة) 🛠️  
> **Your All-in-One Service Marketplace**  
> Connect with skilled professionals or find work—seamlessly.

<img width="2752" height="1536" alt="Image" src="https://github.com/user-attachments/assets/a3cad30e-ba4b-4489-8543-3ec4a6981ada" />

---

## 📖 Overview

**Khedma** is a modern, responsive web application designed to bridge the gap between service providers and clients. Whether you need a plumber, electrician, or cleaner, Khedma makes it easy to find, book, and pay for services. For professionals, it offers a robust platform to manage bookings, track earnings, and grow their business.

Built with **React 19** and **Vite**, Khedma prioritizes performance, user experience, and meaningful aesthetics.

---

## ✨ Key Features

### For Clients 👤
- **Easy Service Discovery**: Browse services by category or use the advanced search to find exactly what you need.
- **Provider Profiles**: View detailed profiles of service providers, including ratings and expertise.
- **Seamless Booking**: Simple and secure booking process.
- **Dashboard**: Track current requests, view history, and manage personal settings.

### For Providers 👷
- **Dedicated Dashboard**: A powerful "Worker Dashboard" to monitor earnings (daily/monthly), view active jobs, and manage schedule.
- **Profile Management**: Customize your professional profile to attract more clients.
- **Registration Flow**: Streamlined onboarding process for new providers.

### General 🌐
- **Secure Authentication**: Robust Login and Registration systems.
- **Payment Integration**: Secure methods to handle transactions.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile.
- **Smooth Animations**: Enhanced UI with `framer-motion` for a premium feel.

---

## 📸 Screenshots

| **Landing Page** | **Service Search** |
|:---:|:---:|
| <img width="1904" height="1079" alt="Image" src="https://github.com/user-attachments/assets/5700e19e-6757-4c7a-b6d5-c2fa60ddaa71" /> | <img width="1904" height="1079" alt="Image" src="https://github.com/user-attachments/assets/c21aa2ed-0be2-4875-8fc8-8ecd755ac0dc" /> |
| *Intuitive Landing Page* | *Advanced Filtering & Search* |

| **service categories** | **About Us** |
|:---:|:---:|
| <img width="1904" height="1079" alt="Image" src="https://github.com/user-attachments/assets/57978815-498a-4557-a519-b781f933e44e" /> | <img width="1905" height="1079" alt="Image" src="https://github.com/user-attachments/assets/95ba41f2-62f9-4568-ac16-00eab1dbaea0" /> |
| *view our survises* | *Know who we are* |


---

## 🚀 Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **Styling**: CSS Module / Modern CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

### Backend (Mock)
- **API Simulation**: [JSON Server](https://github.com/typicode/json-server) (used for development and prototyping)

---

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Khedma.git
cd Khedma/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Mock Backend
Khedma uses `json-server` to simulate a backend database. Open a terminal and run:
```bash
npm run mock-api
```
*This runs on port 5000 by default.*

### 4. Run the Development Server
In a **separate** terminal window, start the React application:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 📂 Project Structure

```bash
Khedma/
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components (NavBar, cards, etc.)
│   │   ├── pages/          # Full page components (Home, Dashboard, Login)
│   │   ├── context/        # React Context for state management
│   │   ├── assets/         # Images and icons
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── db.json             # Mock database for json-server
│   └── package.json        # Project dependencies and scripts
└── ...
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Khedma, please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by :
- Mohab Naser
- Abdo Tarek
- Seif Samir
- Shahd Tarek
- Ahmed Emam
