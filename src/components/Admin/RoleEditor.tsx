import { useState } from 'react'
import type { Role } from '../../types/content'
import styles from './Admin.module.css'

interface Props {
  roles: Role[]
  onSave: (roles: Role[]) => void
  onClose: () => void
}

export default function RoleEditor({ roles, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Role[]>(roles)

  function update(index: number, field: keyof Role, value: string) {
    setDraft(prev => prev.map((r, i) => i === index ? { ...r, [field]: value } : r))
  }

  function add() {
    setDraft(prev => [...prev, { label: 'New Role', color: '#6366f1' }])
  }

  function remove(index: number) {
    setDraft(prev => prev.filter((_, i) => i !== index))
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.loginOverlay} onClick={handleOverlayClick}>
      <div className={`${styles.loginCard} ${styles.roleEditorCard}`}>
        <h2 className={styles.loginTitle}>Edit Roles</h2>
        <div className={styles.roleList}>
          {draft.map((role, i) => (
            <div key={i} className={styles.roleRow}>
              <input
                type="color"
                value={role.color}
                onChange={e => update(i, 'color', e.target.value)}
                className={styles.colorInput}
                title="Role color"
              />
              <input
                type="text"
                value={role.label}
                onChange={e => update(i, 'label', e.target.value)}
                className={styles.roleInput}
                placeholder="Role title"
              />
              <button
                onClick={() => remove(i)}
                className={styles.removeRoleBtn}
                disabled={draft.length <= 1}
                aria-label="Remove role"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button onClick={add} className={styles.addRoleBtn}>
          + Add Role
        </button>
        <div className={styles.loginActions}>
          <button onClick={onClose} className={styles.loginCancel}>
            Cancel
          </button>
          <button
            onClick={() => { onSave(draft); onClose() }}
            className={styles.loginSubmit}
          >
            Save Roles
          </button>
        </div>
      </div>
    </div>
  )
}
