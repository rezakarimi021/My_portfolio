import { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import { getCurrentUser } from './utils/auth';
import { useAuth }        from './context/AuthContext';
import { useToast }       from './context/ToastContext';
import { useLocale }      from './hooks/useLocale';
import LoginPage     from './components/LoginPage';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import ProductSlider from './components/ProductSlider';
import About         from './components/About';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Books         from './components/Books';
import Testimonials  from './components/Testimonials';
import Compare       from './components/Compare';
import Course        from './components/Course';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import Cart          from './components/Cart';

const Checkout      = lazy(() => import('./components/Checkout'));
const MyCourses     = lazy(() => import('./components/MyCourses'));
const AdminPanel    = lazy(() => import('./components/AdminPanel'));
const AdminStatsBar = lazy(() => import('./components/AdminStatsBar'));
const BookCheckout  = lazy(() => import('./components/BookCheckout'));

const Spinner = () => (
  <div className="app-spinner">
    <div className="app-spinner-ring" />
  </div>
);

function WelcomeDialog({ name }) {
  const { t } = useLocale();
  return (
    <div className="wd-overlay">
      <div className="wd-box">
        <div className="wd-stars">✦ ✦ ✦</div>
        <div className="wd-wave">👋</div>
        <p className="wd-greeting">{t('app.welcomeGreeting')}</p>
        <p className="wd-name">{name}</p>
        <p className="wd-sub">{t('app.welcomeSub')}</p>
        <div className="wd-stars wd-stars--bottom">✦ ✦ ✦</div>
      </div>
    </div>
  );
}

export default function App() {
  const { user, isLoggedIn, isAdmin, login } = useAuth();
  const { toast } = useToast();
  const { t } = useLocale();

  const [welcomeName,      setWelcomeName]      = useState('');
  const [welcomeKey,       setWelcomeKey]        = useState(0);
  const [theme,            setTheme]             = useState(() => localStorage.getItem('theme') || 'light');
  const [cartQty,          setCartQty]           = useState(0);
  const [cartOpen,         setCartOpen]          = useState(false);
  const [checkoutOpen,     setCheckoutOpen]      = useState(false);
  const [page,             setPage]              = useState('site');
  const [selectedBook,     setSelectedBook]      = useState(null);
  const [bookCheckoutOpen, setBookCheckoutOpen]  = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setPage('site');
      setCartQty(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && user) {
      triggerWelcome(user.fullName || user.username);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const triggerWelcome = (name) => {
    setWelcomeName(name || 'کاربر عزیز');
    setWelcomeKey(k => k + 1);
    setTimeout(() => setWelcomeName(''), 4000);
  };

  const handleLogin = () => {
    login();
    const u = getCurrentUser();
    if (u) triggerWelcome(u.fullName || u.username);
    setPage('site');
  };

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

  const handleBookOrder = (book) => {
    setSelectedBook(book);
    setBookCheckoutOpen(true);
  };

  const handleBookOrderSuccess = () => {
    setBookCheckoutOpen(false);
    setSelectedBook(null);
    toast(t('app.toastBookOrdered'), 'success', 4500);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navbarProps = {
    theme,
    toggleTheme,
    cartQty,
    onCartOpen:       () => setCartOpen(true),
    onMyCoursesClick: () => setPage('my-courses'),
    onAdminClick:     () => setPage('admin'),
  };

  const dialog = welcomeName
    ? <WelcomeDialog key={welcomeKey} name={welcomeName} />
    : null;

  if (page === 'my-courses') {
    return (
      <>
        <Navbar {...navbarProps} />
        <Suspense fallback={<Spinner />}>
          <MyCourses currentUser={user} onBack={() => setPage('site')} />
        </Suspense>
        {dialog}
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

  return (
    <>
      <Navbar {...navbarProps} />

      {isAdmin && (
        <Suspense fallback={null}>
          <AdminStatsBar />
        </Suspense>
      )}

      <Hero />
      <ProductSlider />
      <About />
      <Skills />
      <Books onOrder={handleBookOrder} />
      <Projects onBuy={handleBuy} />
      <Testimonials />
      <Compare />
      <Course onBuy={handleBuy} />
      <Contact />
      <Footer />

      {cartOpen && (
        <Cart
          qty={cartQty}
          onClose={() => setCartOpen(false)}
          onIncrease={() => setCartQty(q => q + 1)}
          onDecrease={() => setCartQty(q => Math.max(0, q - 1))}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
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

      {bookCheckoutOpen && selectedBook && (
        <Suspense fallback={null}>
          <BookCheckout
            book={selectedBook}
            onClose={() => { setBookCheckoutOpen(false); setSelectedBook(null); }}
            onSuccess={handleBookOrderSuccess}
          />
        </Suspense>
      )}

      {dialog}
    </>
  );
}
