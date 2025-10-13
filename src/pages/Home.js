import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import rubiksImage from '../assets/rubiks1.jpeg';
import srprojImage from '../assets/srproj.png';
import fitboxImage from '../assets/FitBoxlogo.png';
import rubiksAssembly from '../assets/rubiks_assembly7.png';

function Home() {
  const navigate = useNavigate();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + 300;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } 
  };

  // Handle scroll-based opacity transition and navbar visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
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
        
        const PROJECTS_FADE_IN_START = 750;
        const PROJECTS_FADE_IN_END = -500;
        const PROJECTS_FADE_OUT_START = 1000;
        const PROJECTS_FADE_OUT_END = 0;
        
        if (projectsTop < PROJECTS_FADE_IN_START && projectsTop > PROJECTS_FADE_IN_END) {
          const fadeInProgress = (PROJECTS_FADE_IN_START - projectsTop) / (PROJECTS_FADE_IN_START - PROJECTS_FADE_IN_END);
          const curveProgress = Math.pow(fadeInProgress, 2);
          projectsOpacity = curveProgress;
        } else if (projectsTop <= PROJECTS_FADE_IN_END) {
          projectsOpacity = 1;
        }
        
        if (projectsOpacity > 0 && projectsBottom < PROJECTS_FADE_OUT_START && projectsBottom > PROJECTS_FADE_OUT_END) {
          const fadeOutProgress = (PROJECTS_FADE_OUT_START - projectsBottom) / (PROJECTS_FADE_OUT_START - PROJECTS_FADE_OUT_END);
          const curveProgress = Math.pow(fadeOutProgress, 2);
          projectsOpacity = 1 - curveProgress;
        } else if (projectsBottom <= PROJECTS_FADE_OUT_END) {
          projectsOpacity = 0;
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
      
      const existingStyle = document.getElementById('dynamic-opacity-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      style.id = 'dynamic-opacity-style';
      document.head.appendChild(style);
    };

    window.addEventListener('scroll', handleScroll);
    
    const initializeAnimations = () => {
      setTimeout(() => {
        handleScroll();
      }, 100);
    };
    
    initializeAnimations();
    window.addEventListener('load', initializeAnimations);

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
                  <p className="timeline-company">Elytra Robotics • May 2025 - Aug 2025</p>
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
                  <p className="timeline-company">Management and Technology Summer Institute • June 2024 - July 2024</p>
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
                  <p className="timeline-company">Crystal Springs Uplands School Robotics Team • Aug 2021 - May 2025</p>
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
                  <div className="project-tech">
                    <span className="tech-tag">Onshape</span>
                    <span className="tech-tag">Fusion</span>
                    <span className="tech-tag">Arduino</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">C++</span>
                    <span className="tech-tag">Altium</span>
                  </div>
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    <a href="https://www.youtube.com/shorts/J1a7RxK03xU" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Demo</a>
                    <a href="https://cad.onshape.com/documents/e64e9adb0ff9466627b47f67/w/74a34c291195daf66dba9b40/e/ef19ed1914f1db15c2699f69" target="_blank" rel="noopener noreferrer" className="project-link-btn">CAD</a>
                    <a href="https://docs.google.com/presentation/d/12Rsq6fVtxUd_KKTxoM-D5vIqgpLokWzd/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="project-link-btn">PCB</a>
                  </div>
                </div>
              </div>

              <div className="project-card" onClick={() => {
                navigate('/projects/financial-derivatives');
              }}>
                <div className="project-image" style={{ backgroundImage: `url(${srprojImage})`, backgroundSize: 'cover', backgroundPosition: 'center 35%' }}>
                </div>
                <div className="project-content">
                  <h3>Pricing Financial Derivatives</h3>
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

              <div className="project-card" onClick={() => {
                navigate('/projects/fitbox');
              }}>
                <div className="project-image" style={{ backgroundImage: `url(${fitboxImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: 'white', backgroundRepeat: 'no-repeat' }}>
                </div>
                <div className="project-content">
                  <h3>FitBox</h3>
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
    </>
  );
}

export default Home;

