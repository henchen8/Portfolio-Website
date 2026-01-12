import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import rubiksDrawing from '../assets/1rubiksdrawing.png';
import rubiksImage from '../assets/rubiks1.jpeg';
import rubiksGUI from '../assets/websiterubiksimg1.png';
import tmcDriver from '../assets/portTMC2209.png';
import nema17 from '../assets/PORTFOLIONEMA17.png';
import arduinoMega from '../assets/PORTarduinomega.png';

function RubiksCubeProject() {
  const [timerValue, setTimerValue] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const timerIntervalRef = useRef(null);
  const videoRef = useRef(null);
  const isHoveringRef = useRef(false); // Track hover state for use in event handlers

  // ============================================
  // 📍 START/END CONDITIONS - Video timestamps where solve starts and ends
  // ============================================
  const SOLVE_START_TIME = 0.02; // seconds when cube starts turning in video timeline
  const SOLVE_END_TIME = 1.51; // seconds when last turn is done in video timeline
  // ============================================
  
  // ============================================
  // 🎯 TARGET SOLVE TIME - What time to display when solve completes
  // ============================================
  const TARGET_SOLVE_TIME = 0.997; // Target displayed solve time in seconds
  // ============================================
  
  // Calculate scaling and playback rate
  const ACTUAL_VIDEO_DURATION = SOLVE_END_TIME - SOLVE_START_TIME; // 1.35 seconds in video timeline
  const TIMER_SCALE = TARGET_SOLVE_TIME / ACTUAL_VIDEO_DURATION; // 0.997 / 1.35 ≈ 0.738
  const VIDEO_PLAYBACK_RATE = ACTUAL_VIDEO_DURATION / TARGET_SOLVE_TIME; // 1.35 / 0.997 ≈ 1.354x speed

  const handleBackClick = () => {
    sessionStorage.setItem('returnToHome', 'true');
  };

  useEffect(() => {
    // Set video playback rate to speed up video
    if (videoRef.current) {
      videoRef.current.playbackRate = VIDEO_PLAYBACK_RATE;
    }
  }, [VIDEO_PLAYBACK_RATE]);

  // Only play video when it's fully visible in viewport (first time only)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hasAutoPlayed = false;
    let playTimeout = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1 && !hasAutoPlayed) {
            // Video is fully visible for the first time - play after a short delay
            hasAutoPlayed = true;
            playTimeout = setTimeout(() => {
              video.play();
              // Disconnect observer after first auto-play - user controls video from here
              observer.disconnect();
            }, 250); // 0.25 second delay
          }
        });
      },
      {
        threshold: 1.0, // Only trigger when 100% of the video is visible
        rootMargin: '0px'
      }
    );

    observer.observe(video);

    return () => {
      if (playTimeout) clearTimeout(playTimeout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // ============================================
    // ⏱️ TIME UPDATE LOOP - Uses requestAnimationFrame for smooth updates
    // Syncs with browser refresh rate (~60fps) for buttery smooth timer display
    // ============================================
    const updateTimer = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        
        // Always sync timer with video position
        if (currentTime < SOLVE_START_TIME) {
          // Before solve starts - show 0
          setTimerValue(0);
        } else if (currentTime >= SOLVE_START_TIME && currentTime <= SOLVE_END_TIME) {
          // During solve - calculate elapsed time and scale to target solve time
          const actualElapsed = currentTime - SOLVE_START_TIME;
          const displayElapsed = actualElapsed * TIMER_SCALE; // Scale to show 0.997s at end
          setTimerValue(displayElapsed);
        } else if (currentTime > SOLVE_END_TIME) {
          // After solve completes - lock at target solve time
          setTimerValue(TARGET_SOLVE_TIME);
        }
      }
      
      // Schedule next update - creates smooth animation loop
      timerIntervalRef.current = requestAnimationFrame(updateTimer);
    };
    
    // Start the animation loop
    timerIntervalRef.current = requestAnimationFrame(updateTimer);
    // ============================================

    return () => {
      if (timerIntervalRef.current) {
        cancelAnimationFrame(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [TIMER_SCALE, SOLVE_START_TIME, SOLVE_END_TIME, TARGET_SOLVE_TIME]);

  const handleTimeUpdate = (e) => {
    // Timer now automatically syncs with video position
    // No manual start/stop needed - handled by the interval
  };

  const handleVideoEnded = (e) => {
    // Video ends - show replay overlay only if cursor is not on video
    if (!isHoveringRef.current) {
      setShowReplay(true);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowReplay(false);
    }
  };

  const handleSeeked = () => {
    // Timer automatically syncs with video position
  };

  const handlePause = () => {
    // Timer automatically syncs with video position
  };

  const handlePlay = () => {
    // Timer automatically syncs with video position
    // Ensure playback rate is maintained when user replays
    if (videoRef.current) {
      videoRef.current.playbackRate = VIDEO_PLAYBACK_RATE;
      setShowReplay(false);
    }
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
          <div style={{ flex: '1 1 550px', minWidth: '300px' }}>
            <div className="project-section">
              <h2>Overview</h2>
              <p className="project-description">
                Fully modular, autonomous cube-solving robot.
              </p>
              <p>
                This project integrates mechanical and electrical design, microcontroller programming, computer vision,
                and sophisticated cube solving algorithms to create a Rubik's Cube solving system.


              </p>
            </div>

            <div className="project-section">
              <h2>Notable Stats</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">1s</div>
                  <div className="stat-label">Solve Times</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">&lt;20</div>
                  <div className="stat-label">Turns Per Solve
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">&lt;$125</div>
                  <div className="stat-label">Total Cost
                  </div>
                </div>
              </div>
            </div>

            <div className="project-section" style={{ marginTop: 0 }}>
              <h2>Mechanical Design</h2>
              <p>
                The mechanical system features custom-designed 3D printed parts and mechanisms that house
                and allow each face of the cube to be rotated effectively and independently. Additionally,
                by nature, the fully-modular design lends itself to easy maintenance and future improvements.
                Key mechanical components include:
              </p>
              <ul>
                <li>• End effector optimized for precise control and preventing backlash  </li>
                <li>• Cube/motor interface connecting end effector with motor shaft</li>
                <li>• Base to hold the bottom 5 stepper motors</li>
                <li>• Removable "motor hat" that houses the top motor</li>
              </ul>
              <p>
                The mechanical design was iteratively refined through multiple prototypes to achieve optimal balance between
                speed, reliability, and robustness.
              </p>
            </div>
          </div>

          <div style={{ flex: '0 0 auto', maxWidth: '360px' }}>
            <div className="project-section">
              <h2>Live Demo</h2>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}>
                <div 
                  style={{ position: 'relative', width: '315px', height: '550px' }}
                  onMouseEnter={() => {
                    isHoveringRef.current = true;
                  }}
                  onMouseLeave={() => {
                    isHoveringRef.current = false;
                    // Show replay overlay when cursor leaves if video has ended
                    if (videoRef.current && videoRef.current.ended) {
                      setShowReplay(true);
                    }
                  }}
                >
                  <video
                    ref={videoRef}
                    loop={false}
                    playsInline
                    controls={!showReplay}
                    controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                    disablePictureInPicture={true}
                    disableRemotePlayback
                    className="no-pip-video"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      cursor: showReplay ? 'default' : 'pointer',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
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
                      // Set playback rate as soon as video loads
                      e.target.playbackRate = VIDEO_PLAYBACK_RATE;
                    }}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    onSeeked={handleSeeked}
                    onPause={handlePause}
                    onPlay={handlePlay}
                  >
                    <source src="/rubik_solve_vid0.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Replay overlay - shows when video ends (unless cursor was hovering) */}
                  {showReplay && (
                    <div
                      onClick={handleReplay}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        animation: 'fadeIn 0.25s ease-out'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.75rem',
                        animation: 'fadeInScale 0.25s ease-out'
                      }}>
                        <svg 
                          width="64" 
                          height="64" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                        </svg>
                        <span style={{
                          color: 'white',
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Replay
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #fafaf8 0%, #f0f0ed 100%)',
                  padding: '1.5rem 1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  width: '100%',
                  maxWidth: '360px'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#555',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem'
                  }}>
                    Solve Time
                  </div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: '#000000',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    lineHeight: '1'
                  }}>
                    {timerValue.toFixed(3)}s
                  </div>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: '1rem', marginLeft: '-35px' }}>
              <img
                src={rubiksDrawing}
                alt="Rubik's Cube Robot Design"
                style={{
                  width: '425px',
                  maxWidth: 'none',
                  height: 'auto',
                  borderRadius: '8px',
                  marginTop: '-35px'
                }}
              />
            </div>
          </div>
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
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '-25px' }}>
            <div style={{
              maxWidth: '390px',
              width: '100%',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <img
                src={tmcDriver}
                alt="TMC 2209 V2.0 Stepper Motor Driver"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  background: 'transparent',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            <img
              src={nema17}
              alt="NEMA 17 Stepper Motor"
              style={{
                maxWidth: '450px',
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                background: 'transparent',
                mixBlendMode: 'multiply',
                marginTop: '-17px'
              }}
            />
          </div>

          <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
            <div className="project-section">
              <h2>Electrical Design</h2>
              <p>
                The electrical system integrates the computer vision system with the 
                mechanical mechanisms by managing sensor interfacing and motor control.
                Key electrical features include:
              </p>
              <ul>
                <li>• Arduino MEGA 2560</li>
                <li>• 6 TMC 2209 V2.0 stepper motor drivers</li>
                <li>• 6 NEMA 17 stepper motors</li>
                <li>• 120+ jumper wires</li>
                <li>• 2 breadboards</li>
                <li>• 6 pull-up resistors (10kΩ)</li>
                <li>• 6 decoupling capacitors (100µF)</li>
              </ul>
              <p>
                The electrical design prioritizes reliability and performance, ensuring consistent operation during
                high-speed solving sequences.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          maxWidth: '1600px',
          margin: '0 auto 2rem',
          width: 'calc(100vw - 4rem)',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          padding: '0 2rem'
        }}>
          <div style={{ flex: '1 1 500px', minWidth: '300px', display: 'flex' }}>
            <div className="project-section" style={{ flex: 1, marginBottom: 0 }}>
              <h2>Microcontroller Software</h2>
              <p>
                The Arduino microcontroller integrates the solving algorithm
                with all the electrical and mechanical components. Key software features included:
              </p>
              <ul>
                <li>• Real-time stepper motor control with precise timing</li>
                <li>• Interrupt-driven architecture for responsive sensor feedback</li>
                <li>• Communication protocols for interfacing with computer vision system</li>
                <li>• Streamlined functions that take face and displacement parameters</li>
                <li>• Ability to configure motor rpm</li>
              </ul>
              <p>
                The firmware is written in C++ for maximum performance and includes comprehensive error handling
                and safety features to prevent damage during operation.
              </p>
            </div>
          </div>

          <div style={{ flex: '0 0 550px', display: 'flex' }}>
            <img
              src={arduinoMega}
              alt="Arduino MEGA 2560"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          maxWidth: '1600px',
          margin: '0 auto 2rem',
          width: 'calc(100vw - 4rem)',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          padding: '0 2rem'
        }}>
          <div style={{ flex: '0 0 350px', display: 'flex' }}>
            <img
              src={rubiksGUI}
              alt="Rubik's Cube GUI"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>

          <div style={{ flex: '1 1 500px', minWidth: '300px', display: 'flex' }}>
            <div className="project-section" style={{ flex: 1, marginBottom: 0 }}>
              <h2>Solving Algorithm & GUI</h2>
              <p>
                The solving system combines advanced algorithms with an intuitive user interface. Key features include:
              </p>
              <ul>
                <li>• Computer vision algorithms for cube state detection and color recognition</li>
                <li>• Optimized solving algorithms (CFOP method) for minimum move count</li>
                <li>• Real-time GUI displaying current cube state and solving progress</li>
                <li>• Statistical analysis of solve times and move optimization</li>
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

