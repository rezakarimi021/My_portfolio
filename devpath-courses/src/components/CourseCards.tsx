import { useState } from 'react'
import { Star, Clock, BookOpen } from 'lucide-react'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

interface Course {
  title: string
  instructor: string
  rating: number
  students: number
  duration: string
  lessons: number
  price: string
  difficulty: Difficulty
  gradient: string
  icon: string
}

const difficultyColor: Record<Difficulty, string> = {
  beginner: '#4A78F5',
  intermediate: '#7F42EF',
  advanced: '#E88040',
}

const courses: Course[] = [
  {
    title: 'Python for Data Science',
    instructor: 'Dr. Farrukh Tashkentov',
    rating: 4.9, students: 2341,
    duration: '14h 32m', lessons: 47,
    price: '$89.00', difficulty: 'intermediate',
    gradient: 'linear-gradient(135deg, #0D1B3E 0%, #1a0f35 100%)',
    icon: '⬡',
  },
  {
    title: 'React & TypeScript Mastery',
    instructor: 'Sarah Chen',
    rating: 4.8, students: 3205,
    duration: '22h 15m', lessons: 68,
    price: '$119.00', difficulty: 'intermediate',
    gradient: 'linear-gradient(135deg, #091826 0%, #0d1f35 100%)',
    icon: '◈',
  },
  {
    title: 'Linux & Bash Fundamentals',
    instructor: 'Marcus Reid',
    rating: 4.7, students: 1892,
    duration: '8h 45m', lessons: 31,
    price: '$59.00', difficulty: 'beginner',
    gradient: 'linear-gradient(135deg, #0e1a0e 0%, #111a11 100%)',
    icon: '▸',
  },
  {
    title: 'Kubernetes in Production',
    instructor: 'Yuki Tanaka',
    rating: 4.9, students: 891,
    duration: '18h 30m', lessons: 52,
    price: '$149.00', difficulty: 'advanced',
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #2a1500 100%)',
    icon: '⬡',
  },
  {
    title: 'Go for Backend Engineers',
    instructor: 'Pita Havili',
    rating: 4.8, students: 1543,
    duration: '16h 20m', lessons: 44,
    price: '$99.00', difficulty: 'intermediate',
    gradient: 'linear-gradient(135deg, #001a1a 0%, #001f1f 100%)',
    icon: '◉',
  },
  {
    title: 'Algorithms & Data Structures',
    instructor: 'Prof. Amine Kaci',
    rating: 5.0, students: 4102,
    duration: '28h 00m', lessons: 89,
    price: '$129.00', difficulty: 'beginner',
    gradient: 'linear-gradient(135deg, #0f0a20 0%, #14102a 100%)',
    icon: '∑',
  },
]

function CourseCard({ course }: { course: Course }) {
  const [hovered, setHovered] = useState(false)
  const color = difficultyColor[course.difficulty]

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#141419',
        borderRadius: '6px',
        borderTop: `1px solid ${hovered ? '#2E2E3C' : '#1E1E26'}`,
        borderRight: `1px solid ${hovered ? '#2E2E3C' : '#1E1E26'}`,
        borderBottom: `1px solid ${hovered ? '#2E2E3C' : '#1E1E26'}`,
        borderLeft: `3px solid ${color}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        cursor: 'default',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        background: course.gradient,
        aspectRatio: '16/9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ fontSize: '56px', opacity: 0.1, position: 'absolute', fontFamily: 'monospace', top: '8px', right: '16px' }}>
          {'{}'}
        </div>
        <div style={{
          width: '52px', height: '52px',
          borderRadius: '50%',
          backgroundColor: `${color}18`,
          border: `1px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', color: color, zIndex: 1,
        }}>{course.icon}</div>

        <div style={{
          position: 'absolute', bottom: '10px', right: '10px',
          backgroundColor: `${color}1A`,
          border: `1px solid ${color}33`,
          borderRadius: '3px',
          padding: '2px 8px',
          fontSize: '10px',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 500,
          color: color,
          textTransform: 'capitalize',
          letterSpacing: '0.05em',
        }}>{course.difficulty}</div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <div>
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '17px', fontWeight: 600,
            color: '#EEECEA', marginBottom: '4px',
            lineHeight: 1.3,
          }}>{course.title}</h3>
          <p style={{ color: '#8A8997', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>
            {course.instructor}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8A8997', fontFamily: 'DM Sans, sans-serif' }}>
          <Star size={12} fill="#E88040" color="#E88040" />
          <span style={{ color: '#EEECEA', fontWeight: 500 }}>{course.rating}</span>
          <span>({course.students.toLocaleString()})</span>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#52515A', fontFamily: 'DM Sans, sans-serif' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={11} /> {course.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <BookOpen size={11} /> {course.lessons} lessons
          </span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: '8px',
          borderTop: '1px solid #1E1E26',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '18px', fontWeight: 500,
            color: '#EEECEA',
          }}>{course.price}</span>
          <a href="#" className="btn-primary" style={{
            padding: '8px 16px',
            fontSize: '13px',
          }}>Enroll →</a>
        </div>
      </div>
    </article>
  )
}

export function CourseCards() {
  return (
    <section id="courses" className="section-pad" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">featured courses</div>
          <h2 className="section-title" style={{ marginBottom: '8px' }}>Learn what's in production</h2>
          <p style={{ color: '#52515A', fontFamily: 'DM Sans, sans-serif', fontSize: '15px' }}>
            <span style={{ color: '#4A78F5', fontSize: '9px' }}>■</span> Beginner &nbsp;
            <span style={{ color: '#7F42EF', fontSize: '9px' }}>■</span> Intermediate &nbsp;
            <span style={{ color: '#E88040', fontSize: '9px' }}>■</span> Advanced — difficulty shown by card border
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '20px',
        }} className="sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#" className="btn-ghost" style={{ fontSize: '15px' }}>
            View all 47 courses →
          </a>
        </div>
      </div>
    </section>
  )
}
