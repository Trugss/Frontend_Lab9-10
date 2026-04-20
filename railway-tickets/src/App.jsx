import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BookingProvider } from './context/BookingContext'
import Home from './pages/Home'
import Booking from './pages/Booking'

function App() {
  return (
    <BookingProvider>
      <header className="header">
        <div className="header-container">
          <a href="/" className="header-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#005BAA"/>
              <rect x="6" y="18" width="20" height="4" rx="1" fill="white"/>
              <rect x="6" y="10" width="20" height="6" rx="2" fill="white" opacity="0.9"/>
              <circle cx="10" cy="24" r="2" fill="#FFD700"/>
              <circle cx="22" cy="24" r="2" fill="#FFD700"/>
            </svg>
            <span className="header-logo-text">УЗ Квитки</span>
          </a>
          <span className="header-tagline">Укрзалізниця</span>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:trainId" element={<Booking />} />
        </Routes>
      </main>

      <ToastContainer position="bottom-right" autoClose={4000} theme="colored" />
    </BookingProvider>
  )
}

export default App