const testimonials = [
  {
    quote: 'دوره پایتون به شکل اساسی نگاه من به داده را تغییر داد. در عرض سه ماه از مدیریت فایل‌های اکسل به ساخت خطوط لوله ML در محیط تولیدی رسیدم.',
    name: 'آمارا اوسه',
    role: 'تحلیلگر داده جونیور، برلین',
  },
  {
    quote: 'دو هفته بعد از اتمام دوره Go، اولین شغل بک‌اندم را پیدا کردم. هر پروژه‌ای در آن دوره دقیقاً همان چیزی بود که مصاحبه‌گران می‌پرسیدند.',
    name: 'دیمیتری ولکوف',
    role: 'مهندس بک‌اند، دورکاری',
  },
  {
    quote: 'DevPath همان چیزی است که یک پلتفرم یادگیری جدی باید باشد. بدون بازی‌وارسازی، بدون محتوای اضافی — فقط متخصصان که آنچه واقعاً استفاده می‌کنند را آموزش می‌دهند.',
    name: 'لنا فیشر',
    role: 'مهندس دواپس، مونیخ',
  },
  {
    quote: 'دوره Kubernetes ماه‌ها آزمون و خطای دردناک تیم ما را ذخیره کرد. یوکی الگوهای تولیدی را آموزش می‌دهد که در هیچ مستند رسمی نمی‌یابید.',
    name: 'راجش پاتل',
    role: 'مهندس پلتفرم، مومبای',
  },
  {
    quote: 'بعد از سال‌ها آموزش‌های ناقص، سرانجام مدل ذهنی ری‌اکت را درک کردم. بخش ادغام تایپ‌اسکریپت سارا به تنهایی ارزش هزینه دوره را دارد.',
    name: 'کلوئه دوپون',
    role: 'توسعه‌دهنده فرانت‌اند، پاریس',
  },
  {
    quote: 'دوره الگوریتم‌ها به بهترین شکل ممکن متراکم است. پروفسور کاسی چیزی را ساده نمی‌کند — و چالش‌های کدنویسی مستقیماً به مصاحبه‌های واقعی مرتبط هستند.',
    name: 'توماس ناوارو',
    role: 'مهندس نرم‌افزار، مادرید',
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
          <div className="section-label">نتایج دانش‌آموزان</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>آنچه دانش‌آموزان ما می‌گویند</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}
          className="sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} style={{
              backgroundColor: '#0C0C0F',
              border: '1px solid #1E1E26',
              borderRight: '2px solid #4A78F533',
              borderRadius: '6px',
              padding: '28px',
              display: 'flex', flexDirection: 'column', gap: '16px',
            }}>
              <div style={{
                fontFamily: 'Vazirmatn, sans-serif',
                fontSize: '42px', lineHeight: 0.8,
                color: '#4A78F5', fontWeight: 800,
                opacity: 0.6, userSelect: 'none',
              }}>«</div>

              <p style={{
                fontFamily: 'Vazirmatn, sans-serif',
                fontSize: '14px', lineHeight: 1.9,
                color: '#8A8997', flex: 1,
              }}>
                {t.quote}
              </p>

              <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '16px' }}>
                <div style={{
                  fontFamily: 'Vazirmatn, sans-serif',
                  fontSize: '14px', fontWeight: 700,
                  color: '#EEECEA', marginBottom: '2px',
                }}>{t.name}</div>
                <div style={{
                  fontFamily: 'Vazirmatn, sans-serif',
                  fontSize: '12px', color: '#52515A',
                }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
