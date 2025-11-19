import { Link } from 'react-router-dom';
import rubiksImage from '../assets/rubiks1.jpeg';
import rubiksDrawing from '../assets/1rubiksdrawing.png';
import rubiksAssembly from '../assets/rubiks_assembly7.png';
import rubiksGUI from '../assets/websiterubiksimg1.png';

function RubiksCubeProject() {
  const handleBackClick = () => {
    sessionStorage.setItem('returnToHome', 'true');
  };

  return (
    <div className="project-detail-page">
      <div className="project-detail-header">
        <Link to="/#projects" className="back-button" onClick={handleBackClick}>Back to Projects</Link>
        <h1>Rubik's Cube Robot</h1>
      </div>
      
      <div className="project-detail-content">
        <div className="project-hero-image">
          <img src={rubiksImage} alt="Rubik's Cube Robot" loading="eager" />
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '3rem', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap', 
          maxWidth: '1600px', 
          margin: '0 auto',
          width: 'calc(100vw - 4rem)',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          padding: '0 2rem'
        }}>
          <div style={{ flex: '1 1 700px', minWidth: '300px' }}>
            <div className="project-section">
              <h2>Overview</h2>
              <p className="project-description">
                Fully modular, autonmous cube-solving robot.
              </p>
              <p>
              This project integrates mechanical design, electrical wiring and microcontoller programming, computer vision,
              and algorithmic problem solving to create a high-performance Rubik's Cube solving system. The robot uses a custom-designed 
                mechanical gripper system to manipulate the cube efficiently, with computer vision algorithms 
                detecting the cube's current state and optimization algorithms calculating the optimal solving sequence.

               
              </p>
            </div>
            
            <div className="project-section">
              <h2>Notable Stats</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">1s</div>
                  <div className="stat-label">Average Solve Times</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">&lt;20</div>
                  <div className="stat-label">Rotations Per Solve
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ flex: '0 0 auto' }}>
            <div className="project-section">
              <h2>Live Demo</h2>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}>
                <video 
                  width="315" 
                  height="560" 
                  loop
                  autoPlay
                  muted
                  playsInline
                  controls
                  controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                  disablePictureInPicture={true}
                  disableRemotePlayback
                  className="no-pip-video"
                  style={{ 
                    maxWidth: '100%', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    height: '550px'
                  }}
                  onClick={(e) => {
                    if (e.target.paused) {
                      e.target.play();
                    } else {
                      e.target.pause();
                    }
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src="/websiterubikssolve.mov" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Mechanical Design</h2>
          <p>
            The mechanical system features precision-engineered grippers and servo motors designed for rapid cube manipulation. 
            The modular design allows for easy maintenance and upgrades. Key mechanical components include:
          </p>
          <ul>
            <li>Custom-designed gripper mechanisms with precise servo control</li>
            <li>Sturdy aluminum frame providing stability during high-speed operations</li>
            <li>Precision bearings for smooth rotation and minimal friction</li>
            <li>Modular assembly system for easy disassembly and maintenance</li>
          </ul>
          <p>
            The mechanical design was iteratively refined through multiple prototypes to achieve optimal balance between 
            speed, accuracy, and reliability.
          </p>
          <div className="project-gallery">
            <img src={rubiksDrawing} alt="Rubik's Cube Robot Design" loading="lazy" />
            <img src={rubiksAssembly} alt="Rubik's Cube Robot Assembly" loading="lazy" />
          </div>
        </div>
        
        <div className="project-section">
          <h2>Electrical Design</h2>
          <p>
            The electrical system integrates power management, motor control, and sensor interfaces in a compact PCB design. 
            Key electrical features include:
          </p>
          <ul>
            <li>Custom PCB with optimized power distribution for servo motors</li>
            <li>Efficient power management system with voltage regulation</li>
            <li>High-speed communication interfaces for real-time control</li>
            <li>Robust wiring harness with proper shielding and strain relief</li>
          </ul>
          <p>
            The electrical design prioritizes reliability and performance, ensuring consistent operation during 
            high-speed solving sequences.
          </p>
        </div>

        <div className="project-section">
          <h2>Microcontroller</h2>
          <p>
            The microcontroller serves as the brain of the system, coordinating all mechanical and electrical components. 
            Key programming features include:
          </p>
          <ul>
            <li>Real-time servo motor control with precise timing</li>
            <li>Interrupt-driven architecture for responsive sensor feedback</li>
            <li>Communication protocols for interfacing with computer vision system</li>
            <li>Optimized algorithms for minimizing solve time</li>
          </ul>
          <p>
            The firmware is written in C++ for maximum performance and includes comprehensive error handling 
            and safety features to prevent damage during operation.
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '3rem', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap', 
          maxWidth: '1600px', 
          margin: '0 auto',
          width: 'calc(100vw - 4rem)',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          padding: '0 2rem'
        }}>
          <div style={{ flex: '0 0 auto' }}>
            <img 
              src={rubiksGUI} 
              alt="Rubik's Cube GUI" 
              style={{ 
                maxWidth: '500px', 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px' 
              }} 
            />
          </div>
          
          <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
            <div className="project-section">
              <h2>Solving Algorithm & GUI</h2>
              <p>
                The solving system combines advanced algorithms with an intuitive user interface. Key features include:
              </p>
              <ul>
                <li>Computer vision algorithms for cube state detection and color recognition</li>
                <li>Optimized solving algorithms (CFOP method) for minimum move count</li>
                <li>Real-time GUI displaying current cube state and solving progress</li>
                <li>Statistical analysis of solve times and move optimization</li>
              </ul>
              <p>
                The Python-based GUI provides real-time visualization of the solving process, allowing users to 
                monitor algorithm performance and cube state recognition accuracy. The system achieves sub-second 
                solve times with move counts consistently under 20 rotations.
              </p>
            </div>
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
          <Link to="/#projects" className="back-button" onClick={handleBackClick}>Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}

export default RubiksCubeProject;

