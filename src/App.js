import './App.css';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import profileImage from './assets/profile.jpeg';
import rubiksImage from './assets/rubiks1.jpeg';
import srprojImage from './assets/srproj.jpeg';
import fitboxImage from './assets/FitBoxlogo.png';
import rubiksDrawing from './assets/rubiksdrawing.png';
import rubiksAssembly from './assets/rubiks_assembly7.png';

function App() {

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + 250; // Scroll 250px lower than projects section (100px higher than 350px)
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } 
  };

  const scrollToExperience = () => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scroll-based opacity transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Get max opacity from CSS variable
      const maxOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--background-image-opacity'));
      
      let currentOpacity = 0;
      
      // Ensure elements exist before calculating animations
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');
      
      if (!experienceSection || !projectsSection) {
        return; // Exit early if elements aren't ready
      }
      
      // Define animation phases based on pixel positions
      const FADE_IN_START = 800;    // Start fading in at 800px scroll
      const FADE_IN_END = 1600;     // Reach max opacity at 1600px scroll (moved lower)
      const FADE_OUT_START = 1800;  // Start fading out at 1800px scroll
      const FADE_OUT_END = 2700;    // Fully faded out at 2700px scroll (moved 300px lower)
      
      if (scrollY < FADE_IN_START) {
        // Before fade-in starts
        currentOpacity = 0;
      } else if (scrollY <= FADE_IN_END) {
        // Fade in phase (800px to 1200px)
        const fadeInProgress = (scrollY - FADE_IN_START) / (FADE_IN_END - FADE_IN_START);
        // Use quadratic curve for smooth fade-in
        const curveProgress = Math.pow(fadeInProgress, 2);
        currentOpacity = curveProgress * maxOpacity;
      } else if (scrollY <= FADE_OUT_START) {
        // Maintain maximum opacity during plateau (1200px to 1800px)
        currentOpacity = maxOpacity;
      } else if (scrollY <= FADE_OUT_END) {
        // Fade out phase (1800px to 2200px)
        const fadeOutProgress = (scrollY - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START);
        // Use smoother curve for fade-out
        const curveProgress = Math.pow(1 - fadeOutProgress, 1.2);
        currentOpacity = Math.max(0, curveProgress * maxOpacity);
      } else {
        // After fade-out is complete
        currentOpacity = 0;
      }
      
      // Calculate fade-in and fade-out for experience section based on pixel positions
      let experienceOpacity = 0;
      
      // experienceSection already defined above
      if (experienceSection) {
        const experienceRect = experienceSection.getBoundingClientRect();
        const experienceTop = experienceRect.top;
        const experienceBottom = experienceRect.bottom;
        
        // Define experience fade-in based on pixel positions from viewport (gradual over longer distance)
        const EXPERIENCE_FADE_IN_START = 1000;   // Start fading in when top is 1000px from top of viewport
        const EXPERIENCE_FADE_IN_END = 200;      // Fully visible when top is 200px from top of viewport (longer fade-in distance)
        const EXPERIENCE_FADE_OUT_START = 1200;  // Start fading out when bottom is 1200px from top of viewport (earlier)
        const EXPERIENCE_FADE_OUT_END = 800;     // Fully faded when bottom is 800px from top of viewport (earlier)
        
        // Handle fade-in phase (0 to 1 over longer distance)
        if (experienceTop < EXPERIENCE_FADE_IN_START && experienceTop > EXPERIENCE_FADE_IN_END) {
          const fadeInProgress = (EXPERIENCE_FADE_IN_START - experienceTop) / (EXPERIENCE_FADE_IN_START - EXPERIENCE_FADE_IN_END);
          // Use very gentle curve for gradual fade-in over longer distance
          const curveProgress = Math.pow(fadeInProgress, 3);
          experienceOpacity = curveProgress;
        } else if (experienceTop <= EXPERIENCE_FADE_IN_END) {
          experienceOpacity = 1;
        }
        
        // Handle fade-out phase (only if already visible)
        if (experienceOpacity > 0 && experienceBottom < EXPERIENCE_FADE_OUT_START && experienceBottom > EXPERIENCE_FADE_OUT_END) {
          const fadeOutProgress = (EXPERIENCE_FADE_OUT_START - experienceBottom) / (EXPERIENCE_FADE_OUT_START - EXPERIENCE_FADE_OUT_END);
          const curveProgress = Math.pow(fadeOutProgress, 2);
          experienceOpacity = 1 - curveProgress;
        } else if (experienceBottom <= EXPERIENCE_FADE_OUT_END) {
          experienceOpacity = 0;
        }
      }
      
      // Calculate fade-in for projects section based on pixel positions
      let projectsOpacity = 0;
      
      // projectsSection already defined above
      if (projectsSection) {
        const projectsRect = projectsSection.getBoundingClientRect();
        const projectsTop = projectsRect.top;
        
        // Define projects fade-in based on pixel positions from viewport
        const PROJECTS_FADE_START = 500;    // Start fading when top is 500px from top of viewport (sooner)
        const PROJECTS_FADE_END = -200;     // Fully visible when top is -200px from top of viewport (longer fade duration)
        
        // Ensure projectsTop is a valid number to prevent glitches
        if (isNaN(projectsTop) || projectsTop === undefined) {
          projectsOpacity = 0; // Default to invisible if position is invalid
        } else if (projectsTop < PROJECTS_FADE_START && projectsTop > PROJECTS_FADE_END) {
          // Calculate fade progress
          const fadeProgress = (PROJECTS_FADE_START - projectsTop) / (PROJECTS_FADE_START - PROJECTS_FADE_END);
          // Clamp fadeProgress between 0 and 1 to prevent glitches
          const clampedProgress = Math.max(0, Math.min(1, fadeProgress));
          // Use very gentle curve for slow beginning, more gradual fade-in
          const curveProgress = Math.pow(clampedProgress, 2.5);
          projectsOpacity = curveProgress;
        } else if (projectsTop <= PROJECTS_FADE_END) {
          projectsOpacity = 1;
        } else {
          projectsOpacity = 0; // Default to invisible if not in fade range
        }
      }
      
      
      // Control scroll-based background color
      const scrollBackground = document.querySelector('.scroll-background');
      if (scrollBackground) {
        const footer = document.querySelector('.footer');
        const heroSection = document.querySelector('.hero-section');
        
        if (scrollY < 0) {
          // Scrolling up beyond content - show light background matching hero section
          scrollBackground.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        } else if (footer && scrollY > (footer.offsetTop + footer.offsetHeight)) {
          // Scrolling down past footer - show black background
          scrollBackground.style.background = '#000000';
        } else {
          // Normal content area - transparent background
          scrollBackground.style.background = 'transparent';
        }
      }

      // Apply opacity to background pseudo-elements and sections
      const style = document.createElement('style');
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
      
      // Remove existing style and add new one
      const existingStyle = document.getElementById('dynamic-opacity-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      style.id = 'dynamic-opacity-style';
      document.head.appendChild(style);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set starting opacity with a small delay to ensure DOM is ready
    const initializeAnimations = () => {
      // Small delay to ensure all elements are positioned correctly
      setTimeout(() => {
        handleScroll();
      }, 100);
    };
    
    // Initialize animations
    initializeAnimations();
    
    // Also initialize on window load as backup
    window.addEventListener('load', initializeAnimations);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', initializeAnimations);
      const existingStyle = document.getElementById('dynamic-opacity-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);




  return (
    <div className="App">
      <div className="scroll-background"></div>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Henry Chen</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#experience" className="nav-link">Experience</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link" onClick={(e) => {
                e.preventDefault();
                scrollToProjects();
              }}>Projects</a>
            </li>
          </ul>
        </div>
      </nav>

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
                <button className="btn btn-primary" onClick={scrollToProjects}>View My Work</button>
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
                  <h3>Mechanical Engineering Intern</h3>
                  <p className="timeline-company">Elytra Robotics • May 2025 - Present</p>
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
                  <p className="timeline-company">Management and Technology Summer Institute
                     • June 2024 - July 2024</p>
                  <p>
                    Three-week for-credit course (EAS 00280) run by the Jerome Fisher Program in Management and Technology (M&T).
                    Co-Founder and Mechanical Lead for FitBox—a revolutionary portable workout solution. Designed GTM strategy 
                    and built MVP.

                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Senior Mechancial Engineer</h3>
                  <p className="timeline-company">Crystal Springs Uplands School Robotics Team
                     • Aug 2021 - May 2025</p>
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
              <div className="project-card" onClick={() => window.open('https://www.youtube.com/shorts/J1a7RxK03xU', '_blank', 'noopener,noreferrer')}>
                <div className="project-image" style={{ backgroundImage: `url(${rubiksImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
                <div className="project-content">
                  <h3>Rubik's Cube Robot</h3>
                  <p>
                    Fully modular cube-solving robot with average solve times just over a second.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">Onshape</span>
                    <span className="tech-tag">Fusion</span>
                    <span className="tech-tag">Arduino</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">C++</span>
                  </div>
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    <a href="https://www.youtube.com/shorts/J1a7RxK03xU" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Demo</a>
                    <a href="https://cad.onshape.com/documents/e64e9adb0ff9466627b47f67/w/74a34c291195daf66dba9b40/e/ef19ed1914f1db15c2699f69" target="_blank" rel="noopener noreferrer" className="project-link-btn">CAD</a>
                    <a href="https://docs.google.com/presentation/d/12Rsq6fVtxUd_KKTxoM-D5vIqgpLokWzd/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
                  </div>
                </div>
              </div>

              <div className="project-card" onClick={() => window.open('https://youtu.be/doYoJWpjqiU', '_blank', 'noopener,noreferrer')}>
                <div className="project-image" style={{ backgroundImage: `url(${srprojImage})`, backgroundSize: 'cover', backgroundPosition: 'center 35%' }}>
                </div>
                <div className="project-content">
                  <h3>Pricing Financial Derivatives</h3>
                  <p>
                    Conducted a brief exploration of the world of mathematical/quanatative finance
                    through CAPM, PCA, and Black Scholes Merton options model.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">Financial Derivatives</span>
                    <span className="tech-tag">PC Analysis</span>
                    <span className="tech-tag">Numerical Methods</span>
                    <span className="tech-tag">Linear Algebra</span>
                    <span className="tech-tag">Differential Equations</span>
                  </div>
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    <a href="https://youtu.be/doYoJWpjqiU" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Presentation</a>
                    <a href="https://docs.google.com/presentation/d/129P1cS45KJAWDq-8KD_RfFEJdXTyp73k/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
                    <a href="https://docs.google.com/document/d/1O5VnQPQPrbvbTIRUn-OBa9-4rOL6O1LAE2362aLJe6o/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="project-link-btn">Research Notes</a>
                  </div>
                </div>
              </div>

              <div className="project-card" onClick={() => window.open('https://youtu.be/JnfntLZAGBE', '_blank', 'noopener,noreferrer')}>
                <div className="project-image" style={{ backgroundImage: `url(${fitboxImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: 'white', backgroundRepeat: 'no-repeat' }}>
                </div>
                <div className="project-content">
                  <h3>FitBox</h3>
                  <p>
                    A revolutionary portable workout solution.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">Financial Modelling</span>
                    <span className="tech-tag">Onshape</span>
                    <span className="tech-tag">Figma</span>
                    <span className="tech-tag">C</span>
                    <span className="tech-tag">Arduino</span>
                  </div>
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    <a href="https://youtu.be/JnfntLZAGBE" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Demo</a>
                    <a href="https://docs.google.com/presentation/d/1XXMJS2hofXJqpHwX3uvxKPht97CCMyoBtOF3lLLi4Bc/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
                    <a href="https://cad.onshape.com/documents/cfd0d20e2c53157ccca464c4/w/7b40b5013232732c438b29e9/e/784c86c2b4418326fd73f6e6" target="_blank" rel="noopener noreferrer" className="project-link-btn">CAD</a>
                    <a href="https://docs.google.com/spreadsheets/d/1uZ32Qh6mbSQrWwkWwTfcECNh_2IvQMew/edit?usp=sharing&ouid=108470188565309865197&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="project-link-btn">Financial Modelling</a>
                    <a href="https://docs.google.com/document/d/16BLjd1bWl2OHBLal30bFIdV5pIzva3wmQyLRJ9i1YFM/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="project-link-btn">Executive Summary</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
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
      <Analytics />
    </div>
  );
}

export default App;
