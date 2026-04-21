import { useState, useMemo } from 'react'
import TrainCard from './TrainCard'
import { trains } from '../data/trains'

const CITIES = [...new Set(trains.flatMap(t => [t.from, t.to]))].sort()

export default function TrainList() {
  const [search, setSearch]   = useState('')
  const [from,   setFrom]     = useState('')
  const [to,     setTo]       = useState('')
  const [date,   setDate]     = useState('')

  const filtered = useMemo(() =>
    trains.filter(t => {
      const q = search.toLowerCase()
      return (
        (!q || t.number.toLowerCase().includes(q) ||
               t.from.toLowerCase().includes(q)   ||
               t.to.toLowerCase().includes(q))     &&
        (!from || t.from === from)                 &&
        (!to   || t.to   === to)                   &&
        (!date || t.date === date)
      )
    }), [search, from, to, date]
  )

  const reset = () => { setSearch(''); setFrom(''); setTo(''); setDate('') }
  const hasFilters = search || from || to || date

  return (
    <div>
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Пошук за номером або маршрутом..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filters">
          <select className="filter-select" value={from} onChange={e => setFrom(e.target.value)}>
            <option value="">Звідки</option>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="filter-select" value={to} onChange={e => setTo(e.target.value)}>
            <option value="">Куди</option>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <input
            type="date"
            className="filter-date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          {hasFilters && (
            <button className="btn-reset" onClick={reset}>Скинути</button>
          )}
        </div>
      </div>

      <p className="results-count">
        {filtered.length > 0
          ? `Знайдено рейсів: ${filtered.length}`
          : 'Рейсів не знайдено'}
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>Спробуйте змінити параметри пошуку</p>
          <button className="btn-reset" onClick={reset}>Скинути фільтри</button>
        </div>
      ) : (
        <div className="train-list">
          {filtered.map(t => <TrainCard key={t.id} train={t} />)}
        </div>
      )}
    </div>
  )
}