export const trains = [
  {
    id: 1, number: "745К", from: "Київ", to: "Львів",
    departureTime: "07:30", arrivalTime: "13:45",
    date: "2026-04-25", duration: "6г 15хв", price: 420, type: "Швидкісний",
    wagons: [
      { id: 1, number: 1, type: "Купе", totalSeats: 36, bookedSeats: [2,5,8,12,17,22,25,30] },
      { id: 2, number: 2, type: "Плацкарт", totalSeats: 54, bookedSeats: [1,3,7,10,15,20,23,28] },
      { id: 3, number: 3, type: "СВ", totalSeats: 18, bookedSeats: [2,6,10,14] },
    ],
  },
  {
    id: 2, number: "099Л", from: "Харків", to: "Одеса",
    departureTime: "09:15", arrivalTime: "19:40",
    date: "2026-04-25", duration: "10г 25хв", price: 580, type: "Фірмовий",
    wagons: [
      { id: 4, number: 1, type: "Купе", totalSeats: 36, bookedSeats: [1,4,9,13,18,24,29,35] },
      { id: 5, number: 2, type: "СВ", totalSeats: 18, bookedSeats: [3,7,11,15] },
    ],
  },
  {
    id: 3, number: "152Д", from: "Дніпро", to: "Київ",
    departureTime: "14:00", arrivalTime: "19:30",
    date: "2026-04-25", duration: "5г 30хв", price: 350, type: "Пасажирський",
    wagons: [
      { id: 6, number: 1, type: "Плацкарт", totalSeats: 54, bookedSeats: [5,10,15,20,25,30,35] },
      { id: 7, number: 2, type: "Купе", totalSeats: 36, bookedSeats: [3,8,13,18,23,28] },
    ],
  },
  {
    id: 4, number: "301К", from: "Львів", to: "Одеса",
    departureTime: "22:10", arrivalTime: "09:55",
    date: "2026-04-25", duration: "11г 45хв", price: 650, type: "Нічний",
    wagons: [
      { id: 8, number: 1, type: "СВ", totalSeats: 18, bookedSeats: [1,5,9,13,17] },
      { id: 9, number: 2, type: "Купе", totalSeats: 36, bookedSeats: [4,8,12,16,20,24,28] },
    ],
  },
  {
    id: 5, number: "732Л", from: "Запоріжжя", to: "Харків",
    departureTime: "11:40", arrivalTime: "16:20",
    date: "2026-04-25", duration: "4г 40хв", price: 290, type: "Регіональний",
    wagons: [
      { id: 10, number: 1, type: "Плацкарт", totalSeats: 54, bookedSeats: [7,14,21,28,35,42] },
      { id: 11, number: 2, type: "Купе", totalSeats: 36, bookedSeats: [6,12,18,24,30] },
    ],
  },
  {
    id: 6, number: "410Ш", from: "Київ", to: "Харків",
    departureTime: "06:00", arrivalTime: "11:50",
    date: "2026-04-26", duration: "5г 50хв", price: 480, type: "Швидкісний",
    wagons: [
      { id: 12, number: 1, type: "Купе", totalSeats: 36, bookedSeats: [3,9,15,21,27,33] },
      { id: 13, number: 2, type: "СВ", totalSeats: 18, bookedSeats: [2,8,14] },
    ],
  },
]