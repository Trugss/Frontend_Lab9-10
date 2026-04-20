const KEY = 'uz_bookings'

export const BookingService = {
  getAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
    catch { return [] }
  },
  save(bookings) {
    try { localStorage.setItem(KEY, JSON.stringify(bookings)) }
    catch (e) { console.error('localStorage error:', e) }
  },
  add(booking) {
    const all = this.getAll()
    const updated = [...all, booking]
    this.save(updated)
    return updated
  },
  getByWagon(wagonId) {
    return this.getAll().filter(b => b.wagonId === wagonId)
  },
}