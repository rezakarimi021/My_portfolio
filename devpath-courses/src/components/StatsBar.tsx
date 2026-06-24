const stats = [
  { value: '۴۷', label: 'دوره' },
  { value: '۱۸', label: 'مدرس' },
  { value: '+۱۲,۰۰۰', label: 'دانش‌آموز' },
  { value: '۴.۸', label: 'میانگین امتیاز' },
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
                fontFamily: 'Vazirmatn, sans-serif',
                fontSize: 'clamp(32px, 5vw, 44px)',
                fontWeight: 800,
                color: '#EEECEA',
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'Vazirmatn, sans-serif',
                fontSize: '14px',
                color: '#52515A',
                marginTop: '6px',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
