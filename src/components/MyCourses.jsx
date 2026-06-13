import { useState } from 'react';
import './MyCourses.css';
import { getUserPurchases } from '../utils/auth';
import VideoPlayerModal from './VideoPlayerModal';

// Demo video IDs – site owner should replace per lesson
const COURSES_DATA = [
  {
    id: 'react', emoji: '⚛️', title: 'دوره جامع React.js',
    youtubeId: 'w7ejDZ8SWv8', vimeoId: '76979871',
    mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videos: [
      { id: 'r1', title: 'معرفی React و نصب محیط توسعه',     duration: '۱۸:۴۵' },
      { id: 'r2', title: 'JSX و ساختار کامپوننت‌ها',          duration: '۲۵:۱۲' },
      { id: 'r3', title: 'State و هوک useState',               duration: '۳۲:۰۵' },
      { id: 'r4', title: 'Props و انتقال داده بین کامپوننت‌ها', duration: '۲۸:۳۵' },
      { id: 'r5', title: 'useEffect و درخواست‌های HTTP',       duration: '۳۸:۵۰' },
      { id: 'r6', title: 'Context API و مدیریت State',         duration: '۴۲:۱۵' },
    ],
  },
  {
    id: 'nextjs', emoji: '🔷', title: 'آموزش Next.js 14',
    youtubeId: 'mTz0GXj8NN0', vimeoId: '76979871',
    mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videos: [
      { id: 'n1', title: 'معرفی Next.js و App Router',           duration: '۲۰:۳۰' },
      { id: 'n2', title: 'Server Components و Client Components', duration: '۳۵:۰۸' },
      { id: 'n3', title: 'Routing و Layout',                     duration: '۲۸:۴۵' },
      { id: 'n4', title: 'SSR و SSG با Next.js',                  duration: '۴۲:۲۰' },
      { id: 'n5', title: 'API Routes و Server Actions',           duration: '۳۱:۱۵' },
    ],
  },
  {
    id: 'js', emoji: '🟨', title: 'JavaScript پیشرفته',
    youtubeId: 'hdI2bqOjy3c', vimeoId: '76979871',
    mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videos: [
      { id: 'j1', title: 'ES6+ و قابلیت‌های مدرن',    duration: '۳۵:۲۰' },
      { id: 'j2', title: 'Closure و Scope',             duration: '۲۸:۴۵' },
      { id: 'j3', title: 'Async/Await و Promise',       duration: '۴۰:۱۵' },
      { id: 'j4', title: 'Prototype و OOP',              duration: '۳۸:۳۰' },
      { id: 'j5', title: 'Event Loop و محیط اجرا',      duration: '۳۲:۵۰' },
      { id: 'j6', title: 'الگوهای طراحی در JavaScript', duration: '۴۵:۱۰' },
    ],
  },
  {
    id: 'node', emoji: '🟢', title: 'Node.js و Express',
    youtubeId: 'fBNz5xF-Kx4', vimeoId: '76979871',
    mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videos: [
      { id: 'nd1', title: 'معرفی Node.js و npm',    duration: '۱۸:۳۰' },
      { id: 'nd2', title: 'ساخت سرور با Express',    duration: '۳۲:۴۵' },
      { id: 'nd3', title: 'RESTful API و Routing',   duration: '۴۰:۱۵' },
      { id: 'nd4', title: 'اتصال به MongoDB',         duration: '۳۵:۵۰' },
      { id: 'nd5', title: 'احراز هویت با JWT',        duration: '۴۵:۲۰' },
    ],
  },
  {
    id: 'ts', emoji: '💙', title: 'TypeScript از صفر',
    youtubeId: 'BwuLxPH8IDs', vimeoId: '76979871',
    mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    videos: [
      { id: 't1', title: 'انواع داده و Type Annotations', duration: '۲۵:۴۰' },
      { id: 't2', title: 'Interface و Type',               duration: '۳۰:۲۵' },
      { id: 't3', title: 'Generics',                       duration: '۳۵:۱۰' },
      { id: 't4', title: 'Decorators',                     duration: '۲۸:۵۵' },
      { id: 't5', title: 'TypeScript با React',             duration: '۴۰:۳۵' },
    ],
  },
  {
    id: 'tailwind', emoji: '🎨', title: 'Tailwind CSS و طراحی UI',
    youtubeId: 'dFgzHOX84xQ', vimeoId: '76979871',
    mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    videos: [
      { id: 'tw1', title: 'مفاهیم پایه و نصب',          duration: '۲۰:۱۵' },
      { id: 'tw2', title: 'Layout با Flexbox و Grid',    duration: '۳۵:۴۰' },
      { id: 'tw3', title: 'Responsive Design',           duration: '۲۸:۵۰' },
      { id: 'tw4', title: 'انیمیشن و Transitions',       duration: '۳۲:۲۰' },
      { id: 'tw5', title: 'Component Design System',     duration: '۴۵:۰۵' },
    ],
  },
];

