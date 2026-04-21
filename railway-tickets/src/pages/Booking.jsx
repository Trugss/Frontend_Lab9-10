import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { trains } from '../data/trains'
import WagonSelector from '../components/WagonSelector'
import SeatMap from '../components/SeatMap'
import BookingForm from '../components/BookingForm'

export default function Booking() {
  const { trainId }  = useParams()
  const navigate     = useNavigate()
  const { selectedTrain, setSelectedTrain, clearSelection } = useBooking()

  useEffect(() => {
    const found = trains.find(t => t.id === Number(trainId))
    if (!found) { navigate('/'); return }
    if (!selectedTrain || selectedTrain.id !== found.id) {
      setSelectedTrain(found)
      clearSelection()
    }
  }, [trainId])

  const train = selectedTrain || trains.find(t => t.id === Number(trainId))
  if (!train) return null

  const fmt = d => new Date(d).toLocaleDateString('uk-UA',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <div className="booking-page">
      <Link to="/" className="back-link">← Повернутися до розкладу</Link>

      <div className="train-info-box">
        <h2 className="train-info-title">
          Потяг № {train.number} · {train.from} → {train.to}
        </h2>
        <div className="train-info-details">
          <span>📅 {fmt(train.date)}</span>
          <span>🕐 {train.departureTime} — {train.arrivalTime}</span>
          <span>⏱ {train.duration}</span>
        </div>
      </div>

      <div className="booking-layout">
        <div className="booking-left">
          <div className="section-box">
            <WagonSelector />
          </div>
          <div className="section-box">
            <SeatMap />
          </div>
        </div>
        <div className="booking-right">
          <BookingForm />
        </div>
      </div>
    </div>
  )
}