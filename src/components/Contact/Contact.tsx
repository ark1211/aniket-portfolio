import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.label}>Contact</p>
          <h2 className={styles.heading}>Let's talk.</h2>
          <p className={styles.subtext}>
            I'm always open to a good conversation — whether that's a collaboration,
            a question, or just a hello.
          </p>
          <div className={styles.links}>
            <a
              href="mailto:ark1211@gmail.com"
              className={`${styles.link} ${styles.linkPrimary}`}
            >
              ark1211@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/kulkarnianiket/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkSecondary}`}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
