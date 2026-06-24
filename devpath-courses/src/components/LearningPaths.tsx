import { useState } from 'react'

const paths = [
  {
    icon: '◈',
    title: 'Full-Stack Web Development',
    description: 'From HTML & CSS to React frontends and Node.js backends. Build and ship complete web applications.',
    courseCount: 8,
    duration: '~6 months',
    accent: '#4A78F5',
    gradient: 'linear-gradient(135deg, #091826 0%, #0d1f35 100%)',
  },
  {
    icon: '⬡',
    title: 'Data Science & Machine Learning',
    description: 'Python, statistics, pandas, scikit-learn, and production ML. End-to-end from data cleaning to deployment.',
    courseCount: 11,
    duration: '~8 months',
    accent: '#7F42EF',
    gradient: 'linear-gradient(135deg, #0f0a20 0%, #180f30 100%)',
  },
  {
    icon: '◉',
    title: 'DevOps & Cloud Engineering',
    description: 'Linux, Docker, Kubernetes, Terraform, and AWS. The path from developer to platform engineer.',
    courseCount: 9,
    duration: '~7 months',
    accent: '#E88040',
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #221200 100%)',
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
          <div className="section-label">structured learning</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>Learning paths</h2>
          <p style={{ color: '#52515A', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', marginTop: '8px' }}>
            Curated sequences of courses that take you from zero to job-ready.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {paths.map((path, i) => (
            <div
              key={path.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                backgroundColor: '#141419',
                border: `1px solid ${hovered === i ? '#2E2E3C' : '#1E1E26'}`,
                borderLeft: `3px solid ${path.accent}`,
                borderRadius: '6px',
                padding: '28px 32px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: '32px',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
                backgroundColor: hovered === i ? '#16161B' : '#141419',
              }}
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '50%',
                  backgroundColor: `${path.accent}18`,
                  border: `1px solid ${path.accent}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', color: path.accent,
                  flexShrink: 0,
                }}>{path.icon}</div>

                <div>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px', fontWeight: 600,
                    color: '#EEECEA', marginBottom: '8px',
                  }}>{path.title}</h3>
                  <p style={{ color: '#8A8997', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.6, maxWidth: '540px' }}>
                    {path.description}
                  </p>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '14px', fontSize: '13px', color: '#52515A', fontFamily: 'JetBrains Mono, monospace' }}>
                    <span>{path.courseCount} courses</span>
                    <span style={{ color: '#1E1E26' }}>|</span>
                    <span>{path.duration}</span>
                  </div>
                </div>
              </div>

              <a href="#" className="btn-ghost" style={{ whiteSpace: 'nowrap', fontSize: '14px' }}>
                Start Path →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
