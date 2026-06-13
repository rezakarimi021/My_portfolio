import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './FAQ.css';

const FAQ_DATA = [
  {
    category: 'ثبت‌نام و پرداخت',
    icon: '💳',
    items: [
      { q: 'چطور در دوره ثبت‌نام کنم؟', a: 'کافیست روی دکمه «خرید دوره» کلیک کنید، وارد حساب کاربری شوید و پرداخت را از طریق درگاه امن زرین‌پال انجام دهید. دسترسی فوری بعد از پرداخت فعال می‌شود.' },
      { q: 'آیا امکان بازگشت وجه وجود دارد؟', a: 'بله، تا ۷ روز پس از خرید در صورت نارضایتی، مبلغ کامل به شما بازگردانده می‌شود.' },
      { q: 'روش‌های پرداخت چیست؟', a: 'درگاه زرین‌پال (تمام کارت‌های عضو شتاب)، کیف پول آموزشگاه، و کد تخفیف.' },
    ],
  },
  {
    category: 'محتوای دوره',
    icon: '📚',
    items: [
      { q: 'مدت دسترسی به دوره چقدر است؟', a: 'دسترسی مادام‌العمر دارید. هر بار که محتوا به‌روزرسانی شود، بدون هزینه اضافی دسترسی خواهید داشت.' },
      { q: 'آیا گواهینامه داده می‌شود؟', a: 'بله، پس از اتمام دوره یک گواهینامه معتبر دیجیتال صادر می‌شود که قابل اشتراک در LinkedIn است.' },
      { q: 'آیا می‌توانم دوره را آفلاین دانلود کنم؟', a: 'ویدیوها از پلتفرم آنلاین پخش می‌شوند. برای کاربران موبایل، امکان پخش با کیفیت پایین برای مناطق با اینترنت ضعیف وجود دارد.' },
    ],
  },
  {
    category: 'پشتیبانی فنی',
    icon: '🛠️',
    items: [
      { q: 'اگر سوال داشتم چطور کمک بگیرم؟', a: 'در بخش Q&A هر درس می‌توانید سوال مطرح کنید. مدرس معمولاً ظرف ۲۴-۴۸ ساعت پاسخ می‌دهد. همچنین گروه تلگرامی اختصاصی هر دوره وجود دارد.' },
      { q: 'مشکل فنی در پخش ویدیو دارم؟', a: 'لطفاً مرورگر خود را به‌روزرسانی کنید یا مرورگر دیگری امتحان کنید. در صورت ادامه مشکل از پشتیبانی @support در تلگرام کمک بگیرید.' },
      { q: 'آیا نسخه موبایل دارید؟', a: 'سایت کاملاً ریسپانسیو است و روی همه دستگاه‌ها به خوبی کار می‌کند. اپلیکیشن اندروید در دست توسعه است.' },
    ],
  },
  {
    category: 'گواهینامه',
    icon: '🏆',
    items: [
      { q: 'گواهینامه شما تا چه اندازه معتبر است؟', a: 'گواهینامه‌های ما از طرف دانشگاه صنعتی اصفهان و اتحادیه اینترنت ایران تأیید شده‌اند.' },
      { q: 'چطور گواهینامه‌ام را بگیرم؟', a: 'پس از تماشای ۱۰۰٪ ویدیوها و پاس کردن آزمون نهایی، گواهینامه به ایمیل شما ارسال می‌شود.' },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const titleRef = useScrollReveal({ type: 'fade' });
  const bodyRef = useScrollReveal({ type: 'up', delay: 100 });

  return (
    <section id="faq" className="faq section">
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span className="faq-chip">❓ سوالات متداول</span>
        <h2 className="section-title">پاسخ سوالات شما</h2>
        <div className="section-divider" />
      </div>

      <div ref={bodyRef} className="faq-inner" dir="rtl">
        <div className="faq-cats">
          {FAQ_DATA.map((cat, i) => (
            <button
              key={i}
              className={`faq-cat-btn ${activeCategory === i ? 'active' : ''}`}
              onClick={() => setActiveCategory(i)}
            >
              <span>{cat.icon}</span> {cat.category}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {FAQ_DATA[activeCategory].items.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
