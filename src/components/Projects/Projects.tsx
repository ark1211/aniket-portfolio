import styles from './Projects.module.css'

const projects = [
  {
    tag: 'UX Strategy · Enterprise',
    title: 'Dell Membership Experience (DMX)',
    role: 'UX Lead',
    description:
      "Leading identity, access, and role management UX across Dell's enterprise membership platform. Driving the long-term platform vision at the intersection of product strategy and organizational change.",
  },
  {
    tag: 'UX Design · Operations',
    title: 'Supply Chain Modernization',
    role: 'Design Lead',
    description:
      "Led a team of 5–7 designers through end-to-end discovery and redesign of Dell's supply chain experience. Built the roadmap and delivery structure from the ground up.",
  },
  {
    tag: 'UX Design · E-commerce',
    title: 'My Account & Premier',
    role: 'UX Lead',
    description:
      "Defined the UX direction for authenticated account experiences, aligning with Dell's design system and presenting to senior stakeholders across product and engineering.",
  },
  {
    tag: 'Design Systems',
    title: 'Dell Design Language System',
    role: 'Design Lead & Strategist',
    description:
      "Led the transition to Dell's unified design language system. Served as anchor and strategist across multiple product teams, ensuring consistency at scale.",
  },
  {
    tag: 'Frontend · Growth',
    title: 'Dell.com Front-End Development',
    role: 'Frontend Developer',
    description:
      "Built and optimized A/B testing frameworks and retargeting experiences across Dell's global web presence, bridging the gap between engineering and design.",
  },
]

export default function Projects() {
  return (
    <section id="work" className={`${styles.projects} section`}>
      <div className="container">
        <p className={styles.label}>Work</p>
        <h2 className={styles.heading}>Selected projects.</h2>
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.title} className={styles.card}>
              <p className={styles.tag}>{project.tag}</p>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.role}>{project.role}</p>
              <p className={styles.description}>{project.description}</p>
              <span className={styles.comingSoon}>Case study coming soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
