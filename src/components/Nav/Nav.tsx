import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import Icon from '../Icon/Icon'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.logo}>Aniket Kulkarni</a>
        <div className={styles.right}>
          <ul className={styles.links}>
            <li><a href="#about" className={styles.link}>About</a></li>
            <li><a href="#contact" className={styles.link}>Contact</a></li>
          </ul>
          <button
            className={styles.themeToggle}
            onClick={() => setIsDark(d => !d)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={isDark ? 'light_mode' : 'dark_mode'} size={18} />
          </button>
        </div>
      </div>
    </nav>
  )
}
