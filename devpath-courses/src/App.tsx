import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { StatsBar } from './components/StatsBar'
import { CourseCards } from './components/CourseCards'
import { LearningPaths } from './components/LearningPaths'
import { Instructors } from './components/Instructors'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { CTABanner } from './components/CTABanner'
import { Footer } from './components/Footer'

function App() {
  return (
    <div style={{ backgroundColor: '#0C0C0F', minHeight: '100vh', color: '#EEECEA' }}>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <CourseCards />
        <LearningPaths />
        <Instructors />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}

export default App
