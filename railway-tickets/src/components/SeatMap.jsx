import { useBooking } from '../context/BookingContext'

function Seat({ n, isBooked, isSelected, onToggle }) {
  let cls = 'seat'
  if (isBooked)   cls += ' booked'
  else if (isSelected) cls += ' selected'
  else cls += ' free'

  return (
    <button
      className={cls}
      disabled={isBooked}
      onClick={() => onToggle(n)}
      title={`Місце ${n}`}
      aria-label={`Місце ${n}`}
    >
      {n}
    </button>
  )
}

export default function SeatMap() {
  const { selectedWagon, selectedSeats, toggleSeat, bookings } = useBooking()

  if (!selectedWagon) {
    return (
      <div className="seatmap-placeholder">
        <p>Оберіть вагон для перегляду схеми місць</p>
      </div>
    )
  }

  const localBooked = bookings
    .filter(b => b.wagonId === selectedWagon.id)
    .flatMap(b => b.seats)

  const allBooked = [...new Set([...selectedWagon.bookedSeats, ...localBooked])]
  const totalSeats = selectedWagon.totalSeats
  const rows = Math.ceil(totalSeats / 4)

  return (
    <div>
      <div className="seatmap-header">
        <h3 className="section-title">
          Схема — Вагон {selectedWagon.number} ({selectedWagon.type})
        </h3>
        {selectedSeats.length > 0 && (
          <span className="seatmap-chosen">Обрано: {selectedSeats.join(', ')}</span>
        )}
      </div>

      <div className="seatmap-legend">
        <div className="legend-item"><div className="legend-dot free" />     <span>Вільне</span></div>
        <div className="legend-item"><div className="legend-dot selected" /> <span>Обране</span></div>
        <div className="legend-item"><div className="legend-dot booked" />   <span>Зайняте</span></div>
      </div>

      <div className="wagon-body">
        <div className="wagon-label">▲ Голова</div>
        {Array.from({ length: rows }, (_, i) => {
          const seats = [i*4+1, i*4+2, i*4+3, i*4+4].filter(s => s <= totalSeats)
          return (
            <div key={i} className="seat-row">
              <span className="seat-row-num">{i + 1}</span>
              <div className="seat-group">
                {seats.slice(0, 2).map(s => (
                  <Seat key={s} n={s}
                    isBooked={allBooked.includes(s)}
                    isSelected={selectedSeats.includes(s)}
                    onToggle={toggleSeat}
                  />
                ))}
              </div>
              <div className="seat-aisle" />
              <div className="seat-group">
                {seats.slice(2).map(s => (
                  <Seat key={s} n={s}
                    isBooked={allBooked.includes(s)}
                    isSelected={selectedSeats.includes(s)}
                    onToggle={toggleSeat}
                  />
                ))}
              </div>
            </div>
          )
        })}
        <div className="wagon-label">▼ Хвіст</div>
      </div>
    </div>
  )
}