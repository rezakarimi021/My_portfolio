import { useState } from 'react';
import './BlogPage.css';

const POSTS = [
  { id:1, title:'آشنایی با React 19 و قابلیت‌های جدید', excerpt:'در این مقاله به بررسی تغییرات مهم React 19 از جمله Server Actions، بهبود Suspense و کامپوننت‌های جدید می‌پردازیم.', date:'۱۴۰۳/۰۳/۱۵', views:1250, readTime:8, category:'React', author:'غلامرضا کریمی‌پور', emoji:'⚛️', gradient:'linear-gradient(135deg,#0ea5e9,#6366f1)' },
  { id:2, title:'بهترین روش‌های بهینه‌سازی عملکرد JavaScript', excerpt:'یاد بگیرید چطور با Lazy Loading، Code Splitting و بهینه‌سازی حلقه‌ها، سرعت سایت خود را چند برابر کنید.', date:'۱۴۰۳/۰۳/۰۸', views:980, readTime:12, category:'JavaScript', author:'غلامرضا کریمی‌پور', emoji:'🟨', gradient:'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { id:3, title:'راهنمای کامل TypeScript برای توسعه‌دهندگان JavaScript', excerpt:'اگر JavaScript می‌دانید و می‌خواهید TypeScript یاد بگیرید، این مقاله نقطه شروع ایده‌ال شماست.', date:'۱۴۰۳/۰۲/۲۸', views:2100, readTime:15, category:'TypeScript', author:'غلامرضا کریمی‌پور', emoji:'💙', gradient:'linear-gradient(135deg,#3b82f6,#1d4ed8)' },
  { id:4, title:'Next.js 14 App Router: از صفر تا پیشرفته', excerpt:'App Router جدید Next.js یک تحول بزرگ در توسعه React بود. در این مقاله همه چیز را از صفر یاد می‌گیرید.', date:'۱۴۰۳/۰۲/۱۵', views:1800, readTime:20, category:'Next.js', author:'غلامرضا کریمی‌پور', emoji:'🔷', gradient:'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { id:5, title:'Node.js چیست و چرا باید یاد بگیریم؟', excerpt:'Node.js به توسعه‌دهندگان JavaScript اجازه می‌دهد که سرور‌ساید بنویسند. در این مقاله مفاهیم پایه را توضیح می‌دهیم.', date:'۱۴۰۳/۰۲/۰۱', views:750, readTime:7, category:'Node.js', author:'غلامرضا کریمی‌پور', emoji:'🟢', gradient:'linear-gradient(135deg,#10b981,#059669)' },
  { id:6, title:'طراحی UI با Tailwind CSS: نکات حرفه‌ای', excerpt:'Tailwind CSS یکی از محبوب‌ترین فریمورک‌های CSS است. در این مقاله نکات پیشرفته‌ای که باید بدانید را بررسی می‌کنیم.', date:'۱۴۰۳/۰۱/۲۰', views:1450, readTime:10, category:'CSS', author:'غلامرضا کریمی‌پور', emoji:'🎨', gradient:'linear-gradient(135deg,#06b6d4,#0284c7)' },
];

const CATEGORIES = ['همه', 'React', 'JavaScript', 'TypeScript', 'Next.js', 'Node.js', 'CSS'];

function PostCard({ post }) {
  return (
    <article className="bp-card glass-card">
      <div className="bp-thumb" style={{ background: post.gradient }}>
        <span className="bp-emoji">{post.emoji}</span>
        <span className="bp-category">{post.category}</span>
      </div>
      <div className="bp-body">
        <h3 className="bp-title">{post.title}</h3>
        <p className="bp-excerpt">{post.excerpt}</p>
        <div className="bp-footer">
          <div className="bp-meta">
            <span>✍️ {post.author}</span>
            <span>· {post.date}</span>
            <span>· 👁 {post.views.toLocaleString('fa-IR')}</span>
          </div>
          <div className="bp-meta">
            <span>⏱ {post.readTime} دقیقه مطالعه</span>
          </div>
        </div>
        <button className="bp-read-btn">مطالعه بیشتر →</button>
      </div>
    </article>
  );
}

export default function BlogPage({ onBack }) {
  const [active, setActive] = useState('همه');
  const [search, setSearch] = useState('');

  const filtered = POSTS.filter(p => {
    const matchCat = active === 'همه' || p.category === active;
    const matchSearch = !search || p.title.includes(search) || p.excerpt.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <main className="bp-page" dir="rtl">
      <div className="bp-header">
        <div className="bp-header-content">
          <button className="bp-back" onClick={onBack}>← بازگشت</button>
          <h1 className="bp-page-title">وبلاگ و مجله آموزشی</h1>
          <p className="bp-page-sub">آخرین مقالات و آموزش‌های رایگان برنامه‌نویسی</p>
          <div className="bp-search-wrap">
            <input
              className="bp-search"
              placeholder="جستجو در مقالات…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bp-content">
        <div className="bp-filters">
          {CATEGORIES.map(c => (
            <button key={c} className={`bp-filter-btn ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="bp-grid">
          {filtered.map(p => <PostCard key={p.id} post={p} />)}
          {filtered.length === 0 && (
            <div className="bp-empty">هیچ مقاله‌ای پیدا نشد 📝</div>
          )}
        </div>
      </div>
    </main>
  );
}
