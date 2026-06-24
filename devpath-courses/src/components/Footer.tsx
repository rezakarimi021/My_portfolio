const footerLinks = {
  Courses: ['Web Development', 'Data Science', 'DevOps & Cloud', 'Mobile Development', 'Machine Learning', 'System Design'],
  Company: ['About DevPath', 'Blog', 'Careers', 'Press Kit'],
  Support: ['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
}

const socialLinks = [
  { label: 'GitHub', href: '#', icon: '⬡' },
  { label: 'Twitter', href: '#', icon: '◈' },
  { label: 'LinkedIn', href: '#', icon: '◉' },
]

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0C0C0F',
      borderTop: '1px solid #1E1E26',
      paddingTop: '64px',
    }}>
      <div className="container-dp">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid #1E1E26',
        }} className="sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '16px' }}>
              <span style={{ color: '#4A78F5', fontSize: '18px' }}>◆</span>
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700, fontSize: '18px',
                color: '#EEECEA', letterSpacing: '-0.01em',
              }}>DevPath</span>
            </a>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', color: '#52515A',
              lineHeight: 1.7, maxWidth: '240px', marginBottom: '24px',
            }}>
              Programming education from people who are still writing production code.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#141419',
                  border: '1px solid #1E1E26',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#52515A',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E2E3C'; e.currentTarget.style.color = '#8A8997' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E26'; e.currentTarget.style.color = '#52515A' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px', fontWeight: 600,
                color: '#EEECEA',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>{section}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '14px', color: '#52515A',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#8A8997')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#52515A')}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', color: '#52515A',
          }}>
            © 2026 DevPath. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px', color: '#52515A',
            letterSpacing: '0.05em',
          }}>
            Built for serious learners.
          </p>
        </div>
      </div>
    </footer>
  )
}
