import { useNavigate } from 'react-router-dom'

const TYPE_COLORS = {
  'Швидкісний':   '#005BAA',
  'Фірмовий':     '#7B2D8B',
  'Нічний':       '#1a1a2e',
  'Пасажирський': '#2E7D32',
  'Регіональний': '#E65100',
}

export default function TrainCard({ train }) {
  const navigate = useNavigate()

  const freeSeats = train.wagons.reduce(
    (acc, w) => acc + w.totalSeats - w.bookedSeats.length, 0
  )

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })

  return (
    <article className="card">
      <div className="card-top">
        <div className="train-meta">
          <span className="train-number">№ {train.number}</span>
          <span
            className="train-badge"
            style={{ background: TYPE_COLORS[train.type] || '#555' }}
          >
            {train.type}
          </span>
        </div>
        <span className="train-date">{formatDate(train.date)}</span>
      </div>

      <div className="route">
        <div className="city">
          <span className="city-name">{train.from}</span>
          <span className="city-time">{train.departureTime}</span>
        </div>
        <div className="route-middle">
          <div className="route-dot" />
          <div className="route-line" />
          <span className="route-duration">{train.duration}</span>
          <div className="route-line" />
          <div className="route-dot" />
        </div>
        <div className="city">
          <span className="city-name">{train.to}</span>
          <span className="city-time">{train.arrivalTime}</span>
        </div>
      </div>

      <div className="card-bottom">
        <span className="card-seats">{freeSeats} вільних місць</span>
        <div className="price-row">
          <span className="price">від {train.price} ₴</span>
          <button
            className="btn-book"
            onClick={() => navigate(`/booking/${train.id}`)}
          >
            Обрати місця 
          </button>
        </div>
      </div>
    </article>
  )
}