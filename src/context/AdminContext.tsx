import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { SiteContent, HeroContent } from '../types/content'

const GITHUB_OWNER = 'ark1211'
const GITHUB_REPO = 'aniket-portfolio'
const CONTENT_PATH = 'public/content.json'
const ADMIN_BAR_HEIGHT = '44px'

const defaultContent: SiteContent = {
  hero: {
    headline: "Hi, I'm Aniket!",
    tagline: "I make complex things feel simple.",
    bio: "I've spent <strong>13 years</strong> at the intersection of <strong>engineering and design</strong> — seeing systems and people at the same time. Right now I'm leading <strong>Dell's unified AI strategy</strong> for authenticated experiences — connecting the dots across domains where most people only see their own corner. I sit at the edge of design and program leadership, building the <strong>agentic systems</strong> that will define how <strong>enterprise AI</strong> actually gets used.",
    roles: [
      { label: 'UX Strategist',       color: '#C2612A' },
      { label: 'UX Lead',             color: '#3B6FCA' },
      { label: 'Program Lead',        color: '#2E8B6E' },
      { label: 'AI UX Lead',          color: '#8B5CF6' },
      { label: 'Design Mentor',       color: '#D97706' },
      { label: 'Enterprise Designer', color: '#E11D48' },
    ]
  }
}

interface AdminContextValue {
  isAdmin: boolean
  content: SiteContent
  isDirty: boolean
  saveStatus: 'idle' | 'saving' | 'success' | 'error'
  saveError: string
  editKey: number
  login: (username: string, password: string) => void
  logout: () => void
  updateHero: (hero: HeroContent) => void
  save: () => Promise<void>
  discard: () => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [savedContent, setSavedContent] = useState<SiteContent>(defaultContent)
  const [isDirty, setIsDirty] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [saveError, setSaveError] = useState('')
  const [editKey, setEditKey] = useState(0)

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL
    fetch(`${baseUrl}content.json`, { cache: 'no-store' })
      .then(r => r.json())
      .then((data: SiteContent) => {
        setContent(data)
        setSavedContent(data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') setIsAdmin(true)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--admin-bar-height',
      isAdmin ? ADMIN_BAR_HEIGHT : '0px'
    )
  }, [isAdmin])

  function login(username: string, password: string) {
    const validUser = import.meta.env.VITE_ADMIN_USER
    const validPass = import.meta.env.VITE_ADMIN_PASS
    if (username !== validUser || password !== validPass) {
      throw new Error('Invalid username or password')
    }
    sessionStorage.setItem('admin_auth', '1')
    setIsAdmin(true)
  }

  function logout() {
    sessionStorage.removeItem('admin_auth')
    setIsAdmin(false)
    setContent(savedContent)
    setIsDirty(false)
  }

  function updateHero(hero: HeroContent) {
    setContent(prev => ({ ...prev, hero }))
    setIsDirty(true)
  }

  function discard() {
    setContent(savedContent)
    setIsDirty(false)
    setEditKey(k => k + 1)
  }

  async function save() {
    const pat = import.meta.env.VITE_GITHUB_PAT
    if (!pat) {
      setSaveError('VITE_GITHUB_PAT is not set in GitHub Secrets.')
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 6000)
      return
    }
    setSaveStatus('saving')
    setSaveError('')
    try {
      const fileRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
        { headers: { Authorization: `Bearer ${pat}` } }
      )
      if (!fileRes.ok) {
        const body = await fileRes.json().catch(() => ({}))
        throw new Error(`GitHub ${fileRes.status}: ${body.message ?? 'fetch metadata failed'}`)
      }
      const fileData = await fileRes.json()

      const newContent = JSON.stringify(content, null, 2)
      const bytes = new TextEncoder().encode(newContent)
      const binary = Array.from(bytes, b => String.fromCharCode(b)).join('')
      const encoded = btoa(binary)

      const updateRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${pat}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Update portfolio content via admin panel',
            content: encoded,
            sha: fileData.sha,
          })
        }
      )
      if (!updateRes.ok) {
        const body = await updateRes.json().catch(() => ({}))
        throw new Error(`GitHub ${updateRes.status}: ${body.message ?? 'update failed'}`)
      }

      setSavedContent(content)
      setIsDirty(false)
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setSaveError(msg)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 8000)
    }
  }

  return (
    <AdminContext.Provider value={{
      isAdmin, content, isDirty, saveStatus, saveError, editKey,
      login, logout, updateHero, save, discard
    }}>
      {children}
    </AdminContext.Provider>
  )
}
