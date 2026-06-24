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
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#4A78F5', marginBottom: '20px',
        }}>همین امروز شروع کنید</div>

        <h2 style={{
          fontFamily: 'Vazirmatn, sans-serif',
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 800, color: '#EEECEA',
          lineHeight: 1.2, letterSpacing: '-0.01em',
          marginBottom: '16px',
        }}>
          آماده‌اید شروع به ساختن کنید؟
        </h2>

        <p style={{
          fontFamily: 'Vazirmatn, sans-serif',
          fontSize: '17px', color: '#8A8997',
          lineHeight: 1.8, maxWidth: '480px',
          margin: '0 auto 40px',
        }}>
          ۴۷ دوره. بدون محتوای اضافی. مدرسانی که کد می‌نویسند.
          اولین دوره شما از لحظه‌ای که ثبت‌نام می‌کنید شروع می‌شود.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#courses" className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
            ← مشاهده همه دوره‌ها
          </a>
          <a href="#learning-paths" className="btn-ghost" style={{ fontSize: '16px', padding: '14px 32px' }}>
            مشاهده مسیرهای یادگیری
          </a>
        </div>

        <p style={{
          fontFamily: 'Vazirmatn, sans-serif',
          fontSize: '13px', color: '#52515A', marginTop: '24px',
        }}>ضمانت بازگشت وجه ۳۰ روزه · دسترسی مادام‌العمر · گواهی‌نامه شامل است</p>
      </div>
    </section>
  )
}
