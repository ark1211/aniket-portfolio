import { useAdmin } from '../../context/AdminContext'
import styles from './Admin.module.css'

export default function AdminBar() {
  const { isDirty, saveStatus, save, discard, logout } = useAdmin()

  async function handleSave() {
    try {
      await save()
    } catch {
      // saveStatus drives the error UI
    }
  }

  const saveLabel =
    saveStatus === 'saving' ? 'Saving…' :
    saveStatus === 'success' ? '✓ Saved' :
    saveStatus === 'error' ? '✗ Error' :
    'Save to GitHub'

  return (
    <div className={styles.adminBar}>
      <span className={styles.adminLabel}>Admin Mode</span>
      <div className={styles.adminActions}>
        {isDirty && (
          <>
            <span className={styles.unsavedBadge}>Unsaved changes</span>
            <button onClick={discard} className={styles.discardBtn}>
              Discard
            </button>
          </>
        )}
        <button
          onClick={handleSave}
          disabled={!isDirty || saveStatus === 'saving'}
          className={styles.saveBtn}
        >
          {saveLabel}
        </button>
        <button onClick={logout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  )
}
