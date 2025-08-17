import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">HC</span>
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
                Hi, I'm <span className="highlight">Henry Chen</span>
              </h1>
              <p className="hero-subtitle">
                Full-Stack Developer & Software Engineer
              </p>
              <p className="hero-description">
                I build exceptional digital experiences that combine elegant design with powerful functionality.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">View My Work</button>
                <button className="btn btn-secondary">Get In Touch</button>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-placeholder">
                <span>HC</span>
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
                  <h3>Senior Developer</h3>
                  <p className="timeline-company">Tech Company • 2022 - Present</p>
                  <p>
                    Leading development of enterprise-level applications using React and Node.js. 
                    Mentoring junior developers and implementing best practices across the team.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Full-Stack Developer</h3>
                  <p className="timeline-company">Startup • 2020 - 2022</p>
                  <p>
                    Built and maintained multiple web applications from concept to deployment. 
                    Collaborated with cross-functional teams to deliver high-quality products.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Junior Developer</h3>
                  <p className="timeline-company">Digital Agency • 2019 - 2020</p>
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
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">E-Commerce</div>
                </div>
                <div className="project-content">
                  <h3>E-Commerce Platform</h3>
                  <p>
                    A full-featured online shopping platform built with React, Node.js, and MongoDB. 
                    Features include user authentication, payment processing, and admin dashboard.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">MongoDB</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-link">Live Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">Task Manager</div>
                </div>
                <div className="project-content">
                  <h3>Task Management App</h3>
                  <p>
                    Real-time task management application with collaborative features. 
                    Built with React, Socket.io, and Express for seamless team collaboration.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Socket.io</span>
                    <span className="tech-tag">Express</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-link">Live Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">Weather App</div>
                </div>
                <div className="project-content">
                  <h3>Weather Dashboard</h3>
                  <p>
                    Interactive weather application with location-based forecasts and historical data. 
                    Integrates multiple weather APIs for comprehensive weather information.
                  </p>
                  <div className="project-tech">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Weather API</span>
                    <span className="tech-tag">Chart.js</span>
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
