import { useEffect, useRef } from 'react'
import styles from './Admin.module.css'

interface Props {
  value: string
  html?: boolean
  onSave: (val: string) => void
  className?: string
}

export function EditableText({ value, html = false, onSave, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const focusedRef = useRef(false)

  // Sync content from context when not focused (handles Discard)
  useEffect(() => {
    if (!ref.current || focusedRef.current) return
    if (html) {
      ref.current.innerHTML = value
    } else {
      ref.current.textContent = value
    }
  }, [value, html])

  return (
    <div
      ref={ref}
      role="textbox"
      aria-multiline={html}
      className={`${className ?? ''} ${styles.editableField}`}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => { focusedRef.current = true }}
      onBlur={e => {
        focusedRef.current = false
        const el = e.currentTarget
        onSave(html ? el.innerHTML : el.textContent ?? '')
      }}
    />
  )
}
