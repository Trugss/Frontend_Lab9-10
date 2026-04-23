import { useBooking } from '../context/BookingContext'

const ICONS = { 'СВ': '🛏️', 'Купе': '🚞', 'Плацкарт': '🚋' }

export default function WagonSelector() {
  const { selectedTrain, selectedWagon, setSelectedWagon, clearSelection } = useBooking()

  if (!selectedTrain) return null

  const handleSelect = (wagon) => {
    clearSelection()
    setSelectedWagon(wagon)
  }

  return (
    <div>
      <h3 className="section-title">Оберіть вагон</h3>
      <div className="wagon-list">
        {selectedTrain.wagons.map(wagon => {
          const free = wagon.totalSeats - wagon.bookedSeats.length
          const isActive = selectedWagon?.id === wagon.id
          return (
            <button
              key={wagon.id}
              className={`wagon-btn${isActive ? ' active' : ''}`}
              onClick={() => handleSelect(wagon)}
            >
              <span>{ICONS[wagon.type] || '🚃'}</span>
              <span className="wagon-btn-num">Вагон {wagon.number}</span>
              <span className="wagon-btn-type">{wagon.type}</span>
              <span
                className="wagon-btn-free"
                style={{ color: free > 5 ? '#2E7D32' : free > 0 ? '#E65100' : '#c62828' }}
              >
                {free > 0 ? `${free} вільних` : 'Немає місць'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}