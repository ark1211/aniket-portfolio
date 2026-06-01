import { useEffect, useState } from 'react'
import styles from './Hero.module.css'
import Icon from '../Icon/Icon'

const allTitles = [
  { label: 'UX Strategist',       color: '#C2612A' },
  { label: 'UX Lead',             color: '#3B6FCA' },
  { label: 'Program Lead',        color: '#2E8B6E' },
  { label: 'AI UX Lead',          color: '#8B5CF6' },
  { label: 'Design Mentor',       color: '#D97706' },
  { label: 'Enterprise Designer', color: '#E11D48' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % allTitles.length)
        setVisible(true)
      }, 350)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className={`${styles.hero} section`}>
      <div className="container">
        <div className={styles.inner}>

          <div className={styles.textCol}>
            <h1 className={styles.headline}>Hi, I'm Aniket!</h1>

            <p className={styles.roleLine}>
              <span className={styles.rolePrefix}>I am a </span>
              <span
                className={`${styles.slot} ${visible ? styles.slotVisible : styles.slotHidden}`}
                style={{ color: allTitles[current].color }}
              >
                {allTitles[current].label}
              </span>
            </p>

            <p className={styles.tagline}>
              I make complex things feel simple.
            </p>

            <p className={styles.bio}>
              I've spent <strong>13 years</strong> at the intersection of <strong>engineering and design</strong> — seeing systems and people at the same time. Right now I'm leading <strong>Dell's unified AI strategy</strong> for authenticated experiences — connecting the dots across domains where most people only see their own corner. I sit at the edge of design and program leadership, building the <strong>agentic systems</strong> that will define how <strong>enterprise AI</strong> actually gets used.
            </p>

            <a href="#about" className={styles.scrollArrow}>
              <Icon name="arrow_downward" size={24} />
            </a>
          </div>

          <div className={styles.imageCol}>
            <img
              src={`${import.meta.env.BASE_URL}profile.jpg`}
              alt="Aniket Kulkarni"
              className={styles.profileImage}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
