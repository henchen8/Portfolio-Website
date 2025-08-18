import './App.css';
import profileImage from './assets/profile.jpeg';
import rubiksImage from './assets/rubiks1.jpeg';
import srprojImage from './assets/srproj.jpeg';
import fitboxImage from './assets/FitBoxlogo.png';

function App() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
              <a href="#about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#experience" className="nav-link">Experience</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link">Projects</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
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
                <button className="btn btn-secondary" onClick={scrollToContact}>Get In Touch</button>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-placeholder" onClick={scrollToAbout}>
                <img src={profileImage} alt="Henry Chen" className="profile-image" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  I am a passionate and detail-oriented developer with a strong foundation in modern web technologies. 
                  My expertise lies in creating scalable, maintainable applications that deliver exceptional user experiences.
                </p>
                <p>
                  With a background in both frontend and backend development, I bring a holistic approach to software engineering. 
                  I'm constantly learning and adapting to new technologies to stay at the forefront of industry best practices.
                </p>
                <div className="skills">
                  <h3>Technical Skills</h3>
                  <div className="skills-grid">
                    <div className="skill-category">
                      <h4>Frontend</h4>
                      <ul>
                        <li>React.js</li>
                        <li>JavaScript (ES6+)</li>
                        <li>HTML5 & CSS3</li>
                        <li>TypeScript</li>
                      </ul>
                    </div>
                    <div className="skill-category">
                      <h4>Backend</h4>
                      <ul>
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>Python</li>
                        <li>RESTful APIs</li>
                      </ul>
                    </div>
                    <div className="skill-category">
                      <h4>Tools & Others</h4>
                      <ul>
                        <li>Git & GitHub</li>
                        <li>Docker</li>
                        <li>AWS</li>
                        <li>MongoDB</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <div className="container">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Mechanical Engineering Intern</h3>
                  <p className="timeline-company">Elytra Robotics • May 2025 - Present</p>
                  <p>
                    

                    Leading development of enterprise-level applications using React and Node.js. 
                    Mentoring junior developers and implementing best practices across the team.
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
                    Participated in 3-week for-credit course run by the Jerome Fisher Program 
                    in Management and Technology

                    Built and maintained multiple web applications from concept to deployment. 
                    Collaborated with cross-functional teams to deliver high-quality products.
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
                    Developed responsive websites and web applications for various clients. 
                    Gained experience with modern development workflows and tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              <div className="project-card" onClick={() => window.open('https://drive.google.com/file/d/1zb0k67s5g8Q-zFHlwFMNzDjSl_C-2LFm/view?usp=sharing', '_blank', 'noopener,noreferrer')}>
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
                    <a href="https://drive.google.com/file/d/1zb0k67s5g8Q-zFHlwFMNzDjSl_C-2LFm/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>

              <div className="project-card" onClick={() => window.open('https://drive.google.com/file/d/15mUVgrH3oLfRGmtUrDi4JjtfDlyLuPPy/view?usp=sharing', '_blank', 'noopener,noreferrer')}>
                <div className="project-image" style={{ backgroundImage: `url(${srprojImage})`, backgroundSize: 'cover', backgroundPosition: 'center 35%' }}>
                </div>
                <div className="project-content">
                  <h3>Financial Derivatives Pricing</h3>
                  <p>
                    Conducted a brief exploration of the world of mathematical/quanatative finance
                    through CAPM, PCA, and Black Scholes Merton options model.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Socket.io</span>
                    <span className="tech-tag">Express</span>
                  </div>
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    <a href="https://drive.google.com/file/d/15mUVgrH3oLfRGmtUrDi4JjtfDlyLuPPy/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image" style={{ backgroundImage: `url(${fitboxImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: 'white', backgroundRepeat: 'no-repeat' }}>
                </div>
                <div className="project-content">
                  <h3>FitBox</h3>
                  <p>
                    Revolutionary portable workout solution.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">Financial Modelling</span>
                    <span className="tech-tag">Onshape</span>
                    <span className="tech-tag">Figma</span>
                    <span className="tech-tag">C</span>
                    <span className="tech-tag">Arduino</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-link">Live Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>Let's work together</h3>
                <p>
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span>henwchen@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    <span>+1 (650) 888-9265</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" className="form-input" />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" rows="5" className="form-input"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
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
