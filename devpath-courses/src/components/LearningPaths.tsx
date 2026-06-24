import { useState } from 'react'

const paths = [
  {
    icon: '◈',
    title: 'توسعه وب فول استک',
    description: 'از HTML و CSS تا فرانت‌اند ری‌اکت و بک‌اند Node.js. برنامه‌های وب کامل بسازید و راه‌اندازی کنید.',
    courseCount: 8,
    duration: '~۶ ماه',
    accent: '#4A78F5',
  },
  {
    icon: '⬡',
    title: 'علم داده و یادگیری ماشین',
    description: 'پایتون، آمار، پانداس، scikit-learn و ML تولیدی. از تمیزسازی داده تا استقرار مدل، سرتاسر.',
    courseCount: 11,
    duration: '~۸ ماه',
    accent: '#7F42EF',
  },
  {
    icon: '◉',
    title: 'دواپس و مهندسی ابری',
    description: 'لینوکس، داکر، کوبرنتیز، ترافورم و AWS. مسیر از توسعه‌دهنده تا مهندس پلتفرم.',
    courseCount: 9,
    duration: '~۷ ماه',
    accent: '#E88040',
  },
]

export function LearningPaths() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="learning-paths" style={{
      backgroundColor: '#0C0C0F',
      padding: '80px 0',
      borderTop: '1px solid #1E1E26',
    }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">یادگیری ساختارمند</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>مسیرهای یادگیری</h2>
          <p style={{ color: '#52515A', fontFamily: 'Vazirmatn, sans-serif', fontSize: '15px', marginTop: '8px' }}>
            توالی‌های منتخبی از دوره‌ها که شما را از صفر تا آماده برای بازار کار می‌رسانند.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {paths.map((path, i) => (
            <div
              key={path.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                backgroundColor: hovered === i ? '#16161B' : '#141419',
                border: `1px solid ${hovered === i ? '#2E2E3C' : '#1E1E26'}`,
                borderRight: `3px solid ${path.accent}`,
                borderRadius: '6px',
                padding: '28px 32px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: '32px',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: `${path.accent}18`,
                  border: `1px solid ${path.accent}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', color: path.accent, flexShrink: 0,
                }}>{path.icon}</div>

                <div>
                  <h3 style={{
                    fontFamily: 'Vazirmatn, sans-serif',
                    fontSize: '17px', fontWeight: 700,
                    color: '#EEECEA', marginBottom: '8px',
                  }}>{path.title}</h3>
                  <p style={{ color: '#8A8997', fontSize: '14px', fontFamily: 'Vazirmatn, sans-serif', lineHeight: 1.8, maxWidth: '540px' }}>
                    {path.description}
                  </p>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '14px', fontSize: '13px', color: '#52515A', fontFamily: 'Vazirmatn, sans-serif' }}>
                    <span>{path.courseCount} دوره</span>
                    <span style={{ color: '#1E1E26' }}>|</span>
                    <span>{path.duration}</span>
                  </div>
                </div>
              </div>

              <a href="#" className="btn-ghost" style={{ whiteSpace: 'nowrap', fontSize: '14px' }}>
                ← شروع مسیر
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
