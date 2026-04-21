import { useState } from 'react'
import { toast } from 'react-toastify'
import { useBooking } from '../context/BookingContext'

export default function BookingForm() {
  const { selectedTrain, selectedWagon, selectedSeats, addBooking, clearSelection } = useBooking()
  const [form,    setForm]    = useState({ name: '', phone: '', email: '' })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Введіть повне ім'я (мін. 2 символи)"
    if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone))
      e.phone = 'Введіть коректний номер телефону'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Введіть коректний email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    if (selectedSeats.length === 0) {
      toast.warning('Оберіть хоча б одне місце')
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    const booking = addBooking({ ...form, wagonId: selectedWagon?.id })

    setLoading(false)
    setForm({ name: '', phone: '', email: '' })
    clearSelection()

    toast.success(
      `Бронювання №${booking.id} підтверджено! Місця: ${booking.seats.join(', ')}`,
      { autoClose: 6000 }
    )
  }

  const isDisabled = selectedSeats.length === 0 || !selectedWagon

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <h3 className="booking-form-title">Дані пасажира</h3>

      {selectedSeats.length > 0 && selectedWagon && (
        <div className="form-summary">
          <div className="form-summary-row">
            <span>Вагон {selectedWagon.number} ({selectedWagon.type})</span>
            <strong>Місця: {selectedSeats.join(', ')}</strong>
          </div>
          <div className="form-summary-row">
            <span>Разом:</span>
            <strong>{(selectedTrain?.price || 0) * selectedSeats.length} ₴</strong>
          </div>
        </div>
      )}

      {[
        { id: 'name',  label: "Ім'я та прізвище *", type: 'text',  placeholder: 'Іван Петренко'      },
        { id: 'phone', label: 'Телефон *',           type: 'tel',   placeholder: '+380 67 123 4567'  },
        { id: 'email', label: 'Email *',              type: 'email', placeholder: 'ivan@example.com'  },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="form-field">
          <label htmlFor={id} className="form-label">{label}</label>
          <input
            id={id} name={id} type={type}
            placeholder={placeholder}
            value={form[id]}
            onChange={handleChange}
            className={`form-input${errors[id] ? ' input-error' : ''}`}
          />
          {errors[id] && <span className="form-error">{errors[id]}</span>}
        </div>
      ))}

      <button type="submit" className="btn-submit" disabled={isDisabled || loading}>
        {loading
          ? '⏳ Обробка...'
          : isDisabled
            ? 'Оберіть місця'
            : `Забронювати ${selectedSeats.length} місце${selectedSeats.length > 1 ? 'ць' : ''}`}
      </button>

      {isDisabled && (
        <p className="form-hint">← Оберіть вагон та місця для продовження</p>
      )}
    </form>
  )
}