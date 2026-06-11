import { AdminProvider, useAdmin } from './context/AdminContext'
import AdminBar from './components/Admin/AdminBar'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ParticleBackground from './components/ParticleBackground/ParticleBackground'

function AppContent() {
  const { isAdmin } = useAdmin()
  return (
    <>
      {isAdmin && <AdminBar />}
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <ParticleBackground />
      <AppContent />
    </AdminProvider>
  )
}
