import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BookingProvider } from './context/BookingContext'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Header from './components/Header'

function App() {
  return (
    <BookingProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:trainId" element={<Booking />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" autoClose={4000} theme="colored" />
      </div>
    </BookingProvider>
  )
}

export default App