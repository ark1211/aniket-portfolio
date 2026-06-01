import styles from './About.module.css'

const strengths = [
  {
    title: 'Enterprise Product Thinking',
    desc: 'Seeing across platforms, roles, and journeys to make decisions that hold up at scale.',
  },
  {
    title: 'UX Strategy & Design Leadership',
    desc: 'Turning vision into action and complexity into clarity.',
  },
  {
    title: 'Cross-Team Collaboration',
    desc: 'Building real bridges between product, engineering, and business.',
  },
  {
    title: 'Mentorship',
    desc: 'Helping teammates grow confident, focused, and empowered.',
  },
  {
    title: 'Clarity in Ambiguity',
    desc: 'Making the fuzzy stuff make sense and creating alignment across stakeholders.',
  },
]

export default function About() {
  return (
    <section id="about" className={`${styles.about} section`}>
      <div className="container">
        <p className={styles.label}>About</p>
        <h2 className={styles.heading}>Both sides of the table.</h2>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p>
              I'm a UX lead and strategist with over 13 years in tech. I started out as a
              software engineer, picked up a Master's and Bachelor's in Computer Science,
              and somewhere along the way fell in love with design. That combination —
              <strong> systems thinking meets human-centered problem solving</strong> — is
              still what I bring to every project.
            </p>
            <p>
              Right now I lead UX for Dell's Membership Experience (DMX), shaping how users
              understand their identity, access, and roles inside a complex enterprise
              ecosystem. I'm also driving the long-term vision for the platform — work that
              lives at the edge of product strategy, design, and organizational change.
            </p>
            <p>
              What gets me out of bed is making the complex feel simple. I connect dots
              across teams, find signal in the noise, and turn ambiguous requirements into
              experiences people actually want to use. I bring warmth and curiosity to every
              conversation, and I believe the best design happens in rooms where people feel
              safe and aligned.
            </p>
            <p>
              As AI reshapes products everywhere, I'm focused on one question: how do you
              design experiences that are AI-powered but still feel human — responsible,
              intuitive, genuinely helpful?
            </p>
          </div>

          <div className={styles.sidebar}>
            <p className={styles.strengthsLabel}>Where I'm strongest</p>
            <ul className={styles.strengths}>
              {strengths.map((s) => (
                <li key={s.title} className={styles.strength}>
                  <p className={styles.strengthTitle}>{s.title}</p>
                  <p className={styles.strengthDesc}>{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
