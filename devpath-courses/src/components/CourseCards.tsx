import { useState } from 'react'
import { Star, Clock, BookOpen } from 'lucide-react'

type Difficulty = 'مبتدی' | 'متوسط' | 'پیشرفته'

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
  مبتدی: '#4A78F5',
  متوسط: '#7F42EF',
  پیشرفته: '#E88040',
}

const courses: Course[] = [
  {
    title: 'پایتون برای علم داده',
    instructor: 'دکتر فرخ تاشکنتوف',
    rating: 4.9, students: 2341,
    duration: '۱۴ ساعت ۳۲ دقیقه', lessons: 47,
    price: '$89.00', difficulty: 'متوسط',
    gradient: 'linear-gradient(135deg, #0D1B3E 0%, #1a0f35 100%)',
    icon: '⬡',
  },
  {
    title: 'تسلط بر ری‌اکت و تایپ‌اسکریپت',
    instructor: 'سارا چن',
    rating: 4.8, students: 3205,
    duration: '۲۲ ساعت ۱۵ دقیقه', lessons: 68,
    price: '$119.00', difficulty: 'متوسط',
    gradient: 'linear-gradient(135deg, #091826 0%, #0d1f35 100%)',
    icon: '◈',
  },
  {
    title: 'لینوکس و بش برای مبتدیان',
    instructor: 'مارکوس رید',
    rating: 4.7, students: 1892,
    duration: '۸ ساعت ۴۵ دقیقه', lessons: 31,
    price: '$59.00', difficulty: 'مبتدی',
    gradient: 'linear-gradient(135deg, #0e1a0e 0%, #111a11 100%)',
    icon: '▸',
  },
  {
    title: 'کوبرنتیز در محیط تولید',
    instructor: 'یوکی تاناکا',
    rating: 4.9, students: 891,
    duration: '۱۸ ساعت ۳۰ دقیقه', lessons: 52,
    price: '$149.00', difficulty: 'پیشرفته',
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #2a1500 100%)',
    icon: '⬡',
  },
  {
    title: 'گو برای مهندسان بک‌اند',
    instructor: 'پیتا هاویلی',
    rating: 4.8, students: 1543,
    duration: '۱۶ ساعت ۲۰ دقیقه', lessons: 44,
    price: '$99.00', difficulty: 'متوسط',
    gradient: 'linear-gradient(135deg, #001a1a 0%, #001f1f 100%)',
    icon: '◉',
  },
  {
    title: 'الگوریتم‌ها و ساختار داده',
    instructor: 'پروفسور امین کاسی',
    rating: 5.0, students: 4102,
    duration: '۲۸ ساعت', lessons: 89,
    price: '$129.00', difficulty: 'مبتدی',
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
        borderLeft: `1px solid ${hovered ? '#2E2E3C' : '#1E1E26'}`,
        borderBottom: `1px solid ${hovered ? '#2E2E3C' : '#1E1E26'}`,
        borderRight: `3px solid ${color}`,
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
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: '56px', opacity: 0.1, position: 'absolute', fontFamily: 'monospace', top: '8px', left: '16px' }}>
          {'{}'}
        </div>
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          backgroundColor: `${color}18`, border: `1px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', color: color, zIndex: 1,
        }}>{course.icon}</div>
        <div style={{
          position: 'absolute', bottom: '10px', left: '10px',
          backgroundColor: `${color}1A`, border: `1px solid ${color}33`,
          borderRadius: '3px', padding: '2px 8px',
          fontSize: '10px', fontFamily: 'Vazirmatn, sans-serif',
          fontWeight: 600, color: color, letterSpacing: '0.02em',
        }}>{course.difficulty}</div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <div>
          <h3 style={{
            fontFamily: 'Vazirmatn, sans-serif',
            fontSize: '16px', fontWeight: 700,
            color: '#EEECEA', marginBottom: '4px', lineHeight: 1.4,
          }}>{course.title}</h3>
          <p style={{ color: '#8A8997', fontSize: '13px', fontFamily: 'Vazirmatn, sans-serif' }}>
            {course.instructor}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8A8997', fontFamily: 'Vazirmatn, sans-serif' }}>
          <Star size={12} fill="#E88040" color="#E88040" />
          <span style={{ color: '#EEECEA', fontWeight: 600 }}>{course.rating}</span>
          <span>({course.students.toLocaleString()} دانش‌آموز)</span>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#52515A', fontFamily: 'Vazirmatn, sans-serif' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={11} /> {course.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <BookOpen size={11} /> {course.lessons} جلسه
          </span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #1E1E26',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '18px', fontWeight: 500, color: '#EEECEA',
          }}>{course.price}</span>
          <a href="#" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>← ثبت‌نام</a>
        </div>
      </div>
    </article>
  )
}

export function CourseCards() {
  return (
    <section id="courses" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">دوره‌های ویژه</div>
          <h2 className="section-title" style={{ marginBottom: '8px' }}>آنچه در دنیای واقعی استفاده می‌شود را بیاموزید</h2>
          <p style={{ color: '#52515A', fontFamily: 'Vazirmatn, sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#4A78F5', fontSize: '9px' }}>■</span> مبتدی &nbsp;
            <span style={{ color: '#7F42EF', fontSize: '9px' }}>■</span> متوسط &nbsp;
            <span style={{ color: '#E88040', fontSize: '9px' }}>■</span> پیشرفته — سطح دوره با رنگ حاشیه مشخص است
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px' }}
          className="sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#" className="btn-ghost" style={{ fontSize: '15px' }}>
            ← مشاهده همه ۴۷ دوره
          </a>
        </div>
      </div>
    </section>
  )
}
