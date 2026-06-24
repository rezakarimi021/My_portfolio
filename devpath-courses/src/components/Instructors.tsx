import { useState } from 'react'

const instructors = [
  {
    name: 'دکتر فرخ تاشکنتوف',
    role: 'علم داده و یادگیری ماشین',
    bio: 'دانشمند سابق CERN. خط‌لوله‌های ML در مقیاس تولیدی می‌سازد.',
    courses: 4,
    initials: 'ف.ت',
    avatar: 'linear-gradient(135deg, #1E3A5F 0%, #0D1B3E 100%)',
    textColor: '#4A78F5',
  },
  {
    name: 'سارا چن',
    role: 'مهندسی فرانت‌اند',
    bio: 'مهندس ارشد در Vercel. مشارکت‌کننده اکوسیستم ری‌اکت از ۲۰۱۸.',
    courses: 6,
    initials: 'س.چ',
    avatar: 'linear-gradient(135deg, #1F2D3D 0%, #0f1e2d 100%)',
    textColor: '#60A0D0',
  },
  {
    name: 'مارکوس رید',
    role: 'دواپس و لینوکس',
    bio: 'سرپرست زیرساخت با ۱۲ سال تجربه در محیط‌های لینوکس پرترافیک.',
    courses: 3,
    initials: 'م.ر',
    avatar: 'linear-gradient(135deg, #1A2E1A 0%, #0f200f 100%)',
    textColor: '#5A9A5A',
  },
  {
    name: 'یوکی تاناکا',
    role: 'ابر و کوبرنتیز',
    bio: 'مهندس پلتفرم با کلاسترهای K8s چندمنطقه‌ای با +۵۰ میلیون درخواست روزانه.',
    courses: 5,
    initials: 'ی.ت',
    avatar: 'linear-gradient(135deg, #2D1B00 0%, #1a1000 100%)',
    textColor: '#C07020',
  },
]

export function Instructors() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #1E1E26' }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">مدرسان</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>از متخصصان یاد بگیرید</h2>
          <p style={{ color: '#52515A', fontFamily: 'Vazirmatn, sans-serif', fontSize: '15px', marginTop: '8px' }}>
            همه مدرسان ما هنوز در محیط تولیدی کد می‌نویسند. هیچ نویسنده کتاب یا سخنران کنفرانسی وجود ندارد.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="md:grid-cols-4">
          {instructors.map((inst, i) => (
            <div
              key={inst.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                backgroundColor: '#141419',
                border: '1px solid #1E1E26',
                borderRadius: '6px',
                padding: '28px 20px 24px',
                textAlign: 'center',
                cursor: 'default',
                transition: 'border-color 0.2s ease',
                borderColor: hoveredIdx === i ? '#2E2E3C' : '#1E1E26',
              }}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: inst.avatar,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '20px',
                fontFamily: 'Vazirmatn, sans-serif',
                fontWeight: 700,
                color: inst.textColor,
                filter: hoveredIdx === i ? 'brightness(1.2)' : 'brightness(0.7) saturate(0.5)',
                transition: 'filter 0.3s ease',
                border: `2px solid ${inst.textColor}33`,
              }}>{inst.initials}</div>

              <h3 style={{
                fontFamily: 'Vazirmatn, sans-serif',
                fontSize: '14px', fontWeight: 700,
                color: '#EEECEA', marginBottom: '4px',
              }}>{inst.name}</h3>

              <p style={{ color: '#8A8997', fontSize: '12px', fontFamily: 'Vazirmatn, sans-serif', marginBottom: '10px' }}>
                {inst.role}
              </p>

              <p style={{ color: '#52515A', fontSize: '12px', fontFamily: 'Vazirmatn, sans-serif', lineHeight: 1.7, marginBottom: '14px' }}>
                {inst.bio}
              </p>

              <div style={{
                display: 'inline-block', backgroundColor: '#1E1E26',
                borderRadius: '3px', padding: '3px 10px',
                fontSize: '11px', fontFamily: 'Vazirmatn, sans-serif', color: '#8A8997',
              }}>{inst.courses} دوره</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
