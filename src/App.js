import './App.css';
import profileImage from './assets/profile.jpeg';

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
                I'm a Student at the University fo Pennsylvania, studying Mechanical Engineering 
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
      </main>
    </div>
  );
}

export default App;
