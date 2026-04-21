import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#005BAA"/>
            <rect x="6" y="18" width="20" height="4" rx="1" fill="white"/>
            <rect x="6" y="10" width="20" height="6" rx="2" fill="white" opacity="0.9"/>
            <circle cx="10" cy="24" r="2" fill="#FFD700"/>
            <circle cx="22" cy="24" r="2" fill="#FFD700"/>
          </svg>
          <span className={styles.logoText}>УЗ Квитки</span>
        </Link>
        <span className={styles.tagline}>Укрзалізниця</span>
      </div>
    </header>
  )
}