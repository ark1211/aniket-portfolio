import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import AdminLogin from '../Admin/AdminLogin'
import styles from './Footer.module.css'

export default function Footer() {
  const { isAdmin } = useAdmin()
  const [showLogin, setShowLogin] = useState(false)

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>© 2025 Aniket Kulkarni</p>
        {!isAdmin && (
          <button
            onClick={() => setShowLogin(true)}
            className={styles.adminLink}
            aria-label="Admin login"
          >
            admin
          </button>
        )}
      </div>
      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
    </footer>
  )
}
