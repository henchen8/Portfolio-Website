import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useLayoutEffect, useCallback, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import RubiksCubeProject from './pages/RubiksCubeProject';
import FinancialDerivativesProject from './pages/FinancialDerivativesProject';
import FitBoxProject from './pages/FitBoxProject';
import portemailicon from './assets/portemailicon.png';
import linkedinLogo from './assets/Remove White Background.png';

// Import all images for preloading
import profileImage from './assets/profile1.jpeg';
import rubiksImage from './assets/rubiks1.jpeg';
import srprojImage from './assets/portsrproj3.png';
import fitboxImage from './assets/FitBoxlogo.png';
import rubiksAssembly from './assets/rubiks_assembly7.png';
import rubiksDrawing from './assets/1rubiksdrawing.png';
import rubiksGUI from './assets/websiterubiksimg1.png';
import tmcDriver from './assets/TMC2209V2.0.png';
import nema17 from './assets/PORTFOLIONEMA17.png';
import arduinoMega from './assets/PORTarduinomega.png';
import srprojImageDetailed from './assets/Capture-2026-01-01-134649.png';
import blackscholesImage from './assets/blackscholes.png';
import simplifiedBlackscholesImage from './assets/port_simplifiedblackscholes.png';
import famafrenchImage from './assets/portfamafrench.png';
import explosionDrawing from './assets/website_m&tsi explosion drawing.png';

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
    }
    
    // Check for navigation target hash from sessionStorage (set by navbar when navigating from other pages)
    const navTargetHash = sessionStorage.getItem('navTargetHash');
    if (navTargetHash && pathname === '/') {
      sessionStorage.removeItem('navTargetHash');
      // Handle the navigation target directly
      const targetHash = navTargetHash;
      if (targetHash === '#projects') {
        const section = document.getElementById('projects');
        if (section) {
          // Wait for DOM to be ready
          requestAnimationFrame(() => {
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
              window.scrollTo({
                top: scrollPosition,
                behavior: 'auto'
              });
              // Set hash after scrolling
              window.location.hash = targetHash;
              onScrollReady?.();
            });
          });
        } else {
          onScrollReady?.();
        }
        return;
      } else if (targetHash === '#experience') {
        const section = document.getElementById('experience');
        if (section) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition + 55;
              window.scrollTo(0, offsetPosition);
              // Set hash after scrolling
              window.location.hash = targetHash;
              onScrollReady?.();
            });
          });
        } else {
          onScrollReady?.();
        }
        return;
      }
    }
    
    if (hash === '#projects' && pathname === '/') {
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home and set hash
    if (location.pathname !== '/') {
      // Store the target hash in sessionStorage so ScrollToTop can handle it
      sessionStorage.setItem('navTargetHash', hash);
      // Navigate to home page - ScrollToTop will handle the hash
      navigate('/');
    } else {
      // Already on home page, update hash and scroll
      window.location.hash = hash;
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const section = document.getElementById(hash.substring(1));
          if (section) {
            if (hash === '#projects') {
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
                behavior: 'smooth'
              });
            } else if (hash === '#experience') {
              const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition + 55;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
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
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <a href="/#experience" className="nav-link" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a>
          </li>
          <li className="nav-item">
            <a href="/#projects" className="nav-link" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
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
          <p>&copy; 2026 Henry Chen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollReady, setScrollReady] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const loadingScreenRef = useRef(null);

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

  // Ensure loading screen is painted before starting animations
  useLayoutEffect(() => {
    if (loading && loadingScreenRef.current) {
      // Use double requestAnimationFrame to ensure element is painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationReady(true);
        });
      });
    } else if (!loading) {
      setAnimationReady(false);
    }
  }, [loading]);

  useEffect(() => {
    // Always show loading screen on mount (page load/refresh)
    // This ensures consistent loading experience regardless of which page user refreshes from
    document.body.classList.add('loading');
    document.documentElement.classList.add('loading');
    
    // Comprehensive asset preloading function
    const preloadAllAssets = () => {
      // List of all images used across all pages (using imported references)
      const allImages = [
        // Home page images
        profileImage,
        rubiksImage,
        srprojImage,
        fitboxImage,
        rubiksAssembly,
        // RubiksCubeProject images
        rubiksDrawing,
        rubiksGUI,
        tmcDriver,
        nema17,
        arduinoMega,
        // FinancialDerivativesProject images
        srprojImageDetailed,
        blackscholesImage,
        simplifiedBlackscholesImage,
        famafrenchImage,
        // FitBoxProject images
        explosionDrawing,
      ];

      // Preload all images efficiently
      const imagePromises = allImages.map((src, index) => {
        return new Promise((resolve) => {
          // Use Image object with decode for modern browsers (more efficient)
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to not block
          // Set fetchpriority for critical images
          if (index < 5 && 'fetchPriority' in img) {
            img.fetchPriority = 'high';
          }
          img.src = src;
          
          // Use decode API if available for better performance
          if (img.decode) {
            img.decode().then(resolve).catch(() => {
              // Fallback to onload if decode fails
              if (img.complete) resolve();
            });
          }
        });
      });

      // Preload video for RubiksCubeProject with multiple strategies
      const videoPromises = [
        new Promise((resolve) => {
          // Use link preload for video
          const videoLink = document.createElement('link');
          videoLink.rel = 'preload';
          videoLink.as = 'video';
          videoLink.href = '/rubik_solve_vid0.mov';
          videoLink.crossOrigin = 'anonymous';
          document.head.appendChild(videoLink);
          resolve();
        }),
        new Promise((resolve) => {
          // Also preload using video element for better browser support
          const video = document.createElement('video');
          video.preload = 'auto';
          video.muted = true; // Muted videos load faster
          video.src = '/rubik_solve_vid0.mov';
          video.onloadeddata = () => resolve();
          video.oncanplaythrough = () => resolve();
          video.onerror = () => resolve(); // Resolve even on error to not block
          // Trigger loading by setting preload
          video.load();
          // Timeout fallback
          setTimeout(() => resolve(), 5000);
        })
      ];

      // Wait for all assets to load (don't block on slow assets)
      return Promise.allSettled([...imagePromises, ...videoPromises]);
    };

    // Add resource hints for all routes during loading
    const addResourceHints = () => {
      const routes = [
        '/projects/rubiks-cube',
        '/projects/financial-derivatives',
        '/projects/fitbox'
      ];
      
      routes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        link.as = 'document';
        document.head.appendChild(link);
      });
    };

    // Start comprehensive preloading
    const preloadPromise = preloadAllAssets();
    
    // Add resource hints immediately
    addResourceHints();
    
    // Save scroll position and set refresh flag before page unloads
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      sessionStorage.setItem('pageRefresh', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Hide loading screen after animation completes AND assets are loaded
    // Animation starts after animation-ready class is added (~33ms delay from double RAF)
    // Animation duration: 1.35s, fadeOut starts at 1.4s, fadeOut duration: 0.2s
    // Total: ~1.6s minimum, using 1.65s to ensure animation fully completes
    Promise.all([
      preloadPromise.then(() => Promise.resolve()),
      new Promise(resolve => setTimeout(resolve, 1650)) // Minimum animation time + buffer
    ]).then(() => {
      setLoading(false);
    });

    return () => {
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
        <div 
          ref={loadingScreenRef}
          className={`loading-screen ${animationReady ? 'animation-ready' : ''}`} 
          key="app-loading-screen"
        >
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
