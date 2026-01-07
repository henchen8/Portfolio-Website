import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useLayoutEffect, useCallback, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import RubiksCubeProject from './pages/RubiksCubeProject';
import FinancialDerivativesProject from './pages/FinancialDerivativesProject';
import FitBoxProject from './pages/FitBoxProject';
import portemailicon from './assets/portemailicon.png';
import linkedinLogo from './assets/Remove White Background.png';

function ScrollToTop({ loading, onScrollReady }) {
  const { pathname, hash } = useLocation();
  const hasHandledReturn = useRef(false);

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
    // This must be checked BEFORE any other scroll logic to prevent scroll to top
    const returnToHome = sessionStorage.getItem('returnToHome') === 'true';
    
    // Reset the ref when navigating away from home or when not returning
    if (pathname !== '/') {
      hasHandledReturn.current = false;
    }
    
    // If returning to home (with or without hash), handle it specially
    if (returnToHome && pathname === '/') {
      // Mark that we've handled this return to prevent other scroll logic from running
      hasHandledReturn.current = true;
      
      // Remove flag immediately to prevent multiple executions
      sessionStorage.removeItem('returnToHome');
      
      // Try to calculate and set scroll position immediately if DOM is ready
      // This prevents the blink to top that happens during navigation
      const section = document.getElementById('projects');
      if (section) {
        // Try immediate calculation - if layout is ready, this will work
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.height > 0) {
          // DOM is ready, calculate and set position immediately
          const sectionTop = sectionRect.top + window.pageYOffset;
          const viewportHeight = window.innerHeight;
          const sectionHeight = sectionRect.height;
          
          const targetScroll = sectionTop + sectionHeight - viewportHeight + 100;
          const pageHeight = document.documentElement.scrollHeight;
          const distanceFromBottom = pageHeight - (sectionTop + sectionHeight);
          
          const scrollPosition = distanceFromBottom < 200 
            ? pageHeight - viewportHeight
            : Math.max(0, targetScroll);
          
          // Set immediately to prevent any intermediate scroll
          window.scrollTo({
            top: scrollPosition,
            behavior: 'auto'
          });
          
          onScrollReady?.();
          return; // Don't continue to other scroll logic
        }
      }
      
      // If DOM not ready yet, wait for it but prevent scroll to top
      // by maintaining current position or a safe position
      const currentScroll = window.scrollY;
      const safePosition = currentScroll > 0 ? currentScroll : Math.max(500, window.innerHeight);
      window.scrollTo(0, safePosition);
      
      // Wait for page to be fully rendered before scrolling to final position
      const performScroll = () => {
        const section = document.getElementById('projects');
        if (section) {
          // Force layout recalculation
          section.getBoundingClientRect();
          
          // Wait one more frame to ensure all layout calculations are complete
          requestAnimationFrame(() => {
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top + window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const sectionHeight = sectionRect.height;
            
            const targetScroll = sectionTop + sectionHeight - viewportHeight + 100;
            const pageHeight = document.documentElement.scrollHeight;
            const distanceFromBottom = pageHeight - (sectionTop + sectionHeight);
            
            const scrollPosition = distanceFromBottom < 200 
              ? pageHeight - viewportHeight
              : Math.max(0, targetScroll);
            
            // Use instant scroll (no smooth behavior) to prevent any intermediate positions
            window.scrollTo({
              top: scrollPosition,
              behavior: 'auto'
            });
          });
        }
      };
      
      // Use multiple RAFs to ensure DOM is ready and images are loaded
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            performScroll();
            onScrollReady?.();
          });
        });
      });
      return; // Don't continue to other scroll logic
    } else if (hash === '#projects' && pathname === '/') {
      // Handle hash navigation to projects section
      // Check if this is a return from project page (even if returnToHome wasn't caught earlier)
      const wasReturning = sessionStorage.getItem('returnToHome') === 'true' || hasHandledReturn.current;
      if (wasReturning) {
        sessionStorage.removeItem('returnToHome');
        hasHandledReturn.current = true;
      }
      
      const section = document.getElementById('projects');
      if (section) {
        // If returning from project page, use the same logic as returnToHome
        if (wasReturning) {
          const sectionRect = section.getBoundingClientRect();
          const sectionTop = sectionRect.top + window.pageYOffset;
          const viewportHeight = window.innerHeight;
          const sectionHeight = sectionRect.height;
          const targetScroll = sectionTop + sectionHeight - viewportHeight + 100;
          const pageHeight = document.documentElement.scrollHeight;
          const distanceFromBottom = pageHeight - (sectionTop + sectionHeight);
          const scrollPosition = distanceFromBottom < 200 
            ? pageHeight - viewportHeight
            : Math.max(0, targetScroll);
          window.scrollTo({
            top: scrollPosition,
            behavior: 'auto'
          });
        } else {
          // Normal hash navigation
          const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition + 300;
          window.scrollTo(0, offsetPosition);
        }
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
      // Navigating to a project page - scroll to 83px (8px lower than before)
      window.scrollTo(0, 83);
    } else if (!hash && pathname === '/') {
      // Navigating to home page without hash - scroll to top
      // BUT only if not returning from a project page
      // Check returnToHome again here in case useLayoutEffect runs before hash is processed
      const stillReturning = sessionStorage.getItem('returnToHome') === 'true';
      if (!stillReturning && !hasHandledReturn.current) {
        window.scrollTo(0, 0);
      }
    }
    
    // Signal that scroll is ready
    onScrollReady?.();
  }, [pathname, hash, loading, onScrollReady]);

  return null;
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/roboiconimg.png" alt="Logo" className="logo-icon" />
          Henry Chen
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/#experience" className="nav-link">Experience</Link>
          </li>
          <li className="nav-item">
            <Link to="/#projects" className="nav-link">Projects</Link>
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
              <img src={portemailicon} alt="Email" className="email-icon-img" />
            </a>
            <a 
              href="https://linkedin.com/in/henry-w-chen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-icon"
              aria-label="LinkedIn Profile"
            >
              <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon-img" />
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
    
    // Preload all critical assets during loading screen
    // This ensures content is ready when user quickly scrolls or clicks on projects
    // Since all components are now eagerly loaded (no lazy loading), their bundled assets
    // will be included in the initial bundle and load with the page.
    // Here we preload the video file which is in the public folder.
    const preloadAssets = () => {
      // Preload video for RubiksCubeProject (public folder asset)
      const videoLink = document.createElement('link');
      videoLink.rel = 'preload';
      videoLink.as = 'video';
      videoLink.href = '/rubik_solve_vid0.mov';
      document.head.appendChild(videoLink);
      
      // Also preload video using video element for better browser support
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = '/rubik_solve_vid0.mov';
    };

    // Start preloading immediately
    preloadAssets();
    
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
            <Route path="/projects/fitbox" element={<FitBoxProject />} />
          </Routes>
          <Footer />
          <Analytics />
        </div>
      </Router>
    </>
  );
}

export default App;
