import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import rubiksDrawing from '../assets/1rubiksdrawing.png';
import rubiksImage from '../assets/rubiks1.jpeg';
import rubiksGUI from '../assets/websiterubiksimg1.png';
import tmcDriver from '../assets/portTMC2209.png';
import nema17 from '../assets/PORTFOLIONEMA17.png';
import arduinoMega from '../assets/PORTarduinomega.png';
import './RubiksCubeProject.css';

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
    <div className="shinkei-page">
      {/* Navigation */}
      <nav className="shinkei-nav">
        <Link to="/#projects" className="shinkei-back" onClick={handleBackClick}>
          <span className="back-arrow">←</span>
          Back to Projects
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="shinkei-hero">
        <div className="shinkei-hero-content">
          <span className="shinkei-category">ROBOTICS & EMBEDDED SYSTEMS</span>
          <h1 className="shinkei-title">
            Sub-second solves<br />
            from a fully autonomous machine.
          </h1>
          <p className="shinkei-subtitle">
            A Rubik's Cube solving robot that integrates mechanical design, embedded systems, 
            computer vision, and advanced algorithms to achieve solve times under one second.
          </p>
        </div>
        <div className="shinkei-hero-image">
          <img src={rubiksImage} alt="Rubik's Cube Robot" />
        </div>
      </header>

      {/* Stats Bar */}
      <section className="shinkei-stats">
        <div className="shinkei-stat">
          <span className="stat-number">&lt;1s</span>
          <span className="stat-desc">Solve Time</span>
        </div>
        <div className="shinkei-stat">
          <span className="stat-number">&lt;20</span>
          <span className="stat-desc">Moves Per Solve</span>
        </div>
        <div className="shinkei-stat">
          <span className="stat-number">$125</span>
          <span className="stat-desc">Total Build Cost</span>
        </div>
        <div className="shinkei-stat">
          <span className="stat-number">6</span>
          <span className="stat-desc">Stepper Motors</span>
        </div>
      </section>

      {/* Section 1: Mechanical Design - Text Left, Image Right */}
      <section className="shinkei-section">
        <div className="shinkei-text">
          <span className="shinkei-label">MECHANICAL DESIGN</span>
          <h2 className="shinkei-heading">
            Built for speed, precision,<br />
            and modularity.
          </h2>
          <p>
            Every component is custom-designed and 3D printed to enable independent rotation 
            of each cube face. The fully modular architecture allows for easy maintenance 
            and iterative improvements.
          </p>
          <p>
            End effectors are optimized for precise control and minimal backlash. The design 
            was refined through multiple prototypes to achieve optimal balance between speed, 
            reliability, and robustness.
          </p>
        </div>
        <div className="shinkei-image">
          <img src={rubiksDrawing} alt="Rubik's Cube Robot CAD Drawing" />
        </div>
      </section>

      {/* Section 2: Video Demo - Image Left, Text Right */}
      <section className="shinkei-section shinkei-section-reverse">
        <div className="shinkei-video-container">
          <div 
            className="shinkei-video-wrapper"
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
              className="shinkei-video"
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
              <div className="shinkei-replay-overlay" onClick={handleReplay}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
                <span>Replay</span>
              </div>
            )}
          </div>
          <div className="shinkei-timer">
            <span className="timer-label">SOLVE TIME</span>
            <span className="timer-value">{timerValue.toFixed(3)}s</span>
          </div>
        </div>
        <div className="shinkei-text">
          <span className="shinkei-label">LIVE DEMONSTRATION</span>
          <h2 className="shinkei-heading">
            Watch a complete solve<br />
            in under one second.
          </h2>
          <p>
            The synchronized timer displays actual solve duration from the moment 
            the first face turns until the final move completes. Each solve averages 
            fewer than 20 moves using the Kociemba algorithm.
          </p>
          <p>
            The robot processes cube state via computer vision, computes an optimal 
            solution path, and executes the moves with precise stepper motor control.
          </p>
        </div>
      </section>

      {/* Section 3: Electrical - Text Left, Image Right */}
      <section className="shinkei-section">
        <div className="shinkei-text">
          <span className="shinkei-label">ELECTRICAL SYSTEM</span>
          <h2 className="shinkei-heading">
            Reliable motor control<br />
            and sensor integration.
          </h2>
          <p>
            The electrical system bridges computer vision with mechanical actuation. 
            An Arduino MEGA 2560 coordinates six TMC 2209 stepper motor drivers for 
            smooth, precise rotation of each cube face.
          </p>
          <ul className="shinkei-list">
            <li>Arduino MEGA 2560 microcontroller</li>
            <li>6× TMC 2209 V2.0 stepper drivers</li>
            <li>6× NEMA 17 stepper motors</li>
            <li>Pull-up resistors and decoupling capacitors</li>
          </ul>
        </div>
        <div className="shinkei-image shinkei-image-components">
          <img src={tmcDriver} alt="TMC 2209 Stepper Driver" className="component-img driver" />
          <img src={nema17} alt="NEMA 17 Stepper Motor" className="component-img motor" />
        </div>
      </section>

      {/* Section 4: Software - Image Left, Text Right */}
      <section className="shinkei-section shinkei-section-reverse">
        <div className="shinkei-image">
          <img src={arduinoMega} alt="Arduino MEGA 2560" />
        </div>
        <div className="shinkei-text">
          <span className="shinkei-label">FIRMWARE</span>
          <h2 className="shinkei-heading">
            Real-time control<br />
            with interrupt-driven architecture.
          </h2>
          <p>
            The C++ firmware manages stepper motor timing, serial communication 
            with the vision system, and move execution. Interrupt-driven design 
            ensures responsive sensor feedback during high-speed operations.
          </p>
          <ul className="shinkei-list">
            <li>Precise timing for stepper motor control</li>
            <li>Communication protocols for vision interface</li>
            <li>Configurable motor RPM settings</li>
            <li>Comprehensive error handling</li>
          </ul>
        </div>
      </section>

      {/* Section 5: GUI & Algorithm - Text Left, Image Right */}
      <section className="shinkei-section">
        <div className="shinkei-text">
          <span className="shinkei-label">SOLVING ALGORITHM & INTERFACE</span>
          <h2 className="shinkei-heading">
            Kociemba algorithm<br />
            with real-time visualization.
          </h2>
          <p>
            Computer vision detects cube state through color recognition. The Kociemba 
            algorithm computes near-optimal solutions, typically under 20 moves. A Python 
            GUI provides real-time visualization of solving progress.
          </p>
          <p>
            The system achieves consistent sub-second solve times while maintaining 
            high accuracy in cube state detection across varying lighting conditions.
          </p>
        </div>
        <div className="shinkei-image">
          <img src={rubiksGUI} alt="Rubik's Cube Solving GUI" />
        </div>
      </section>

      {/* Resources Section */}
      <section className="shinkei-resources">
        <span className="shinkei-label">RESOURCES</span>
        <div className="shinkei-links">
          <a href="https://www.youtube.com/shorts/J1a7RxK03xU" target="_blank" rel="noopener noreferrer">
            Watch Full Video
            <span className="link-arrow">→</span>
          </a>
          <a href="https://cad.onshape.com/documents/e64e9adb0ff9466627b47f67/w/74a34c291195daf66dba9b40/e/ef19ed1914f1db15c2699f69" target="_blank" rel="noopener noreferrer">
            View CAD Models
            <span className="link-arrow">→</span>
          </a>
          <a href="https://docs.google.com/presentation/d/12Rsq6fVtxUd_KKTxoM-D5vIqgpLokWzd/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer">
            Project Slides
            <span className="link-arrow">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="shinkei-footer">
        <Link to="/#projects" className="shinkei-back" onClick={handleBackClick}>
          <span className="back-arrow">←</span>
          Back to Projects
        </Link>
      </footer>
    </div>
  );
}

export default RubiksCubeProject;
