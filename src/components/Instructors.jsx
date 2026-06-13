import { useScrollReveal } from '../hooks/useScrollReveal';
import './Instructors.css';

export const INSTRUCTORS_DATA = [
  {
    id: 1,
    name: 'غلامرضا کریمی‌پور',
    role: 'مدرس ارشد React.js و JavaScript',
    bio: 'بیش از ۲ سال تجربه تدریس برنامه‌نویسی وب. تخصص در React، Next.js و اکوسیستم فرانت‌اند.',
    avatar: '👨‍💻',
    initials: 'GK',
    color: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    rating: 4.9,
    students: 500,
    courses: 6,
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript'],
    social: { telegram: '#', linkedin: '#', github: '#' },
  },
  {
    id: 2,
    name: 'سارا محمدی',
    role: 'مدرس Python و Data Science',
    bio: 'متخصص در یادگیری ماشین، تحلیل داده و اتوماسیون با Python. ۳ سال سابقه تدریس.',
    avatar: '👩‍💻',
    initials: 'SM',
    color: 'linear-gradient(135deg,#10b981,#059669)',
    rating: 4.8,
    students: 380,
    courses: 4,
    skills: ['Python', 'Machine Learning', 'Pandas', 'TensorFlow'],
    social: { telegram: '#', linkedin: '#', github: '#' },
  },
  {
    id: 3,
    name: 'علی رضایی',
    role: 'مدرس Node.js و DevOps',
    bio: 'متخصص بک‌اند و زیرساخت. تجربه در Docker، CI/CD، AWS و معماری Microservices.',
    avatar: '👨‍🔧',
    initials: 'AR',
    color: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    rating: 4.7,
    students: 290,
    courses: 3,
    skills: ['Node.js', 'Docker', 'AWS', 'MongoDB'],
    social: { telegram: '#', linkedin: '#', github: '#' },
  },
];

function InstructorCard({ instructor, delay }) {
  const ref = useScrollReveal({ type: 'up', delay });
  return (
    <article ref={ref} className="inst-card glass-card">
      <div className="inst-avatar-wrap">
        <div className="inst-avatar" style={{ background: instructor.color }}>
          <span>{instructor.initials}</span>
        </div>
        <div className="inst-badge-wrap">
          <span className="inst-rating">★ {instructor.rating}</span>
        </div>
      </div>
      <div className="inst-info">
        <h3 className="inst-name">{instructor.name}</h3>
        <p className="inst-role">{instructor.role}</p>
        <p className="inst-bio">{instructor.bio}</p>
        <div className="inst-skills">
          {instructor.skills.map(s => <span key={s} className="inst-skill">{s}</span>)}
        </div>
        <div className="inst-stats">
          <div className="inst-stat">
            <strong>{instructor.students}+</strong>
            <span>دانشجو</span>
          </div>
          <div className="inst-stat">
            <strong>{instructor.courses}</strong>
            <span>دوره</span>
          </div>
          <div className="inst-stat">
            <strong>{instructor.rating}</strong>
            <span>امتیاز</span>
          </div>
        </div>
        <div className="inst-socials">
          <a href={instructor.social.telegram} className="inst-social-btn" aria-label="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
          </a>
          <a href={instructor.social.linkedin} className="inst-social-btn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href={instructor.social.github} className="inst-social-btn" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Instructors({ onViewAll }) {
  const titleRef = useScrollReveal({ type: 'fade' });
  return (
    <section id="instructors" className="instructors section">
      <div ref={titleRef} className="instructors-header">
        <span className="instructors-chip">👨‍🏫 تیم آموزشی</span>
        <h2 className="section-title">مدرسان متخصص ما</h2>
        <div className="section-divider" />
        <p className="instructors-sub">با بهترین متخصصان صنعت یاد بگیرید</p>
      </div>

      <div className="inst-grid">
        {INSTRUCTORS_DATA.map((inst, i) => (
          <InstructorCard key={inst.id} instructor={inst} delay={i * 100} />
        ))}
      </div>

      <div className="inst-cta">
        <button className="inst-view-all btn-ripple" onClick={onViewAll}>
          مشاهده همه مدرسان
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  );
}
