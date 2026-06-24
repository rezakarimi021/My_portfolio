export function CTABanner() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0C0C0F 0%, #0D1020 50%, #0C0C0F 100%)',
      borderTop: '1px solid #1E1E26',
      borderBottom: '1px solid #1E1E26',
      padding: '80px 0',
      textAlign: 'center',
    }}>
      <div className="container-dp">
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#4A78F5',
          marginBottom: '20px',
        }}>start today</div>

        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 800,
          color: '#EEECEA',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
        }}>
          Ready to start building?
        </h2>

        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '17px',
          color: '#8A8997',
          lineHeight: 1.6,
          maxWidth: '480px',
          margin: '0 auto 40px',
        }}>
          47 courses. No fluff. Instructors who ship.
          Your first course starts the moment you enroll.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#courses" className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
            Browse All Courses →
          </a>
          <a href="#learning-paths" className="btn-ghost" style={{ fontSize: '16px', padding: '14px 32px' }}>
            View Learning Paths
          </a>
        </div>

        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          color: '#52515A',
          marginTop: '24px',
        }}>30-day refund guarantee · Lifetime access · Certificate included</p>
      </div>
    </section>
  )
}
