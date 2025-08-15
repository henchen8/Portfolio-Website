import './App.css';

function App() {
  return (
    <div className="App">
      <div className="portfolio-container">
        <header className="header">
          <h1>Henry Chen</h1>
          <p>Portfolio</p>
        </header>
        
        <section className="section">
          <h2>About Me</h2>
          <p>
            I am a passionate developer with a focus on creating clean, efficient, and user-friendly applications. 
            I enjoy solving complex problems and learning new technologies to build innovative solutions.
          </p>
        </section>
        
        <section className="section">
          <h2>Current Work</h2>
          <p>
            Currently working on developing modern web applications using React and other cutting-edge technologies. 
            I'm focused on creating responsive and accessible user interfaces that provide excellent user experiences.
          </p>
        </section>
        
        <section className="section">
          <h2>Past Projects</h2>
          <p>
            • E-commerce platform with React and Node.js<br/>
            • Task management application with real-time updates<br/>
            • Weather dashboard with API integration<br/>
            • Personal blog with content management system
          </p>
        </section>
      </div>
    </div>
  );
}

export default App;
