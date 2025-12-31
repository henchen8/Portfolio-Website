import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import rubiksImage from '../assets/rubiks1.jpeg';
import srprojImage from '../assets/srproj.png';
import fitboxImage from '../assets/FitBoxlogo.png';
import rubiksAssembly from '../assets/rubiks_assembly7.png';

function Home() {
  const navigate = useNavigate();
  const scrollHandlerReady = useRef(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload project images to prevent glitchy first scroll
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = [
        rubiksImage,
        srprojImage,
        fitboxImage,
        rubiksAssembly
      ].map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to not block
          img.src = src;
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    };

    preloadImages();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    // Ensure layout is ready and scroll handler has initialized
    const performScroll = () => {
      // Force a layout recalculation to ensure accurate measurements
      projectsSection.getBoundingClientRect();
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Double RAF to ensure layout is complete and scroll handler has processed
        requestAnimationFrame(() => {
          const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition + 300;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        });
      });
    };

    // If scroll handler hasn't run yet, ensure it initializes first
    if (!scrollHandlerReady.current) {
      // Manually trigger scroll handler initialization by dispatching scroll event
      // This ensures opacity states are set before we scroll
      window.dispatchEvent(new Event('scroll'));
      
      // Wait for handler to process - use multiple RAFs to ensure it completes
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          performScroll();
        });
      });
    } else {
      // Handler is ready, but still use RAF to ensure layout is stable
      performScroll();
    }
  };

  // Handle scroll-based opacity transition and navbar visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      // Mark handler as ready after first execution
      scrollHandlerReady.current = true;
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const navbar = document.querySelector('.navbar');
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          
          if (navbar && scrollDifference > 10) {
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
              navbar.classList.add('navbar-hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
              navbar.classList.remove('navbar-hidden');
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
      
      const scrollY = window.scrollY;
      const maxOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--background-image-opacity'));
      
      let currentOpacity = 0;
      
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');
      
      if (!experienceSection || !projectsSection) {
        return;
      }
      
      const FADE_IN_START = 800;
      const FADE_IN_END = 1600;
      const FADE_OUT_START = 1800;
      const FADE_OUT_END = 2700;
      
      if (scrollY < FADE_IN_START) {
        currentOpacity = 0;
      } else if (scrollY <= FADE_IN_END) {
        const fadeInProgress = (scrollY - FADE_IN_START) / (FADE_IN_END - FADE_IN_START);
        const curveProgress = Math.pow(fadeInProgress, 2);
        currentOpacity = curveProgress * maxOpacity;
      } else if (scrollY <= FADE_OUT_START) {
        currentOpacity = maxOpacity;
      } else if (scrollY <= FADE_OUT_END) {
        const fadeOutProgress = (scrollY - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START);
        const curveProgress = Math.pow(1 - fadeOutProgress, 1.2);
        currentOpacity = Math.max(0, curveProgress * maxOpacity);
      } else {
        currentOpacity = 0;
      }
      
      let experienceOpacity = 0;
      
      if (experienceSection) {
        const experienceRect = experienceSection.getBoundingClientRect();
        const experienceTop = experienceRect.top;
        const experienceBottom = experienceRect.bottom;
        
        const EXPERIENCE_FADE_IN_START = 1000;
        const EXPERIENCE_FADE_IN_END = 200;
        const EXPERIENCE_FADE_OUT_START = 1000;
        const EXPERIENCE_FADE_OUT_END = 500;
        
        if (experienceTop < EXPERIENCE_FADE_IN_START && experienceTop > EXPERIENCE_FADE_IN_END) {
          const fadeInProgress = (EXPERIENCE_FADE_IN_START - experienceTop) / (EXPERIENCE_FADE_IN_START - EXPERIENCE_FADE_IN_END);
          const curveProgress = Math.pow(fadeInProgress, .75);
          experienceOpacity = curveProgress;
        } else if (experienceTop <= EXPERIENCE_FADE_IN_END) {
          experienceOpacity = 1;
        }
        
        if (experienceOpacity > 0 && experienceBottom < EXPERIENCE_FADE_OUT_START && experienceBottom > EXPERIENCE_FADE_OUT_END) {
          const fadeOutProgress = (EXPERIENCE_FADE_OUT_START - experienceBottom) / (EXPERIENCE_FADE_OUT_START - EXPERIENCE_FADE_OUT_END);
          const curveProgress = Math.pow(fadeOutProgress, 2);
          experienceOpacity = 1 - curveProgress;
        } else if (experienceBottom <= EXPERIENCE_FADE_OUT_END) {
          experienceOpacity = 0;
        }
      }
      
      let projectsOpacity = 0;
      
      if (projectsSection) {
        const projectsRect = projectsSection.getBoundingClientRect();
        const projectsTop = projectsRect.top;
        const projectsBottom = projectsRect.bottom;
        
        // Check if we're near the bottom of the page
        const distanceFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
        const isNearBottom = distanceFromBottom < 200;
        
        const PROJECTS_FADE_IN_START = 300;
        const PROJECTS_FADE_IN_END = -200;
        
        // Ensure full opacity when near bottom or past fade-in threshold
        if (isNearBottom || projectsTop <= PROJECTS_FADE_IN_END) {
          projectsOpacity = 1;
        } else if (projectsTop < PROJECTS_FADE_IN_START && projectsTop > PROJECTS_FADE_IN_END) {
          const fadeInProgress = (PROJECTS_FADE_IN_START - projectsTop) / (PROJECTS_FADE_IN_START - PROJECTS_FADE_IN_END);
          const curveProgress = Math.pow(fadeInProgress, 2);
          projectsOpacity = curveProgress;
        }
      }
      
      const scrollBackground = document.querySelector('.scroll-background');
      if (scrollBackground) {
        const footer = document.querySelector('.footer');
        
        if (scrollY < 0) {
          scrollBackground.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        } else if (footer && scrollY > (footer.offsetTop + footer.offsetHeight)) {
          scrollBackground.style.background = '#000000';
        } else {
          scrollBackground.style.background = 'transparent';
        }
      }

      // Reuse the initial style tag to prevent any flash
      let style = document.getElementById('initial-background-opacity');
      if (!style) {
        style = document.createElement('style');
        style.id = 'initial-background-opacity';
        document.head.appendChild(style);
      }
      
      style.textContent = `
        .experience-section::before,
        .gap-section::before,
        .projects-section::before {
          opacity: ${currentOpacity} !important;
        }
        .experience-section .container {
          opacity: ${experienceOpacity} !important;
          transition: opacity 0.1s ease-out !important;
        }
        .projects-section .container {
          opacity: ${projectsOpacity} !important;
          transition: opacity 0.1s ease-out !important;
        }
      `;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Call immediately without delay to ensure proper initial state
    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleScroll();
      });
    });
    window.addEventListener('load', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
      const existingStyle = document.getElementById('initial-background-opacity');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Re-run scroll handler when images are loaded to ensure proper initialization
  useEffect(() => {
    if (imagesLoaded) {
      // Trigger scroll handler to recalculate opacities with loaded images
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('scroll'));
      });
    }

  }, []);

  return (
    <>
      <main className="main-content">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Hi, I'm <span className="highlight">Henry!</span>
              </h1>
              <p className="hero-subtitle">
                Aspiring Robotics Engineer and Entrepreneur
              </p>
              <p className="hero-description">
              I'm a Student at the University of Pennsylvania, studying Mechanical Engineering 
              concentrating in Dynamics, Controls, and Robotics.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={scrollToProjects}>My Projects</button>
              </div>
            </div>
            <div className="hero-image">
              <a 
                href="https://linkedin.com/in/henry-w-chen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-placeholder"
              >
                <img src={profileImage} alt="Henry Chen" className="profile-image" />
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section experience-section">
          <div className="container">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Business Operations + Fluid Systems Engineer</h3>
                  <p className="timeline-company">Penn Hyperloop • September 2024 - Present</p>
                  <p>
                    Ran fluids calculations to model and find tolerances for slurry input and muck retrieval from
                    the TBM system given the specifications outlined by the Not-a-Boring Competition.

                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Mechanical Engineering Intern</h3>
                  <p className="timeline-company">Elytra Robotics • May 2025 - August 2025</p>
                  <p>
                    Designed custom swerve drivetrain for an industrial rover capable of indoor and outdoor operation, 
                    along with a custom onboard trash compression mechanism optimized for tight packaging.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Student</h3>
                  <p className="timeline-company">Jerome Fisher Program Management and Technology Program (M&T) • June 2024 - July 2024</p>
                  <p>
                    M&TSI is a three-week for-credit course (EAS 00280) run by the Jerome Fisher Program in Management and Technology (M&T).
                    Co-Founder and Mechanical Lead for FitBox—a revolutionary portable workout solution. Designed GTM strategy 
                    and built MVP.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Senior Mechancial Engineer</h3>
                  <p className="timeline-company">Crystal Springs Uplands School Robotics Team • August 2021 - May 2025</p>
                  <p>
                    Oversaw all mechanical tasks on the team as Senior Mechanical Engineer. Lead design of mechanical systems on robot.
                    Operate robot during competition. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gap Section with Assembly Image */}
        <section className="gap-section">
          <div className="gap-container">
            <a 
              href="https://cad.onshape.com/documents/e64e9adb0ff9466627b47f67/w/74a34c291195daf66dba9b40/e/efd1feba32d209e2a89099f3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="assembly-link"
            >
              <img src={rubiksAssembly} alt="Rubik's Cube Assembly" className="assembly-image" />
            </a>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              <div className="project-card" onClick={() => {
                navigate('/projects/rubiks-cube');
              }}>
                <div className="project-image" style={{ backgroundImage: `url(${rubiksImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
                <div className="project-content">
                  <h3>Rubik's Cube Robot</h3>
                  <p className="project-tagline">Autonomous cube-solving in under 1 second</p>
                </div>
              </div>

              <div className="project-card" onClick={() => {
                navigate('/projects/financial-derivatives');
              }}>
                <div className="project-image" style={{ backgroundImage: `url(${srprojImage})`, backgroundSize: 'cover', backgroundPosition: 'center 35%' }}>
                </div>
                <div className="project-content">
                  <h3>Pricing Financial Derivatives</h3>
                  <p className="project-tagline">Exploring CAPM, PCA, and Black-Scholes options pricing</p>
                </div>
              </div>

              <div className="project-card" onClick={() => {
                navigate('/projects/fitbox');
              }}>
                <div className="project-image" style={{ backgroundImage: `url(${fitboxImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: 'white', backgroundRepeat: 'no-repeat', borderBottom: 'none' }}>
                </div>
                <div className="project-content">
                  <h3>FitBox</h3>
                  <p className="project-tagline">A revolutionary portable workout solution</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;

