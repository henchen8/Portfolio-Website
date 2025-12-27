import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useLayoutEffect, useCallback, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import RubiksCubeProject from './pages/RubiksCubeProject';
import FinancialDerivativesProject from './pages/FinancialDerivativesProject';
// Lazy load FitBoxProject to prevent it from blocking the loading screen
const FitBoxProject = lazy(() => import('./pages/FitBoxProject'));

function ScrollToTop({ loading, onScrollReady }) {
  const { pathname, hash } = useLocation();

  // Use useLayoutEffect for synchronous scroll positioning BEFORE paint
  useLayoutEffect(() => {
    // Don't scroll during loading animation
    if (loading) return;
    
    // Remove position:fixed BEFORE setting scroll to allow scrollTo to work
    document.body.classList.remove('loading');
    document.documentElement.classList.remove('loading');
    
    // Check if this is a page refresh (not navigation)
    const isPageRefresh = sessionStorage.getItem('pageRefresh') === 'true';
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    
    if (isPageRefresh && savedScrollPosition) {
      // Restore scroll position after refresh - synchronously before paint
      window.scrollTo(0, parseInt(savedScrollPosition));
      sessionStorage.removeItem('pageRefresh');
      sessionStorage.removeItem('scrollPosition');
      // Signal that scroll is ready
      onScrollReady?.();
      return;
    }
    
    // Check if we're returning to home from a project page
    const returnToHome = sessionStorage.getItem('returnToHome') === 'true';
    
    if (returnToHome && pathname === '/') {
      sessionStorage.removeItem('returnToHome');
      
      // Scroll to projects section with same offset as "My Projects" button
      const section = document.getElementById('projects');
      if (section) {
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + 300;
        window.scrollTo(0, offsetPosition);
      }
    } else if (hash === '#projects' && pathname === '/') {
      // Handle hash navigation to projects section
      const section = document.getElementById('projects');
      if (section) {
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + 300;
        window.scrollTo(0, offsetPosition);
      }
    } else if (hash === '#experience' && pathname === '/') {
      // Handle hash navigation to experience section
      const section = document.getElementById('experience');
      if (section) {
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + 55;
        window.scrollTo(0, offsetPosition);
      }
    } else if (!hash && pathname !== '/') {
      // Navigating to a project page - scroll to 90px
      window.scrollTo(0, 90);
    } else if (!hash && pathname === '/') {
      // Navigating to home page without hash - scroll to top
      window.scrollTo(0, 0);
    }
    
    // Signal that scroll is ready
    onScrollReady?.();
  }, [pathname, hash, loading, onScrollReady]);

  return null;
}

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      if (sectionId === 'projects') {
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + 300;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else if (sectionId === 'experience') {
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + 55;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/roboiconimg.png" alt="Logo" className="logo-icon" />
          Henry Chen
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            {isHomePage ? (
              <a href="#home" className="nav-link">Home</a>
            ) : (
              <Link to="/" className="nav-link">Home</Link>
            )}
          </li>
          <li className="nav-item">
            {isHomePage ? (
              <a href="#experience" className="nav-link" onClick={(e) => {
                e.preventDefault();
                scrollToSection('experience');
              }}>Experience</a>
            ) : (
              <Link to="/#experience" className="nav-link">Experience</Link>
            )}
          </li>
          <li className="nav-item">
            {isHomePage ? (
              <a href="#projects" className="nav-link" onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}>Projects</a>
            ) : (
              <Link to="/#projects" className="nav-link">Projects</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/roboiconimg.png" alt="Logo" className="footer-logo-img" />
          </div>
          <div className="footer-social">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=henwchen@gmail.com&su="
              target="_blank"
              rel="noopener noreferrer"
              className="email-icon"
              aria-label="Send Email via Gmail"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/henry-w-chen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-icon"
              aria-label="LinkedIn Profile"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <p>&copy; 2025 Henry Chen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollReady, setScrollReady] = useState(false);

  // Immediately restore scroll position on mount (before paint) for page refresh
  useLayoutEffect(() => {
    const isPageRefresh = sessionStorage.getItem('pageRefresh') === 'true';
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    
    if (isPageRefresh && savedScrollPosition) {
      // Immediately set scroll position before anything renders
      window.scrollTo(0, parseInt(savedScrollPosition));
    } else {
      // Fresh navigation - scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // Always show loading screen on mount (page load/refresh)
    // This ensures consistent loading experience regardless of which page user refreshes from
    document.body.classList.add('loading');
    document.documentElement.classList.add('loading');
    
    // Save scroll position and set refresh flag before page unloads
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      sessionStorage.setItem('pageRefresh', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Hide loading screen after animation (1.35s animation + 0.2s fadeout = 1.55s)
    // Note: body.loading class is removed in ScrollToTop's useLayoutEffect to ensure
    // scroll position is set BEFORE position:fixed is removed (prevents flash)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1550);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('loading');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Mark scroll as ready once loading completes and scroll position is set
  const handleScrollReady = useCallback(() => {
    setScrollReady(true);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const navbar = document.querySelector('.navbar');
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          
          // Navbar hide/show logic with larger buffer
          if (navbar && scrollDifference > 10) { // Only trigger if scrolled more than 10px
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
              // Scrolling down and past 150px - hide navbar
              navbar.classList.add('navbar-hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
              // Scrolling up OR near top - show navbar
              navbar.classList.remove('navbar-hidden');
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Loading screen - rendered outside Router to ensure it always shows consistently on all pages */}
      {loading && (
        <div className="loading-screen" key="app-loading-screen">
          <div className="loading-content">
            <div className="loading-logo-container">
              <div 
                className="loading-logo-overlay"
                style={{
                  WebkitMaskImage: 'url(/roboiconimg.png)',
                  maskImage: 'url(/roboiconimg.png)'
                }}
              ></div>
            </div>
            <div className="loading-bar-container">
              <div className="loading-bar"></div>
            </div>
          </div>
        </div>
      )}
      <Router>
        <ScrollToTop loading={loading} onScrollReady={handleScrollReady} />
        <div className={`App ${loading ? 'app-loading' : ''} ${!loading && !scrollReady ? 'app-scroll-pending' : ''}`}>
          <div className="scroll-background"></div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/rubiks-cube" element={<RubiksCubeProject />} />
            <Route path="/projects/financial-derivatives" element={<FinancialDerivativesProject />} />
            <Route 
              path="/projects/fitbox" 
              element={
                <Suspense fallback={null}>
                  <FitBoxProject />
                </Suspense>
              } 
            />
          </Routes>
          <Footer />
          <Analytics />
        </div>
      </Router>
    </>
  );
}

export default App;
