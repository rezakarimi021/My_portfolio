import { useState, useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

const difficultyColor: Record<string, string> = {
  beginner: '#4A78F5',
  intermediate: '#7F42EF',
  advanced: '#E88040',
}

const previewCourses = [
  {
    title: 'Python for Data Science',
    instructor: 'Dr. Farrukh Tashkentov',
    rating: 4.9,
    students: 2341,
    duration: '14h 32m',
    price: '$89.00',
    difficulty: 'intermediate',
    icon: '⬡',
    gradient: 'linear-gradient(135deg, #0D1B3E 0%, #1a1030 100%)',
  },
  {
    title: 'React & TypeScript Mastery',
    instructor: 'Sarah Chen',
    rating: 4.8,
    students: 3205,
    duration: '22h 15m',
    price: '$119.00',
    difficulty: 'intermediate',
    icon: '◈',
    gradient: 'linear-gradient(135deg, #0a1a2e 0%, #0d1f35 100%)',
  },
  {
    title: 'Kubernetes in Production',
    instructor: 'Yuki Tanaka',
    rating: 4.9,
    students: 891,
    duration: '18h 30m',
    price: '$149.00',
    difficulty: 'advanced',
    icon: '⬡',
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #2a1500 100%)',
  },
]

export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = window.setInterval(() => {
      setActiveIdx(i => (i + 1) % previewCourses.length)
    }, 4000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused])

  const course = previewCourses[activeIdx]

  return (
    <section style={{ padding: '80px 0 96px' }}>
      <div className="container-dp">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '64px',
          alignItems: 'center',
        }} className="md:grid-cols-[55fr_45fr]">

          {/* Left — headline + CTAs */}
          <div>
            <div className="section-label" style={{ marginBottom: '20px' }}>
              programming education
            </div>

            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#EEECEA',
              marginBottom: '0',
            }}>
              Build skills<br />
              <span style={{
                fontVariant: 'all-small-caps',
                letterSpacing: '0.12em',
                fontWeight: 800,
                fontSize: 'clamp(40px, 6vw, 64px)',
                color: '#EEECEA',
              }}>that compound.</span>
            </h1>

            <p style={{
              marginTop: '28px',
              fontSize: '18px',
              lineHeight: 1.7,
              color: '#8A8997',
              maxWidth: '480px',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              Courses taught by people still writing production code —
              not textbook authors or conference speakers.
            </p>

            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '20px',
              color: '#52515A',
              fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#4A78F5', fontSize: '8px' }}>●</span>
                47 courses
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#4A78F5', fontSize: '8px' }}>●</span>
                18 instructors
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#4A78F5', fontSize: '8px' }}>●</span>
                12,000+ students
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
              <a href="#courses" className="btn-primary" style={{ fontSize: '15px' }}>
                Browse Courses →
              </a>
              <a href="#" className="btn-ghost" style={{ fontSize: '15px' }}>
                ▶ Watch sample lesson
              </a>
            </div>
          </div>

          {/* Right — course preview carousel */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ maxWidth: '440px', margin: '0 auto', width: '100%' }}
          >
            <div style={{
              backgroundColor: '#141419',
              border: `1px solid #1E1E26`,
              borderLeft: `3px solid ${difficultyColor[course.difficulty]}`,
              borderRadius: '6px',
              overflow: 'hidden',
              transition: 'border-color 0.5s ease',
            }}>
              {/* Thumbnail */}
              <div style={{
                background: course.gradient,
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  fontSize: '64px',
                  opacity: 0.15,
                  position: 'absolute',
                  fontFamily: 'monospace',
                }}>{'{ }'}</div>
                <div style={{
                  width: '64px', height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(74,120,245,0.15)',
                  border: `1px solid rgba(74,120,245,0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px', color: difficultyColor[course.difficulty],
                  zIndex: 1,
                }}>{course.icon}</div>
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  backgroundColor: `${difficultyColor[course.difficulty]}22`,
                  border: `1px solid ${difficultyColor[course.difficulty]}44`,
                  borderRadius: '3px',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 500,
                  color: difficultyColor[course.difficulty],
                  textTransform: 'capitalize',
                }}>{course.difficulty}</div>
              </div>

              {/* Card body */}
              <div style={{ padding: '20px 22px 22px' }}>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '18px', fontWeight: 600,
                  color: '#EEECEA', marginBottom: '6px',
                  transition: 'all 0.3s',
                }}>{course.title}</h3>
                <p style={{ color: '#8A8997', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', marginBottom: '14px' }}>
                  {course.instructor}
                </p>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  marginBottom: '16px', fontSize: '13px', color: '#8A8997', fontFamily: 'DM Sans, sans-serif',
                }}>
                  <Star size={13} fill="#E88040" color="#E88040" />
                  <span style={{ color: '#EEECEA', fontWeight: 500 }}>{course.rating}</span>
                  <span>({course.students.toLocaleString()} students)</span>
                  <span style={{ color: '#52515A' }}>·</span>
                  <span>{course.duration}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '20px', fontWeight: 500,
                    color: '#EEECEA',
                  }}>{course.price}</span>
                  <a href="#courses" className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}>
                    Enroll Now →
                  </a>
                </div>
              </div>
            </div>

            {/* Carousel indicators */}
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '16px' }}>
              {previewCourses.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    width: i === activeIdx ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: i === activeIdx ? '#4A78F5' : '#1E1E26',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
