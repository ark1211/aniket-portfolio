import { useEffect, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { EditableText } from '../Admin/EditableText'
import RoleEditor from '../Admin/RoleEditor'
import styles from './Hero.module.css'
import adminStyles from '../Admin/Admin.module.css'
import Icon from '../Icon/Icon'

export default function Hero() {
  const { isAdmin, content, updateHero, editKey } = useAdmin()
  const hero = content.hero

  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [roleEditorOpen, setRoleEditorOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % hero.roles.length)
        setVisible(true)
      }, 350)
    }, 2500)
    return () => clearInterval(interval)
  }, [hero.roles.length])

  const activeRole = hero.roles[current % hero.roles.length]

  return (
    <section id="hero" className={`${styles.hero} section`}>
      <div className="container">
        <div className={styles.inner}>

          <div className={styles.textCol}>
            {isAdmin ? (
              <EditableText
                key={`headline-${editKey}`}
                value={hero.headline}
                onSave={val => updateHero({ ...hero, headline: val })}
                className={styles.headline}
              />
            ) : (
              <h1 className={styles.headline}>{hero.headline}</h1>
            )}

            <p className={styles.roleLine}>
              <span className={styles.rolePrefix}>I am a </span>
              <span
                className={`${styles.slot} ${visible ? styles.slotVisible : styles.slotHidden}`}
                style={{ color: activeRole?.color }}
              >
                {activeRole?.label}
              </span>
              {isAdmin && (
                <button
                  onClick={() => setRoleEditorOpen(true)}
                  className={adminStyles.editRolesBtn}
                >
                  Edit roles
                </button>
              )}
            </p>

            {isAdmin ? (
              <EditableText
                key={`tagline-${editKey}`}
                value={hero.tagline}
                onSave={val => updateHero({ ...hero, tagline: val })}
                className={styles.tagline}
              />
            ) : (
              <p className={styles.tagline}>{hero.tagline}</p>
            )}

            {isAdmin ? (
              <EditableText
                key={`bio-${editKey}`}
                html
                value={hero.bio}
                onSave={val => updateHero({ ...hero, bio: val })}
                className={styles.bio}
              />
            ) : (
              <p
                className={styles.bio}
                dangerouslySetInnerHTML={{ __html: hero.bio }}
              />
            )}

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

      {roleEditorOpen && (
        <RoleEditor
          roles={hero.roles}
          onSave={roles => updateHero({ ...hero, roles })}
          onClose={() => setRoleEditorOpen(false)}
        />
      )}
    </section>
  )
}
