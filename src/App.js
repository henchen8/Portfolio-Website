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

// Homepage slideshow images - preload these for hero section
import webport1 from './assets/homepage/webport1.png';
import webport2 from './assets/homepage/webport2.png';
import webport3 from './assets/homepage/webport3.png';
import webport4 from './assets/homepage/webport4.png';
import webport5 from './assets/homepage/webport5.png';
import webport6 from './assets/homepage/webport6.png';
import webport7 from './assets/homepage/webport7.png';
import webport8 from './assets/homepage/webport8.png';
import webport9 from './assets/homepage/webport9.png';
import webport10 from './assets/homepage/webport10.png';
import webport11 from './assets/homepage/webport11.png';
import webport12 from './assets/homepage/webport12.JPG';

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
      // Force a style recalculation to ensure the loading screen is rendered
      // This is critical for Chrome which can be aggressive with batching
      const element = loadingScreenRef.current;
      
      // Force layout calculation
      void element.offsetHeight;
      
      // Use triple requestAnimationFrame + small timeout for maximum browser compatibility
      // This ensures the loading screen is fully painted before animations start
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Additional small delay for Chrome to ensure paint is complete
          setTimeout(() => {
            requestAnimationFrame(() => {
              setAnimationReady(true);
            });
          }, 16); // One frame (~16ms at 60fps)
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
    
    // Minimal critical asset preloading - only what's needed for first paint
    const preloadCriticalAssets = () => {
      // Only preload what's absolutely needed for first paint:
      // 1. Logo (used in loading screen and navbar)
      // 2. Hero background (first visible content)
      const criticalImages = [
        '/roboiconimg.png', // Logo used in navbar and loading screen
        webport3, // The visible hero background image (index 2)
      ];

      const criticalPromises = criticalImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          if ('fetchPriority' in img) {
            img.fetchPriority = 'high';
          }
          img.onload = () => {
            // Decode the image to ensure it's ready for rendering
            if (img.decode) {
              img.decode().then(resolve).catch(resolve);
            } else {
              resolve();
            }
          };
          img.onerror = resolve; // Resolve even on error to not block
          img.src = src;
        });
      });

      return Promise.all(criticalPromises);
    };

    // Defer loading of secondary assets until after page is visible
    const loadSecondaryAssets = () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduleIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      
      scheduleIdle(() => {
        // Secondary images - homepage content
        const secondaryImages = [
          rubiksAssembly, // Gap section image
          rubiksImage, // Project card
          srprojImage, // Project card
          fitboxImage, // Project card
        ];

        secondaryImages.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }, { timeout: 2000 });

      // Load other portfolio images with even lower priority
      scheduleIdle(() => {
        const portfolioImages = [
          webport1, webport2, webport4, webport5, webport6,
          webport7, webport8, webport9, webport10, webport11, webport12,
        ];
        portfolioImages.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }, { timeout: 5000 });

      // Tertiary images - only load when truly idle
      scheduleIdle(() => {
        const tertiaryImages = [
          profileImage,
          rubiksDrawing,
          rubiksGUI,
          tmcDriver,
          nema17,
          arduinoMega,
          srprojImageDetailed,
          blackscholesImage,
          simplifiedBlackscholesImage,
          famafrenchImage,
          explosionDrawing,
        ];
        tertiaryImages.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }, { timeout: 10000 });
    };

    // Start critical preloading immediately
    const preloadPromise = preloadCriticalAssets();
    
    // Save scroll position and set refresh flag before page unloads
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      sessionStorage.setItem('pageRefresh', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Hide loading screen after animation completes AND critical assets are loaded
    // Animation starts after animation-ready class is added (~33ms delay from double RAF)
    // Animation duration: 1.35s, fadeOut starts at 1.4s, fadeOut duration: 0.2s
    // Total: ~1.6s minimum, using 1.65s to ensure animation fully completes
    Promise.all([
      preloadPromise,
      new Promise(resolve => setTimeout(resolve, 1650)) // Minimum animation time + buffer
    ]).then(() => {
      setLoading(false);
      // Start loading secondary assets after main content is visible
      loadSecondaryAssets();
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
