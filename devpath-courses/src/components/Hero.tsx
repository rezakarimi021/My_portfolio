import { useState, useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

const difficultyColor: Record<string, string> = {
  مبتدی: '#4A78F5',
  متوسط: '#7F42EF',
  پیشرفته: '#E88040',
}

const previewCourses = [
  {
    title: 'پایتون برای علم داده',
    instructor: 'دکتر فرخ تاشکنتوف',
    rating: 4.9,
    students: 2341,
    duration: '۱۴ ساعت ۳۲ دقیقه',
    price: '$۸۹.۰۰',
    difficulty: 'متوسط',
    icon: '⬡',
    gradient: 'linear-gradient(135deg, #0D1B3E 0%, #1a1030 100%)',
  },
  {
    title: 'تسلط بر ری‌اکت و تایپ‌اسکریپت',
    instructor: 'سارا چن',
    rating: 4.8,
    students: 3205,
    duration: '۲۲ ساعت ۱۵ دقیقه',
    price: '$۱۱۹.۰۰',
    difficulty: 'متوسط',
    icon: '◈',
    gradient: 'linear-gradient(135deg, #0a1a2e 0%, #0d1f35 100%)',
  },
  {
    title: 'کوبرنتیز در محیط تولید',
    instructor: 'یوکی تاناکا',
    rating: 4.9,
    students: 891,
    duration: '۱۸ ساعت ۳۰ دقیقه',
    price: '$۱۴۹.۰۰',
    difficulty: 'پیشرفته',
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
  const color = difficultyColor[course.difficulty]

  return (
    <section style={{ padding: '80px 0 96px' }}>
      <div className="container-dp">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '64px',
          alignItems: 'center',
        }} className="md:grid-cols-[55fr_45fr]">

          {/* Right (RTL: appears right) — headline + CTAs */}
          <div>
            <div className="section-label" style={{ marginBottom: '20px' }}>
              آموزش برنامه‌نویسی
            </div>

            <h1 style={{
              fontFamily: 'Vazirmatn, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#EEECEA',
              marginBottom: '0',
            }}>
              مهارت بسازید<br />
              <span style={{
                letterSpacing: '0.05em',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5.5vw, 60px)',
                color: '#EEECEA',
              }}>که رشد می‌کنند.</span>
            </h1>

            <p style={{
              marginTop: '28px',
              fontSize: '18px',
              lineHeight: 1.9,
              color: '#8A8997',
              maxWidth: '480px',
              fontFamily: 'Vazirmatn, sans-serif',
            }}>
              دوره‌هایی که توسط افرادی تدریس می‌شود که هنوز کد تولیدی
              می‌نویسند — نه نویسندگان کتاب‌های درسی یا سخنرانان کنفرانس.
            </p>

            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '20px',
              color: '#52515A',
              fontSize: '14px',
              fontFamily: 'Vazirmatn, sans-serif',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#4A78F5', fontSize: '8px' }}>●</span>
                ۴۷ دوره
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#4A78F5', fontSize: '8px' }}>●</span>
                ۱۸ مدرس
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#4A78F5', fontSize: '8px' }}>●</span>
                +۱۲,۰۰۰ دانش‌آموز
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
              <a href="#courses" className="btn-primary" style={{ fontSize: '15px' }}>
                ← مشاهده دوره‌ها
              </a>
              <a href="#" className="btn-ghost" style={{ fontSize: '15px' }}>
                ▶ نمونه درس ببینید
              </a>
            </div>
          </div>

          {/* Left (RTL: appears left) — carousel */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ maxWidth: '440px', margin: '0 auto', width: '100%' }}
          >
            <div style={{
              backgroundColor: '#141419',
              borderTop: `1px solid #1E1E26`,
              borderBottom: `1px solid #1E1E26`,
              borderLeft: `1px solid #1E1E26`,
              borderRight: `3px solid ${color}`,
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
                  fontSize: '64px', opacity: 0.15,
                  position: 'absolute', fontFamily: 'monospace',
                }}>{'{ }'}</div>
                <div style={{
                  width: '64px', height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(74,120,245,0.15)',
                  border: `1px solid rgba(74,120,245,0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px', color: color, zIndex: 1,
                }}>{course.icon}</div>
                <div style={{
                  position: 'absolute', top: '12px', left: '12px',
                  backgroundColor: `${color}22`,
                  border: `1px solid ${color}44`,
                  borderRadius: '3px', padding: '3px 8px',
                  fontSize: '11px', fontFamily: 'Vazirmatn, sans-serif',
                  fontWeight: 500, color: color,
                }}>{course.difficulty}</div>
              </div>

              {/* Card body */}
              <div style={{ padding: '20px 22px 22px' }}>
                <h3 style={{
                  fontFamily: 'Vazirmatn, sans-serif',
                  fontSize: '17px', fontWeight: 700,
                  color: '#EEECEA', marginBottom: '6px',
                }}>{course.title}</h3>
                <p style={{ color: '#8A8997', fontSize: '13px', fontFamily: 'Vazirmatn, sans-serif', marginBottom: '14px' }}>
                  {course.instructor}
                </p>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  marginBottom: '16px', fontSize: '13px', color: '#8A8997',
                  fontFamily: 'Vazirmatn, sans-serif',
                }}>
                  <Star size={13} fill="#E88040" color="#E88040" />
                  <span style={{ color: '#EEECEA', fontWeight: 600 }}>{course.rating}</span>
                  <span>({course.students.toLocaleString()} دانش‌آموز)</span>
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
                    ← ثبت‌نام
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
                    height: '6px', borderRadius: '3px',
                    backgroundColor: i === activeIdx ? '#4A78F5' : '#1E1E26',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease', padding: 0,
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
