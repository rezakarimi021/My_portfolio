import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'آیا بعد از ثبت‌نام دسترسی مادام‌العمر دارم؟',
    a: 'بله. پس از ثبت‌نام، دسترسی دائمی به دوره و تمام به‌روزرسانی‌های آینده دارید. هر بار که اکوسیستم تغییر مهمی می‌کند، جلسات جدید اضافه می‌کنیم.',
  },
  {
    q: 'آیا این دوره‌ها برای مبتدیان مناسب است؟',
    a: 'بستگی به دوره دارد. هر کارت دوره سطح آن را نشان می‌دهد: مبتدی، متوسط یا پیشرفته. حاشیه رنگی کارت را ببینید — آبی مبتدی، بنفش متوسط، نارنجی پیشرفته — و پیش‌نیازها را در صفحه دوره بخوانید.',
  },
  {
    q: 'اگر از دوره راضی نبودم چه می‌شود؟',
    a: 'در ۳۰ روز اول خرید می‌توانید بدون هیچ سؤالی درخواست بازگشت وجه کامل دهید. ترجیح می‌دهیم دوره مناسب پیدا کنید تا اینکه پول شما را نگه داریم.',
  },
  {
    q: 'آیا تخفیف گروهی یا سازمانی دارید؟',
    a: 'بله. برای تیم‌های ۵ نفر و بیشتر، با ما از طریق teams@devpath.io تماس بگیرید تا تخفیف حجمی و صورتحساب متمرکز داشته باشید.',
  },
  {
    q: 'آیا می‌توانم جلسات را برای مشاهده آفلاین دانلود کنم؟',
    a: 'بله. تمام جلسات از طریق اپلیکیشن iOS و Android ما قابل دانلود هستند. دانلود از طریق وب برای اشتراک‌های Pro در دسترس است.',
  },
  {
    q: 'آیا گواهی‌نامه شامل می‌شود؟',
    a: 'هر دوره شامل گواهی‌نامه تکمیل است که می‌توانید در LinkedIn یا نزد کارفرماها به اشتراک بگذارید. گواهی‌نامه‌ها از طریق Credly صادر می‌شوند و به اعتبار قابل تأیید لینک می‌شوند.',
  },
  {
    q: 'چگونه مدرسان انتخاب می‌شوند؟',
    a: 'فقط با متخصصانی کار می‌کنیم که در محیط تولیدی فعال هستند. هر مدرس ۳ مرحله بررسی را طی می‌کند: بررسی پرتفولیو، جلسه نمونه، و بازبینی محتوا.',
  },
  {
    q: 'دوره‌ها به چه زبانی هستند؟',
    a: 'تمام دوره‌ها به فارسی ارائه می‌شوند. زیرنویس خودکار در ۱۲ زبان موجود است و زیرنویس بررسی‌شده توسط انسان به زبان‌های عربی، انگلیسی و ترکی نیز در دسترس است.',
  },
]

export function FAQ() {
  return (
    <section id="faq" style={{ padding: '80px 0', borderTop: '1px solid #1E1E26' }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">سؤالات متداول</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>قبل از ثبت‌نام</h2>
        </div>

        <div style={{ maxWidth: '720px' }}>
          <Accordion type="single" collapsible style={{ borderTop: '1px solid #1E1E26' }}>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} style={{ borderBottom: '1px solid #1E1E26' }}>
                <AccordionTrigger style={{
                  fontFamily: 'Vazirmatn, sans-serif',
                  fontSize: '15px', fontWeight: 700,
                  color: '#EEECEA', padding: '20px 0',
                  textAlign: 'right', background: 'none', border: 'none',
                  width: '100%', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: '16px', textDecoration: 'none',
                }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{
                  fontFamily: 'Vazirmatn, sans-serif',
                  fontSize: '14px', color: '#8A8997',
                  lineHeight: 1.9, paddingBottom: '20px',
                }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
