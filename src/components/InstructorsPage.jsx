import { INSTRUCTORS_DATA } from './Instructors';
import './InstructorsPage.css';

const FULL_BIOS = {
  1: 'غلامرضا کریمی‌پور یکی از فعال‌ترین مدرسان برنامه‌نویسی فارسی‌زبان است. با بیش از ۲ سال سابقه تدریس آنلاین و بیش از ۵۰۰ دانشجو، دوره‌های او از جامع‌ترین منابع آموزش React و JavaScript به زبان فارسی محسوب می‌شوند. سبک تدریس عملی و پروژه‌محور او کمک می‌کند دانشجویان مفاهیم پیچیده را به سرعت یاد بگیرند.',
  2: 'سارا محمدی متخصص یادگیری ماشین و تحلیل داده است. با مدرک دکترا در هوش مصنوعی از دانشگاه تهران، تجربه عملی در شرکت‌های بزرگ فناوری را با مهارت تدریس ترکیب کرده. دوره‌های او برای افرادی که می‌خواهند وارد دنیای علم داده شوند ایده‌ال است.',
  3: 'علی رضایی متخصص توسعه بک‌اند و زیرساخت ابری است. با بیش از ۵ سال تجربه در شرکت‌های Enterprise، دانش عمیقی در Node.js، Docker، Kubernetes و AWS دارد. دوره‌های او تمرکز ویژه‌ای بر مهارت‌های مورد نیاز بازار کار ایران دارند.',
};

export default function InstructorsPage({ onBack }) {
  return (
    <main className="ip-page" dir="rtl">
      <div className="ip-header">
        <button className="ip-back" onClick={onBack}>← بازگشت</button>
        <h1 className="ip-page-title">تیم آموزشی ما</h1>
        <p className="ip-page-sub">با بهترین متخصصان صنعت نرم‌افزار ایران آشنا شوید</p>
      </div>

      <div className="ip-content">
        {INSTRUCTORS_DATA.map(inst => (
          <div key={inst.id} className="ip-card glass-card">
            <div className="ip-card-left">
              <div className="ip-avatar" style={{ background: inst.color }}>
                <span>{inst.initials}</span>
              </div>
              <div className="ip-stats">
                <div className="ip-stat"><strong>{inst.students}+</strong><span>دانشجو</span></div>
                <div className="ip-stat"><strong>{inst.courses}</strong><span>دوره</span></div>
                <div className="ip-stat"><strong>★{inst.rating}</strong><span>امتیاز</span></div>
              </div>
              <div className="ip-socials">
                <a href={inst.social.telegram} className="ip-social">✈ تلگرام</a>
                <a href={inst.social.linkedin} className="ip-social">💼 لینکدین</a>
                <a href={inst.social.github} className="ip-social">🐙 گیت‌هاب</a>
              </div>
            </div>

            <div className="ip-card-right">
              <h2 className="ip-name">{inst.name}</h2>
              <p className="ip-role">{inst.role}</p>
              <p className="ip-bio">{FULL_BIOS[inst.id] || inst.bio}</p>
              <div className="ip-skills">
                {inst.skills.map(s => <span key={s} className="ip-skill">{s}</span>)}
              </div>
              <button className="ip-courses-btn">مشاهده دوره‌ها</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
