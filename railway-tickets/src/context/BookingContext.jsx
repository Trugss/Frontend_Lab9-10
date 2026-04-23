import { createContext, useContext, useState, useEffect } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [selectedTrain,  setSelectedTrain]  = useState(null)
  const [selectedWagon,  setSelectedWagon]  = useState(null)
  const [selectedSeats,  setSelectedSeats]  = useState([])
  const [bookings,       setBookings]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('uz_bookings') || '[]') }
    catch { return [] }
  })

  useEffect(() => {
    try { localStorage.setItem('uz_bookings', JSON.stringify(bookings)) }
    catch {}
  }, [bookings])

  const toggleSeat = (seatNum) =>
    setSelectedSeats(prev =>
      prev.includes(seatNum)
        ? prev.filter(s => s !== seatNum)
        : [...prev, seatNum]
    )

  const clearSelection = () => {
    setSelectedSeats([])
    setSelectedWagon(null)
  }

  const addBooking = (data) => {
    const booking = {
      id: Date.now(),
      trainId:      selectedTrain?.id,
      trainNumber:  selectedTrain?.number,
      route:        `${selectedTrain?.from} → ${selectedTrain?.to}`,
      date:         selectedTrain?.date,
      wagonId:      selectedWagon?.id,
      wagonNumber:  selectedWagon?.number,
      wagonType:    selectedWagon?.type,
      seats:        [...selectedSeats],
      ...data,
      bookedAt: new Date().toISOString(),
    }
    setBookings(prev => [...prev, booking])
    return booking
  }

  return (
    <BookingContext.Provider value={{
      selectedTrain, setSelectedTrain,
      selectedWagon, setSelectedWagon,
      selectedSeats, toggleSeat,
      clearSelection, bookings, addBooking,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be inside BookingProvider')
  return ctx
}