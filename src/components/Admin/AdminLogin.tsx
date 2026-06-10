import { useState, type FormEvent } from 'react'
import { useAdmin } from '../../context/AdminContext'
import styles from './Admin.module.css'

interface Props {
  onClose: () => void
}

export default function AdminLogin({ onClose }: Props) {
  const { login } = useAdmin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      login(username.trim(), password)
      onClose()
    } catch {
      setError('Invalid username or password.')
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.loginOverlay} onClick={handleOverlayClick}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Admin Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className={styles.loginInput}
            autoFocus
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.loginInput}
            autoComplete="current-password"
          />
          {error && <p className={styles.loginError}>{error}</p>}
          <div className={styles.loginActions}>
            <button type="button" onClick={onClose} className={styles.loginCancel}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!username.trim() || !password}
              className={styles.loginSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
