import './App.css';
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
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExperience = () => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };




  return (
    <div className="App">
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
              <a href="#projects" className="nav-link">Projects</a>
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
              <div className="profile-placeholder" onClick={scrollToExperience}>
                <img src={profileImage} alt="Henry Chen" className="profile-image" />
              </div>
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
                    <a href="https://docs.google.com/presentation/d/12Rsq6fVtxUd_KKTxoM-D5vIqgpLokWzd/edit?slide=id.p30#slide=id.p30" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
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
          <p>&copy; 2025 Henry Chen. All rights reserved.</p>
      </div>
      </footer>
    </div>
  );
}

export default App;
