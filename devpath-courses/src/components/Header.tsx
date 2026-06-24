import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const categories = [
  'توسعه وب', 'علم داده', 'دواپس و ابر',
  'توسعه موبایل', 'یادگیری ماشین', 'طراحی سیستم',
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLink: React.CSSProperties = {
    padding: '8px 12px',
    color: '#8A8997',
    textDecoration: 'none',
    fontSize: '15px',
    fontFamily: 'Vazirmatn, sans-serif',
    fontWeight: 500,
    borderRadius: '4px',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: scrolled ? 'rgba(12,12,15,0.92)' : 'rgba(12,12,15,0)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #1E1E26' : '1px solid transparent',
      transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
    }}>
      <div className="container-dp">
        <div style={{ display: 'flex', alignItems: 'center', height: '68px', gap: '8px' }}>

          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '24px' }}>
            <span style={{ color: '#4A78F5', fontSize: '18px', lineHeight: 1 }}>◆</span>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              color: '#EEECEA',
              letterSpacing: '-0.01em',
            }}>DevPath</span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ gap: '2px', flex: 1, alignItems: 'center' }} className="hidden md:flex">
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button
                style={navLink}
                onMouseEnter={e => (e.currentTarget.style.color = '#EEECEA')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8997')}
              >
                دوره‌ها <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: coursesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              {coursesOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', right: 0,
                  backgroundColor: '#141419',
                  border: '1px solid #1E1E26',
                  borderRadius: '6px',
                  padding: '6px',
                  minWidth: '210px',
                  zIndex: 100,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}>
                  {categories.map(cat => (
                    <a key={cat} href="#courses" style={{
                      display: 'block', padding: '9px 12px',
                      color: '#8A8997', textDecoration: 'none',
                      fontSize: '14px', fontFamily: 'Vazirmatn, sans-serif',
                      borderRadius: '4px', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#EEECEA'
                      e.currentTarget.style.backgroundColor = '#1E1E26'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#8A8997'
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}>{cat}</a>
                  ))}
                </div>
              )}
            </div>

            {['مسیرهای یادگیری', 'وبلاگ', 'درباره ما'].map(item => (
              <a key={item} href="#"
                style={navLink as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.color = '#EEECEA')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8997')}
              >{item}</a>
            ))}
          </nav>

          {/* Right CTA */}
          <div style={{ alignItems: 'center', gap: '12px', marginRight: 'auto' }} className="hidden md:flex">
            <a href="#" style={{
              color: '#8A8997', textDecoration: 'none', fontSize: '15px',
              fontFamily: 'Vazirmatn, sans-serif', fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#EEECEA')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8A8997')}
            >ورود</a>
            <a href="#courses" className="btn-primary" style={{ padding: '9px 20px', fontSize: '14px' }}>
              ← شروع یادگیری
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              marginRight: 'auto', background: 'none', border: 'none',
              cursor: 'pointer', color: '#EEECEA', padding: '4px',
            }}
            className="flex md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            padding: '8px 0 24px',
            borderTop: '1px solid #1E1E26',
          }} className="flex md:hidden flex-col">
            {['دوره‌ها', 'مسیرهای یادگیری', 'وبلاگ', 'درباره ما'].map(item => (
              <a key={item} href="#" onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '14px 0',
                color: '#8A8997', textDecoration: 'none',
                fontSize: '16px', fontFamily: 'Vazirmatn, sans-serif',
                fontWeight: 500,
                borderBottom: '1px solid #1E1E26',
              }}>{item}</a>
            ))}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: '#8A8997', textDecoration: 'none', fontSize: '15px', fontFamily: 'Vazirmatn, sans-serif' }}>ورود</a>
              <a href="#courses" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                ← شروع یادگیری
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
