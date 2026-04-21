import TrainList from '../components/TrainList'

export default function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Пошук залізничних квитків</h1>
        <p>Оберіть рейс, вагон та зручні місця - все онлайн</p>
      </div>
      <div className="page-container">
        <TrainList />
      </div>
    </div>
  )
}