const PROGRESS_DATA = {
  react:    { watched: 3, total: 6 },
  nextjs:   { watched: 2, total: 5 },
  js:       { watched: 5, total: 6 },
  node:     { watched: 1, total: 5 },
  ts:       { watched: 0, total: 5 },
  tailwind: { watched: 4, total: 5 },
};

function ProgressBar({ pct }) {
  return (
    <div className="mc-progress-wrap">
      <div className="mc-progress-bar">
        <div className="mc-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="mc-progress-label">{pct}٪</span>
    </div>
  );
}

function CourseBlock({ course, onVideoClick }) {
  const [open, setOpen] = useState(false);
  const prog = PROGRESS_DATA[course.id] || { watched: 0, total: course.videos.length };
  const pct  = Math.round((prog.watched / prog.total) * 100);

  return (
    <div className={`mc-course ${open ? 'mc-open' : ''}`}>
      <button className="mc-course-header" onClick={() => setOpen(!open)}>
        <span className="mc-emoji">{course.emoji}</span>
        <div className="mc-course-meta">
          <span className="mc-course-title">{course.title}</span>
          <span className="mc-course-count">{course.videos.length} درس ویدیویی</span>
          <ProgressBar pct={pct} />
        </div>
        <div className="mc-header-right">
          {pct === 100 && <span className="mc-cert-badge">🏆 تمام‌شده</span>}
          <span className="mc-chevron">{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <ul className="mc-video-list">
          {course.videos.map((v, i) => (
            <li key={v.id} className={`mc-video-item ${i < prog.watched ? 'mc-watched' : ''}`}
                onClick={() => onVideoClick({ ...v, youtubeId: course.youtubeId,
                                              vimeoId: course.vimeoId, mp4Url: course.mp4Url })}>
              <span className="mc-num">{i < prog.watched ? '✓' : i + 1}</span>
              <span className="mc-vtitle">{v.title}</span>
              <span className="mc-dur">{v.duration}</span>
              <span className="mc-play">▶</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MyCourses({ currentUser, onBack }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const purchases = getUserPurchases(currentUser?.username || '');
  const hasPurchase = purchases.length > 0;

  return (
    <main className="mc-page" dir="rtl">
      {/* Page header */}
      <div className="mc-header">
        <div>
          <h1 className="mc-page-title">دوره‌های من</h1>
          <p className="mc-page-sub">
            {hasPurchase
              ? `${COURSES_DATA.length} دوره در دسترس شما`
              : 'هنوز دوره‌ای خریداری نکرده‌اید'}
          </p>
        </div>
        <button className="mc-back-btn" onClick={onBack}>← بازگشت به سایت</button>
      </div>

      {hasPurchase ? (
        <div className="mc-courses-list">
          {COURSES_DATA.map(course => (
            <CourseBlock key={course.id} course={course} onVideoClick={setActiveVideo} />
          ))}
        </div>
      ) : (
        <div className="mc-empty">
          <span className="mc-empty-icon">🎓</span>
          <p>برای دسترسی به ویدیوها، ابتدا یک دوره خریداری کنید.</p>
          <button className="mc-back-btn" onClick={onBack}>مشاهده دوره‌ها</button>
        </div>
      )}

      {activeVideo && (
        <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </main>
  );
}
