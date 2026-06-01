import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  )
}
