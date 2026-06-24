const testimonials = [
  {
    quote: "The Python course fundamentally changed how I think about data. I went from managing Excel sheets to building ML pipelines in production — in three months.",
    name: 'Amara Osei',
    role: 'Junior Data Analyst, Berlin',
  },
  {
    quote: "I landed my first backend role two weeks after finishing the Go course. Every project in it mapped directly to what interviewers asked about.",
    name: 'Dmitri Volkov',
    role: 'Backend Engineer, Remote',
  },
  {
    quote: "DevPath is what a serious learning platform looks like. No gamification, no fluff — just practitioners teaching what they actually ship.",
    name: 'Lena Fischer',
    role: 'DevOps Engineer, Munich',
  },
  {
    quote: "The Kubernetes course saved my team months of painful trial and error. Yuki covers production patterns you won't find anywhere in the official docs.",
    name: 'Rajesh Patel',
    role: 'Platform Engineer, Mumbai',
  },
  {
    quote: "I finally understood React's mental model after years of half-understood tutorials. Sarah's TypeScript integration section alone is worth the price of the course.",
    name: 'Chloe Dupont',
    role: 'Frontend Developer, Paris',
  },
  {
    quote: "The algorithms course is dense in the best possible way. Prof. Kaci doesn't dumb anything down, and the code challenges map directly to real interviews.",
    name: 'Tomás Navarro',
    role: 'Software Engineer, Madrid',
  },
]

export function Testimonials() {
  return (
    <section style={{
      backgroundColor: '#141419',
      padding: '80px 0',
      borderTop: '1px solid #1E1E26',
      borderBottom: '1px solid #1E1E26',
    }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">student outcomes</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>What our students say</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '16px',
        }} className="sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} style={{
              backgroundColor: '#0C0C0F',
              border: '1px solid #1E1E26',
              borderLeft: '2px solid #4A78F533',
              borderRadius: '6px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '42px',
                lineHeight: 0.8,
                color: '#4A78F5',
                fontWeight: 800,
                opacity: 0.6,
                userSelect: 'none',
              }}>"</div>

              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#8A8997',
                fontStyle: 'italic',
                flex: 1,
              }}>
                {t.quote}
              </p>

              <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '16px' }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px', fontWeight: 600,
                  color: '#EEECEA', marginBottom: '2px',
                }}>{t.name}</div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: '#52515A',
                }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
