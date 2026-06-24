const stats = [
  { value: '47', label: 'Courses' },
  { value: '18', label: 'Instructors' },
  { value: '12,000+', label: 'Students' },
  { value: '4.8', label: 'Average Rating' },
]

export function StatsBar() {
  return (
    <section style={{
      backgroundColor: '#141419',
      borderTop: '1px solid #1E1E26',
      borderBottom: '1px solid #1E1E26',
      padding: '40px 0',
    }}>
      <div className="container-dp">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '32px',
        }} className="md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(32px, 5vw, 44px)',
                fontWeight: 800,
                color: '#EEECEA',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                color: '#52515A',
                marginTop: '6px',
                letterSpacing: '0.02em',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
