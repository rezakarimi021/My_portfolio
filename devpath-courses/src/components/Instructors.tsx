import { useState } from 'react'

const instructors = [
  {
    name: 'Dr. Farrukh Tashkentov',
    role: 'Data Science & ML',
    bio: 'Former research scientist at CERN. Builds production ML pipelines at scale.',
    courses: 4,
    initials: 'FT',
    bgColor: '#1E3A5F',
    textColor: '#4A78F5',
    avatar: 'linear-gradient(135deg, #1E3A5F 0%, #0D1B3E 100%)',
  },
  {
    name: 'Sarah Chen',
    role: 'Frontend Engineering',
    bio: 'Senior engineer at Vercel. Contributor to the React ecosystem since 2018.',
    courses: 6,
    initials: 'SC',
    bgColor: '#1F2D3D',
    textColor: '#60A0D0',
    avatar: 'linear-gradient(135deg, #1F2D3D 0%, #0f1e2d 100%)',
  },
  {
    name: 'Marcus Reid',
    role: 'DevOps & Linux',
    bio: 'Infrastructure lead with 12 years managing high-traffic Linux environments.',
    courses: 3,
    initials: 'MR',
    bgColor: '#1A2E1A',
    textColor: '#5A9A5A',
    avatar: 'linear-gradient(135deg, #1A2E1A 0%, #0f200f 100%)',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Cloud & Kubernetes',
    bio: 'Platform engineer who runs multi-region K8s clusters serving 50M+ requests/day.',
    courses: 5,
    initials: 'YT',
    bgColor: '#2D1B00',
    textColor: '#C07020',
    avatar: 'linear-gradient(135deg, #2D1B00 0%, #1a1000 100%)',
  },
]

export function Instructors() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section style={{
      padding: '80px 0',
      borderTop: '1px solid #1E1E26',
    }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">the instructors</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>Learn from practitioners</h2>
          <p style={{ color: '#52515A', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', marginTop: '8px' }}>
            Everyone on our platform is still writing code in production. No ex-practitioners, no "experts."
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }} className="md:grid-cols-4">
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
              {/* Avatar circle */}
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                background: inst.avatar,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '26px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                color: inst.textColor,
                filter: hoveredIdx === i ? 'brightness(1.2)' : 'brightness(0.7) saturate(0.5)',
                transition: 'filter 0.3s ease',
                border: `2px solid ${inst.textColor}33`,
              }}>{inst.initials}</div>

              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px', fontWeight: 600,
                color: '#EEECEA', marginBottom: '4px',
              }}>{inst.name}</h3>

              <p style={{
                color: '#8A8997',
                fontSize: '13px',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '10px',
              }}>{inst.role}</p>

              <p style={{
                color: '#52515A',
                fontSize: '12px',
                fontFamily: 'DM Sans, sans-serif',
                lineHeight: 1.6,
                marginBottom: '14px',
              }}>{inst.bio}</p>

              <div style={{
                display: 'inline-block',
                backgroundColor: '#1E1E26',
                borderRadius: '3px',
                padding: '3px 10px',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#8A8997',
              }}>{inst.courses} courses</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
