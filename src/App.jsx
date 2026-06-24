import { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import { useAuth }   from './context/AuthContext';
import { useToast }  from './context/ToastContext';
import { useLocale } from './hooks/useLocale';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Skills    from './components/Skills';
import Projects  from './components/Projects';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

const Cart              = lazy(() => import('./components/Cart'));
const Checkout          = lazy(() => import('./components/Checkout'));
const MyCourses         = lazy(() => import('./components/MyCourses'));
const AdminPanel        = lazy(() => import('./components/AdminPanel'));
const AdminStatsBar     = lazy(() => import('./components/AdminStatsBar'));
const CourseDetailModal = lazy(() => import('./components/CourseDetailModal'));
const BlogPage          = lazy(() => import('./components/BlogPage'));
const EventsPage        = lazy(() => import('./components/EventsPage'));
const StudentGallery    = lazy(() => import('./components/StudentGallery'));
const InstructorsPage   = lazy(() => import('./components/InstructorsPage'));
const ProfilePage       = lazy(() => import('./components/ProfilePage'));
const SearchModal       = lazy(() => import('./components/SearchModal'));

const Spinner = () => (
  <div className="app-spinner">
    <div className="app-spinner-ring" />
  </div>
);

export default function App() {
  const { isAdmin } = useAuth();
  const { toast }   = useToast();
  const { t }       = useLocale();

  const [theme,          setTheme]          = useState(() => localStorage.getItem('theme') || 'light');
  const [cartQty,        setCartQty]        = useState(0);
  const [cartOpen,       setCartOpen]       = useState(false);
  const [checkoutOpen,   setCheckoutOpen]   = useState(false);
  const [page,           setPage]           = useState('site');
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [courseDetailId, setCourseDetailId] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const handleBuy = () => {
    setCartQty(q => q + 1);
    setCartOpen(true);
    toast(t('app.toastCartAdded'), 'success', 2400);
  };

  const handlePurchaseSuccess = () => {
    setCheckoutOpen(false);
    setCartQty(0);
    setPage('my-courses');
    toast(t('app.toastPurchaseSuccess'), 'success', 4500);
  };

  const navbarProps = {
    theme,
    toggleTheme,
    cartQty,
    onCartOpen:   () => setCartOpen(true),
    onSearchOpen: () => setSearchOpen(true),
    onBlogClick:  () => setPage('blog'),
    onEventsClick: () => setPage('events'),
  };

  if (page === 'my-courses') {
    return (
      <>
        <Navbar {...navbarProps} />
        <Suspense fallback={<Spinner />}>
          <MyCourses onBack={() => setPage('site')} />
        </Suspense>
      </>
    );
  }

  if (page === 'admin' && isAdmin) {
    return (
      <>
        <Navbar {...navbarProps} />
        <Suspense fallback={<Spinner />}>
          <AdminPanel onClose={() => setPage('site')} />
        </Suspense>
      </>
    );
  }

  if (page === 'blog') {
    return (
      <>
        <Navbar {...navbarProps} />
        <Suspense fallback={<Spinner />}>
          <BlogPage onBack={() => setPage('site')} />
        </Suspense>
      </>
    );
  }

  if (page === 'events') {
    return (
      <>
        <Navbar {...navbarProps} />
        <Suspense fallback={<Spinner />}>
          <EventsPage onBack={() => setPage('site')} />
        </Suspense>
      </>
    );
  }

  if (page === 'gallery') {
    return (
      <>
        <Navbar {...navbarProps} />
        <Suspense fallback={<Spinner />}>
          <StudentGallery onBack={() => setPage('site')} />
        </Suspense>
      </>
    );
  }

  if (page === 'instructors') {
    return (
      <>
        <Navbar {...navbarProps} />
        <Suspense fallback={<Spinner />}>
          <InstructorsPage onBack={() => setPage('site')} />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Navbar {...navbarProps} />

      {isAdmin && (
        <Suspense fallback={null}>
          <AdminStatsBar />
        </Suspense>
      )}

      <Hero />
      <About />
      <Skills />
      <Projects onBuy={handleBuy} onViewDetail={(id) => setCourseDetailId(id)} />
      <Contact />
      <Footer
        onBlogClick={() => setPage('blog')}
        onEventsClick={() => setPage('events')}
        onGalleryClick={() => setPage('gallery')}
        onInstructorsClick={() => setPage('instructors')}
      />

      {cartOpen && (
        <Suspense fallback={null}>
          <Cart
            qty={cartQty}
            onClose={() => setCartOpen(false)}
            onIncrease={() => setCartQty(q => q + 1)}
            onDecrease={() => setCartQty(q => Math.max(0, q - 1))}
            onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
          />
        </Suspense>
      )}

      {checkoutOpen && (
        <Suspense fallback={null}>
          <Checkout
            qty={cartQty}
            onClose={() => setCheckoutOpen(false)}
            onSuccess={handlePurchaseSuccess}
          />
        </Suspense>
      )}

      {courseDetailId && (
        <Suspense fallback={null}>
          <CourseDetailModal
            courseId={courseDetailId}
            onClose={() => setCourseDetailId(null)}
            onBuy={handleBuy}
          />
        </Suspense>
      )}

      {searchOpen && (
        <Suspense fallback={null}>
          <SearchModal
            onClose={() => setSearchOpen(false)}
            onBuy={handleBuy}
          />
        </Suspense>
      )}
    </>
  );
}
