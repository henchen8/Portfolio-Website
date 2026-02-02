import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import rubiksDrawing from '../assets/1rubiksdrawing.png';
import rubiksImage from '../assets/rubiks1.jpeg';
import rubiksGUI from '../assets/websiterubiksimg1.png';
import tmcDriver from '../assets/portTMC2209.png';
import nema17 from '../assets/PORTFOLIONEMA17.png';
import arduinoMega from '../assets/PORTarduinomega.png';
import '../styles/RubiksCubeProject.css';

function RubiksCubeProject() {
  const [timerValue, setTimerValue] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const navigatedFromTile = sessionStorage.getItem('navigatedFromTile') === 'true';
    if (navigatedFromTile) {
      sessionStorage.removeItem('navigatedFromTile');
      return false;
    }
    return true;
  });
  const timerIntervalRef = useRef(null);
  const videoRef = useRef(null);
  const isHoveringRef = useRef(false);

  const SOLVE_START_TIME = 0.02;
  const SOLVE_END_TIME = 1.51;
  const TARGET_SOLVE_TIME = 0.997;
  const ACTUAL_VIDEO_DURATION = SOLVE_END_TIME - SOLVE_START_TIME;
  const TIMER_SCALE = TARGET_SOLVE_TIME / ACTUAL_VIDEO_DURATION;
  const VIDEO_PLAYBACK_RATE = ACTUAL_VIDEO_DURATION / TARGET_SOLVE_TIME;

  const handleBackClick = () => {
    sessionStorage.setItem('returnToHome', 'true');
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = VIDEO_PLAYBACK_RATE;
    }
  }, [VIDEO_PLAYBACK_RATE]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hasAutoPlayed = false;
    let playTimeout = null;
    let initialCheckTimeout = null;

    const isVideoFullyVisible = () => {
      const rect = video.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const triggerAutoPlay = () => {
      if (hasAutoPlayed) return;
      hasAutoPlayed = true;
      playTimeout = setTimeout(() => {
        video.play();
      }, 250);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1 && !hasAutoPlayed) {
            triggerAutoPlay();
            observer.disconnect();
          }
        });
      },
      { threshold: 1.0, rootMargin: '0px' }
    );

    observer.observe(video);

    initialCheckTimeout = setTimeout(() => {
      if (!hasAutoPlayed && isVideoFullyVisible()) {
        triggerAutoPlay();
        observer.disconnect();
      }
    }, 100);

    return () => {
      if (playTimeout) clearTimeout(playTimeout);
      if (initialCheckTimeout) clearTimeout(initialCheckTimeout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        if (currentTime < SOLVE_START_TIME) {
          setTimerValue(0);
        } else if (currentTime >= SOLVE_START_TIME && currentTime <= SOLVE_END_TIME) {
          const actualElapsed = currentTime - SOLVE_START_TIME;
          const displayElapsed = actualElapsed * TIMER_SCALE;
          setTimerValue(displayElapsed);
        } else if (currentTime > SOLVE_END_TIME) {
          setTimerValue(TARGET_SOLVE_TIME);
        }
      }
      timerIntervalRef.current = requestAnimationFrame(updateTimer);
    };
    timerIntervalRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (timerIntervalRef.current) {
        cancelAnimationFrame(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [TIMER_SCALE, SOLVE_START_TIME, SOLVE_END_TIME, TARGET_SOLVE_TIME]);

  const handleVideoEnded = () => {
    if (!isHoveringRef.current) {
      setShowReplay(true);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play();
      setShowReplay(false);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = VIDEO_PLAYBACK_RATE;
      setShowReplay(false);
    }
  };

  return (
    <div className="rubiks-page">
      {/* Back Navigation */}
      <div className="rubiks-nav">
        <Link to="/#projects" className="rubiks-back-link" onClick={handleBackClick}>
          <span className="rubiks-back-arrow">←</span> Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <header className="rubiks-hero">
        <span className="rubiks-category">ROBOTICS & AUTOMATION</span>
        <h1 className="rubiks-headline">
          <em>Autonomous precision</em><br />
          <em>in under one second.</em>
        </h1>
        <p className="rubiks-hero-description">
          A fully modular Rubik's Cube solving robot that integrates mechanical design, 
          computer vision, and optimized algorithms to achieve sub-second solve times.
        </p>
      </header>

      {/* Hero Image */}
      <div className="rubiks-hero-image">
        <img src={rubiksImage} alt="Rubik's Cube Robot" />
      </div>

      {/* Stats Row */}
      <div className="rubiks-stats-row">
        <div className="rubiks-stat">
          <span className="rubiks-stat-value">0.997s</span>
          <span className="rubiks-stat-label">Solve Time</span>
        </div>
        <div className="rubiks-stat">
          <span className="rubiks-stat-value">&lt;20</span>
          <span className="rubiks-stat-label">Turns Per Solve</span>
        </div>
        <div className="rubiks-stat">
          <span className="rubiks-stat-value">&lt;$125</span>
          <span className="rubiks-stat-label">Total Cost</span>
        </div>
      </div>

      {/* Section 1: Mechanical Design - Text Left, Image Right */}
      <section className="rubiks-section">
        <div className="rubiks-section-content rubiks-text-left">
          <div className="rubiks-text-block">
            <h2 className="rubiks-section-title">
              Built for speed, precision,<br />
              and modularity.
            </h2>
            <p className="rubiks-section-body">
              The mechanical system features custom-designed 3D printed parts that allow 
              each face of the cube to be rotated independently with minimal backlash.
            </p>
            <p className="rubiks-section-body">
              End effectors optimized for precise control connect seamlessly to motor shafts 
              through custom interfaces. The base houses five stepper motors, while a removable 
              "motor hat" provides easy access to the sixth.
            </p>
            <p className="rubiks-section-body">
              The fully-modular design enables rapid maintenance and iterative improvements—each 
              component refined through multiple prototypes to achieve the optimal balance of 
              speed, reliability, and robustness.
            </p>
          </div>
          <div className="rubiks-image-block">
            <img src={rubiksDrawing} alt="Mechanical Design CAD Drawing" />
          </div>
        </div>
      </section>

      {/* Section 2: Solve Video - Image Left, Text Right */}
      <section className="rubiks-section rubiks-section-alt">
        <div className="rubiks-section-content rubiks-text-right">
          <div className="rubiks-video-block">
            <div 
              className="rubiks-video-container"
              onMouseEnter={() => { isHoveringRef.current = true; }}
              onMouseLeave={() => {
                isHoveringRef.current = false;
                if (videoRef.current && videoRef.current.ended) {
                  setShowReplay(true);
                }
              }}
            >
              <video
                ref={videoRef}
                loop={false}
                muted={isMuted}
                playsInline
                controls={!showReplay}
                controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                disablePictureInPicture={true}
                disableRemotePlayback
                className="rubiks-video"
                onClick={(e) => {
                  if (!showReplay) {
                    if (e.target.paused) {
                      e.target.play();
                    } else {
                      e.target.pause();
                    }
                  }
                }}
                onContextMenu={(e) => e.preventDefault()}
                onLoadedData={(e) => {
                  e.target.playbackRate = VIDEO_PLAYBACK_RATE;
                }}
                onEnded={handleVideoEnded}
                onPlay={handlePlay}
              >
                <source src="/rubik_solve_vid0.mov" type="video/mp4" />
              </video>
              
              {showReplay && (
                <div className="rubiks-replay-overlay" onClick={handleReplay}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                  <span>Replay</span>
                </div>
              )}
            </div>
            <div className="rubiks-timer-display">
              <span className="rubiks-timer-label">Solve Time</span>
              <span className="rubiks-timer-value">{timerValue.toFixed(3)}s</span>
            </div>
          </div>
          <div className="rubiks-text-block">
            <h2 className="rubiks-section-title">
              Watch it solve in<br />
              real time.
            </h2>
            <p className="rubiks-section-body">
              The robot executes optimized move sequences calculated by the Kociemba Algorithm, 
              consistently achieving solutions with fewer than 20 rotations.
            </p>
            <p className="rubiks-section-body">
              Each motor operates at precisely calibrated speeds, with the firmware handling 
              real-time coordination to ensure smooth, synchronized face rotations without 
              collision or mechanical stress.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Electrical Design - Text Left, Images Right */}
      <section className="rubiks-section">
        <div className="rubiks-section-content rubiks-text-left">
          <div className="rubiks-text-block">
            <h2 className="rubiks-section-title">
              Precision motor control<br />
              with robust electronics.
            </h2>
            <p className="rubiks-section-body">
              The electrical system bridges computer vision with mechanical actuation through 
              carefully designed motor control circuits. An Arduino MEGA 2560 serves as the 
              central controller, coordinating six TMC 2209 stepper motor drivers.
            </p>
            <p className="rubiks-section-body">
              Six NEMA 17 stepper motors provide the torque and precision needed for rapid 
              face rotations. Pull-up resistors and decoupling capacitors ensure signal 
              integrity across over 120 jumper wire connections.
            </p>
            <p className="rubiks-section-body">
              The design prioritizes reliability—consistent operation even during high-speed 
              solving sequences that push the mechanical system to its limits.
            </p>
          </div>
          <div className="rubiks-image-block rubiks-image-stack">
            <img src={tmcDriver} alt="TMC 2209 Stepper Motor Driver" className="rubiks-component-img" />
            <img src={nema17} alt="NEMA 17 Stepper Motor" className="rubiks-component-img" />
          </div>
        </div>
      </section>

      {/* Section 4: Software - Image Left, Text Right */}
      <section className="rubiks-section rubiks-section-alt">
        <div className="rubiks-section-content rubiks-text-right">
          <div className="rubiks-image-block">
            <img src={arduinoMega} alt="Arduino MEGA 2560" />
          </div>
          <div className="rubiks-text-block">
            <h2 className="rubiks-section-title">
              Real-time firmware for<br />
              precise motor coordination.
            </h2>
            <p className="rubiks-section-body">
              The Arduino firmware integrates solving algorithms with electrical and mechanical 
              components through interrupt-driven architecture. Streamlined functions accept 
              face and displacement parameters for flexible move execution.
            </p>
            <p className="rubiks-section-body">
              Written in C++ for maximum performance, the code includes comprehensive error 
              handling and safety features. Communication protocols enable seamless interfacing 
              with the computer vision system running on a separate device.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Algorithm & GUI - Text Left, Image Right */}
      <section className="rubiks-section">
        <div className="rubiks-section-content rubiks-text-left">
          <div className="rubiks-text-block">
            <h2 className="rubiks-section-title">
              Computer vision meets<br />
              optimal pathfinding.
            </h2>
            <p className="rubiks-section-body">
              The solving system combines camera-based color recognition with the Kociemba 
              Algorithm to find near-optimal solutions. Computer vision algorithms detect 
              cube state across all six faces in seconds.
            </p>
            <p className="rubiks-section-body">
              A Python-based GUI provides real-time visualization of the solving process, 
              displaying current cube state, algorithm progress, and solve statistics. 
              Users can monitor recognition accuracy and tweak parameters on the fly.
            </p>
          </div>
          <div className="rubiks-image-block">
            <img src={rubiksGUI} alt="Rubik's Cube Solving GUI" />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="rubiks-resources">
        <h2 className="rubiks-resources-title">Resources</h2>
        <div className="rubiks-resources-links">
          <a href="https://www.youtube.com/shorts/J1a7RxK03xU" target="_blank" rel="noopener noreferrer" className="rubiks-resource-link">
            Solve Video
            <span className="rubiks-link-arrow">→</span>
          </a>
          <a href="https://cad.onshape.com/documents/e64e9adb0ff9466627b47f67/w/74a34c291195daf66dba9b40/e/ef19ed1914f1db15c2699f69" target="_blank" rel="noopener noreferrer" className="rubiks-resource-link">
            CAD Model
            <span className="rubiks-link-arrow">→</span>
          </a>
          <a href="https://docs.google.com/presentation/d/12Rsq6fVtxUd_KKTxoM-D5vIqgpLokWzd/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer" className="rubiks-resource-link">
            Presentation
            <span className="rubiks-link-arrow">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="rubiks-footer">
        <Link to="/#projects" className="rubiks-back-link" onClick={handleBackClick}>
          <span className="rubiks-back-arrow">←</span> Back to Projects
        </Link>
      </footer>
    </div>
  );
}

export default RubiksCubeProject;
