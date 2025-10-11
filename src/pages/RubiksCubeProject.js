import { Link } from 'react-router-dom';
import rubiksImage from '../assets/rubiks1.jpeg';
import rubiksDrawing from '../assets/rubiksdrawing.png';
import rubiksAssembly from '../assets/rubiks_assembly7.png';

function RubiksCubeProject() {
  return (
    <div className="project-detail-page">
      <div className="project-detail-header">
        <Link to="/#projects" className="back-button">Back to Projects</Link>
        <h1>Rubik's Cube Robot</h1>
      </div>
      
      <div className="project-detail-content">
        <div className="project-hero-image">
          <img src={rubiksImage} alt="Rubik's Cube Robot" />
        </div>
        
        <div className="project-section">
          <h2>Overview</h2>
          <p className="project-description">
            Fully modular cube-solving robot with average solve times just over a second.
          </p>
          <p>
            This project combines mechanical design, computer vision, and algorithmic problem-solving 
            to create a high-performance Rubik's Cube solving system. The robot uses a custom-designed 
            mechanical gripper system to manipulate the cube efficiently, with computer vision algorithms 
            detecting the cube's current state and optimization algorithms calculating the optimal solving sequence.
          </p>
        </div>
        
        <div className="project-section">
          <h2>Notable Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">1s</div>
              <div className="stat-label">Average Solve Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">&lt;20</div>
              <div className="stat-label">Face Turns
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Live Demo</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <a href="https://www.youtube.com/shorts/J1a7RxK03xU" target="_blank" rel="noopener noreferrer" className="project-link-btn" style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}>
              Watch on YouTube →
            </a>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Technical Details</h2>
          <p>
            The design features precision-engineered grippers and servo motors that work in harmony to execute 
            rapid cube rotations. The system integrates real-time image processing to identify cube colors and 
            positions, feeding this data into solving algorithms that determine the most efficient solution path.
          </p>
          <div className="project-tech">
            <span className="tech-tag">Onshape</span>
            <span className="tech-tag">Fusion</span>
            <span className="tech-tag">Arduino</span>
            <span className="tech-tag">Python</span>
            <span className="tech-tag">C++</span>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Design & Assembly</h2>
          <div className="project-gallery">
            <img src={rubiksDrawing} alt="Rubik's Cube Robot Design" />
            <img src={rubiksAssembly} alt="Rubik's Cube Robot Assembly" />
          </div>
        </div>
        
        <div className="project-section">
          <h2>Resources</h2>
          <div className="project-links">
            <a href="https://www.youtube.com/shorts/J1a7RxK03xU" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Demo</a>
            <a href="https://cad.onshape.com/documents/e64e9adb0ff9466627b47f67/w/74a34c291195daf66dba9b40/e/ef19ed1914f1db15c2699f69" target="_blank" rel="noopener noreferrer" className="project-link-btn">CAD</a>
            <a href="https://docs.google.com/presentation/d/12Rsq6fVtxUd_KKTxoM-D5vIqgpLokWzd/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="project-link-btn">PCB</a>
          </div>
        </div>
        
        <div className="project-footer">
          <Link to="/#projects" className="back-button">Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}

export default RubiksCubeProject;

