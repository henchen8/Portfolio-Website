import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, memo, useLayoutEffect } from 'react';
import fitboxImage from '../assets/FitBoxlogo.png';
import explosionDrawing from '../assets/website_m&tsi explosion drawing.png';

// Figma-style iPhone mockup component with FitBox logo
// Memoized to prevent unnecessary re-renders that could interfere with loading screen
const IPhoneMockup = memo(({ logoSrc }) => {
  const phoneRef = useRef(null);
  const [showLoading, setShowLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [isActiveWorkout, setIsActiveWorkout] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isWorkoutHovering, setIsWorkoutHovering] = useState(false);
  const [isPauseWorkoutHovering, setIsPauseWorkoutHovering] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [currentWeight, setCurrentWeight] = useState(25);
  const [currentReps, setCurrentReps] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [cableDisplacement, setCableDisplacement] = useState([]); // Array of {time, position} points
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const workoutStartTime = useRef(null);
  const hasLoadedRef = useRef(false);
  // Store previous home state when navigating away
  const previousHomeState = useRef({ showWorkout: false, isActiveWorkout: false });

  const exercises = [
    { name: 'Bench Press', sets: 3, reps: 10 },
    { name: 'Shoulder Press', sets: 3, reps: 12 },
    { name: 'Tricep Extension', sets: 3, reps: 15 },
    { name: 'Chest Fly', sets: 3, reps: 12 },
    { name: 'Cable Lateral Raise', sets: 3, reps: 12 }
  ];

  const MIN_THRESHOLD_DISPLACEMENT = 80; // Minimum displacement goal in percentage

  // Defer IntersectionObserver setup until after page load to prevent blocking
  // Wait for page loading screen to complete before initializing observers
  useEffect(() => {
    // Check if page is still loading (body has 'loading' class)
    const checkPageLoaded = () => {
      const isPageLoading = document.body.classList.contains('loading') || 
                           document.documentElement.classList.contains('loading');
      return !isPageLoading;
    };

    // Wait for page to finish loading before setting up observers
    const initObserver = () => {
      const phone = phoneRef.current;
      if (!phone || hasLoadedRef.current) return;

      let loadingTimeout = null;
      let fadeTimeout = null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasLoadedRef.current) {
              // Phone is visible - start fade out after delay
              hasLoadedRef.current = true;
              loadingTimeout = setTimeout(() => {
                setIsFadingOut(true);
                fadeTimeout = setTimeout(() => {
                  setShowLoading(false);
                }, 600); // Fade out duration
                observer.disconnect();
              }, 650); // 1.2 second delay before fade starts
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% visible
          rootMargin: '0px'
        }
      );

      observer.observe(phone);

      return () => {
        if (loadingTimeout) clearTimeout(loadingTimeout);
        if (fadeTimeout) clearTimeout(fadeTimeout);
        observer.disconnect();
      };
    };

    // Wait for page load to complete (check every 50ms, max 2 seconds)
    let attempts = 0;
    const maxAttempts = 40; // 40 * 50ms = 2 seconds max wait
    const checkInterval = setInterval(() => {
      attempts++;
      if (checkPageLoaded() || attempts >= maxAttempts) {
        clearInterval(checkInterval);
        // Use requestIdleCallback if available, otherwise setTimeout
        if (window.requestIdleCallback) {
          requestIdleCallback(initObserver, { timeout: 1000 });
        } else {
          setTimeout(initObserver, 100);
        }
      }
    }, 50);

    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  // Update previousHomeState whenever home page state changes
  useEffect(() => {
    if (activePage === 'home') {
      previousHomeState.current = {
        showWorkout: showWorkout,
        isActiveWorkout: isActiveWorkout
      };
    }
  }, [activePage, showWorkout, isActiveWorkout]);

  // Handle wheel events on phone - prevent page scroll and enable internal scrolling
  // Defer setup until after page load to prevent interference with loading screen
  useEffect(() => {
    // Wait for page to finish loading before setting up wheel handler
    const checkPageLoaded = () => {
      const isPageLoading = document.body.classList.contains('loading') || 
                           document.documentElement.classList.contains('loading');
      return !isPageLoading;
    };

    const setupWheelHandler = () => {
      const phone = phoneRef.current;
      if (!phone) return;

      const handleWheel = (e) => {
        // Prevent page from scrolling
        e.preventDefault();
        
        // Find scrollable content within the phone and scroll it
        const scrollable = e.target.closest('[data-phone-scroll]');
        if (scrollable) {
          scrollable.scrollTop += e.deltaY;
        }
      };

      // Use native event listener with passive: false to allow preventDefault
      phone.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        phone.removeEventListener('wheel', handleWheel);
      };
    };

    // Wait for page load to complete
    let attempts = 0;
    const maxAttempts = 40;
    const checkInterval = setInterval(() => {
      attempts++;
      if (checkPageLoaded() || attempts >= maxAttempts) {
        clearInterval(checkInterval);
        // Defer wheel handler setup
        if (window.requestIdleCallback) {
          requestIdleCallback(setupWheelHandler, { timeout: 1000 });
        } else {
          setTimeout(setupWheelHandler, 100);
        }
      }
    }, 50);

    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  return (
  <>
    <style>{`
      .phone-scroll::-webkit-scrollbar {
        width: 2px;
      }
      .phone-scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      .phone-scroll::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 2px;
      }
      .phone-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.25);
      }
      .phone-scroll {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .insta-scroll::-webkit-scrollbar {
        width: 0px;
        display: none;
      }
      .insta-scroll {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .connection-pulse {
        animation: pulse 2s infinite;
      }
    `}</style>
    <div ref={phoneRef} style={{
      position: 'relative',
    width: '280px',
    height: '570px'
  }}>
    {/* iPhone 15 Pro Frame */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, #1f1f1f 0%, #0a0a0a 50%, #1a1a1a 100%)',
      borderRadius: '55px',
      padding: '8px'
    }}>
      {/* Titanium edge highlight */}
      <div style={{
        position: 'absolute',
        inset: '1px',
        borderRadius: '54px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
        pointerEvents: 'none'
      }} />
      
      {/* Screen area */}
      <div style={{
          width: '100%',
          height: '100%',
          background: '#f5f5e6',
          borderRadius: '47px',
          overflow: 'hidden',
          position: 'relative'
        }}>
        {/* Loading Screen Overlay */}
        {showLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#f5f5e6',
            borderRadius: '47px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            opacity: isFadingOut ? 0 : 1,
            transition: 'opacity 0.6s ease-out',
            pointerEvents: isFadingOut ? 'none' : 'auto'
          }}>
            <div style={{
              width: '140px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={logoSrc} 
                alt="FitBox Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }} 
              />
            </div>
          </div>
        )}

        {/* Active Workout GUI Overlay */}
        {isActiveWorkout && (
          <div style={{
            position: 'absolute',
            top: '50px',
            left: 0,
            right: 0,
            bottom: '80px',
            background: '#f5f5e6',
            borderRadius: '47px 47px 0 0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 250,
            padding: '4px 28px 46px 28px',
            overflow: 'visible',
            justifyContent: 'flex-start'
          }}>
            {/* Header with back button and connection indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
              marginTop: '0',
              position: 'relative'
            }}>
              <button
                onClick={() => setIsActiveWorkout(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '18px',
                  color: '#000',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                ←
              </button>
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '13px',
                fontWeight: '600',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                whiteSpace: 'nowrap'
              }}>Workout Active</div>
              {/* Subtle connection indicator in top right */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <div className={isConnected ? 'connection-pulse' : ''} style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isConnected ? '#4caf50' : '#f44336'
                }}></div>
              </div>
            </div>

            {/* Current Exercise */}
            <div style={{
              textAlign: 'center',
              marginBottom: '6px'
            }}>
              <div style={{
                fontSize: '10px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '4px'
              }}>
                Exercise {currentExercise + 1} of {exercises.length}
              </div>
              <div style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                marginBottom: '3px'
              }}>
                {exercises[currentExercise]?.name || 'Bench Press'}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                Set {Math.floor(currentReps / exercises[currentExercise]?.reps) + 1} of {exercises[currentExercise]?.sets || 3}
              </div>
            </div>

            {/* Weight Control */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              marginBottom: '4px',
              padding: '6px 0'
            }}>
              <button
                onClick={() => setCurrentWeight(Math.max(5, currentWeight - 5))}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.3';
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  border: 'none',
                  background: 'transparent',
                  color: '#000',
                  fontSize: '32px',
                  fontWeight: '200',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  transition: 'opacity 0.2s ease',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  opacity: 0.3,
                  lineHeight: '1',
                  padding: 0
                }}
              >
                −
              </button>
              
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '3px',
                minWidth: '90px'
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '100',
                  color: '#000',
                  fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
                  lineHeight: '1',
                  letterSpacing: '-2px'
                }}>
                  {currentWeight}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#999',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: '300',
                  marginLeft: '1px'
                }}>
                  lbs
                </div>
              </div>
              
              <button
                onClick={() => setCurrentWeight(Math.min(200, currentWeight + 5))}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.3';
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  border: 'none',
                  background: 'transparent',
                  color: '#000',
                  fontSize: '32px',
                  fontWeight: '200',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  transition: 'opacity 0.2s ease',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  opacity: 0.3,
                  lineHeight: '1',
                  padding: 0
                }}
              >
                +
              </button>
            </div>

            {/* Cable Displacement Graph */}
            <div style={{
              marginBottom: '4px',
              padding: '4px 0'
            }}>
              <div style={{
                fontSize: '8px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '4px',
                textAlign: 'center'
              }}>
                Cable Displacement
              </div>
              {/* Graph Area */}
              <div style={{ position: 'relative', height: '95px', marginBottom: '2px' }}>
                {/* Y-axis labels */}
                <div style={{ 
                  position: 'absolute', 
                  left: '0', 
                  top: '0', 
                  bottom: '16px', 
                  width: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}>
                  <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>100%</span>
                  <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>75%</span>
                  <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>50%</span>
                  <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>25%</span>
                  <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>0%</span>
                </div>
                
                {/* Chart area */}
                <div style={{ marginLeft: '28px', height: '85px', position: 'relative' }}>
                  <svg width="100%" height="85" viewBox="0 0 200 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                    {/* Grid lines */}
                    <line x1="0" y1="25" x2="200" y2="25" stroke="#e0e0e0" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="0" y1="50" x2="200" y2="50" stroke="#e0e0e0" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="0" y1="75" x2="200" y2="75" stroke="#e0e0e0" strokeWidth="0.5" strokeDasharray="2,2" />
                    
                    {/* Threshold line (goal) */}
                    <line 
                      x1="0" 
                      y1={100 - MIN_THRESHOLD_DISPLACEMENT} 
                      x2="200" 
                      y2={100 - MIN_THRESHOLD_DISPLACEMENT} 
                      stroke="#4caf50" 
                      strokeWidth="1" 
                      strokeDasharray="3,2"
                    />
                    
                    {/* Sample displacement data - position vs time (sinusoidal pattern with multiple rep cycles) */}
                    <polyline
                      points="0,82 2,75 4,65 6,52 8,38 10,28 12,22 14,18 16,25 18,35 20,48 22,62 24,72 26,78 28,75 30,68 32,58 34,45 36,32 38,23 40,15 42,24 44,34 46,48 48,62 50,74 52,85 54,78 56,70 58,58 60,45 62,32 64,24 66,22 68,22 70,30 72,42 74,56 76,68 78,76 80,82 82,75 84,65 86,52 88,38 90,28 92,22 94,18 96,25 98,35 100,48 102,62 104,72 106,78 108,75 110,68 112,58 114,45 116,32 118,24 120,15 122,24 124,34 126,48 128,62 130,74 132,85 134,78 136,70 138,58 140,45 142,32 144,24 146,22 148,22 150,30 152,42 154,56 156,68 158,76 160,82 162,75 164,65 166,52 168,38 170,28 172,22 174,18 176,25 178,35 180,48 182,62 184,72 186,78 188,75 190,68 192,58 194,45 196,32 198,24 200,18"
                      fill="none"
                      stroke="#000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Threshold label */}
                    <text 
                      x="195" 
                      y={100 - MIN_THRESHOLD_DISPLACEMENT - 2} 
                      fill="#4caf50" 
                      fontSize="6" 
                      fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
                      textAnchor="end"
                    >
                      Goal
                    </text>
                  </svg>
                  
                  {/* X-axis label */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '7px',
                    color: '#666',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                  }}>
                    Time
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '0',
              padding: '4px 0'
            }}>
              {/* Reps */}
              <div style={{
                textAlign: 'center',
                flex: 1
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  lineHeight: '1',
                  marginBottom: '3px'
                }}>
                  {currentReps || 8}
                </div>
                <div style={{
                  fontSize: '9px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Reps
                </div>
              </div>
              
              {/* Divider */}
              <div style={{
                width: '1px',
                background: '#ddd',
                margin: '0 6px'
              }}></div>

              {/* Calories */}
              <div style={{
                textAlign: 'center',
                flex: 1
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  lineHeight: '1',
                  marginBottom: '3px'
                }}>
                  {Math.round(totalCalories) || 56}
                </div>
                <div style={{
                  fontSize: '9px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Calories
                </div>
              </div>
            </div>

            {/* Pause/End Workout Button */}
            <button
              onClick={() => setIsActiveWorkout(false)}
              onMouseEnter={() => setIsPauseWorkoutHovering(true)}
              onMouseLeave={() => setIsPauseWorkoutHovering(false)}
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '28px',
                right: '28px',
                width: 'auto',
                height: 'auto',
                marginTop: '0',
                marginBottom: '0',
                padding: '14px',
                background: isPauseWorkoutHovering ? '#000' : 'transparent',
                border: '1.5px solid #000',
                borderRadius: '0',
                color: isPauseWorkoutHovering ? '#f5f5e6' : '#000',
                fontSize: '11px',
                fontWeight: '500',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                display: 'block'
              }}
            >
              Pause Workout
            </button>
          </div>
        )}

        {/* Workout GUI Overlay */}
        {showWorkout && !isActiveWorkout && (
          <div style={{
            position: 'absolute',
            top: '50px',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#f5f5e6',
            borderRadius: '47px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 200,
            padding: '6px 28px 72px 28px',
            overflow: 'hidden'
          }}>
            {/* Header with back button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              marginTop: '4px'
            }}>
              <button
                onClick={() => setShowWorkout(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '16px',
                  color: '#000',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                ←
              </button>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Upper Body Push</div>
              <div style={{ width: '32px' }}></div>
            </div>

            {/* Exercise list */}
            <div style={{
              flex: 1,
              overflowY: 'hidden',
              marginBottom: '0'
            }}>
              <div style={{
                fontSize: '10px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '10px'
              }}>Exercises</div>
              
              {/* Exercise 1 */}
              <div style={{
                background: '#f5f5e6',
                borderRadius: '12px',
                padding: '6px 12px',
                marginBottom: '6px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '2px'
                }}>Bench Press</div>
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 10 reps</div>
              </div>

              {/* Exercise 2 */}
              <div style={{
                background: '#f5f5e6',
                borderRadius: '12px',
                padding: '6px 12px',
                marginBottom: '6px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '2px'
                }}>Shoulder Press</div>
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 12 reps</div>
              </div>

              {/* Exercise 3 */}
              <div style={{
                background: '#f5f5e6',
                borderRadius: '12px',
                padding: '6px 12px',
                marginBottom: '6px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '2px'
                }}>Tricep Extension</div>
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 15 reps</div>
              </div>

              {/* Exercise 4 */}
              <div style={{
                background: '#f5f5e6',
                borderRadius: '12px',
                padding: '6px 12px',
                marginBottom: '6px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '2px'
                }}>Chest Fly</div>
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 12 reps</div>
              </div>

              {/* Exercise 5 */}
              <div style={{
                background: '#f5f5e6',
                borderRadius: '12px',
                padding: '6px 12px',
                marginBottom: '6px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '2px'
                }}>Cable Lateral Raise</div>
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 12 reps</div>
              </div>
            </div>

            {/* Start workout button */}
            <button
              onClick={() => {
                setIsActiveWorkout(true);
                setCurrentExercise(0);
                setCurrentReps(0);
                setTotalCalories(0);
                setCableDisplacement([]);
              }}
              onMouseEnter={() => setIsWorkoutHovering(true)}
              onMouseLeave={() => setIsWorkoutHovering(false)}
              style={{
                position: 'absolute',
                bottom: '60px',
                left: '28px',
                right: '28px',
                width: 'auto',
                height: 'auto',
                marginTop: '0',
                marginBottom: '0',
                padding: '14px',
                background: isWorkoutHovering ? '#000' : 'transparent',
                border: '1.5px solid #000',
                borderRadius: '0',
                color: isWorkoutHovering ? '#f5f5e6' : '#000',
                fontSize: '11px',
                fontWeight: '500',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                display: 'block'
              }}
            >
              Start Workout
            </button>
          </div>
        )}

        {/* Background area behind status bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: '#f5f5e6',
          borderRadius: '47px 47px 0 0',
          zIndex: 1
        }} />
        
        {/* Dynamic Island - Always on top */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '84px',
          height: '24px',
          background: '#000',
          borderRadius: '12px',
          zIndex: 300
        }} />
        
        {/* Status Bar - Always on top */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '28px',
          right: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 300
        }}>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            color: '#000'
          }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {/* Signal bars */}
            <svg width="18" height="12" viewBox="0 0 18 12">
              <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#000" />
              <rect x="4" y="5" width="3" height="7" rx="0.5" fill="#000" />
              <rect x="8" y="2" width="3" height="10" rx="0.5" fill="#000" />
              <rect x="12" y="0" width="3" height="12" rx="0.5" fill="#000" />
            </svg>
            {/* Battery */}
            <svg width="27" height="13" viewBox="0 0 27 13">
              <rect x="0" y="1" width="23" height="11" rx="3" stroke="#000" strokeWidth="1" fill="none" />
              <rect x="24" y="4" width="2.5" height="5" rx="1" fill="#000" />
              <rect x="2" y="3" width="19" height="7" rx="1.5" fill="#000" />
            </svg>
          </div>
        </div>
        
        {/* App Content */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '0',
          right: '0',
          bottom: '0',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 28px',
          background: '#f5f5e6'
        }}>
          
          {/* HOME PAGE */}
          {activePage === 'home' && !isActiveWorkout && (
            <>
              {/* Greeting */}
              <div style={{
                fontSize: '14px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: '500',
                marginBottom: '8px',
                marginTop: '-4px'
              }}>Welcome back, Henry!</div>
              
              {/* Streak and Strength Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                {/* Streak */}
                <div>
                  <div style={{
                    fontSize: '42px',
                    fontWeight: '200',
                    color: '#000',
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
                    letterSpacing: '-2px',
                    lineHeight: '1'
                  }}>12</div>
                  <div style={{
                    fontSize: '10px',
                    color: '#666',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginTop: '4px'
                  }}>Day Streak</div>
                </div>
                
                {/* Divider */}
                <div style={{ width: '1px', background: '#ddd', margin: '0 20px' }} />
                
                {/* Strength Progress */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '42px',
                    fontWeight: '200',
                    color: '#000',
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
                    letterSpacing: '-2px',
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'flex-end',
                    gap: '2px'
                  }}>
                    <span>+18</span>
                    <span style={{ fontSize: '22px', fontWeight: '300', marginLeft: '1px' }}>%</span>
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#666',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginTop: '4px',
                    lineHeight: '1.4'
                  }}>
                    <div>Strength</div>
                    <div style={{ fontSize: '7px', letterSpacing: '1px', marginTop: '2px' }}>This Month</div>
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div style={{ height: '1px', background: '#ddd', marginBottom: '10px' }} />
              
              {/* Today's Workout - Enhanced card design */}
              <div style={{
                marginBottom: '12px'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '6px'
                }}>Today</div>
                
                <div style={{
                  background: '#f5f5e6',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '12px 16px',
                  borderRadius: '0',
                  borderLeft: '2px solid #000'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#000',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    marginBottom: '3px'
                  }}>Upper Body Push</div>
                  
                  <div style={{
                    fontSize: '15px',
                    color: '#666',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    marginBottom: '0'
                  }}>45 min · Chest, shoulders, triceps</div>
                </div>
              </div>
              
              {/* Tomorrow's workout section */}
              <div style={{
                fontSize: '8px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '4px'
              }}>Tomorrow</div>
              
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                marginBottom: '2px'
              }}>Lower Body</div>
              
              <div style={{
                fontSize: '11px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                marginBottom: '0'
              }}>50 min · Quads, hamstrings, glutes</div>
              
              {/* Start Button - minimal outline style */}
              <button 
                onClick={() => setShowWorkout(true)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '28px',
                  right: '28px',
                  width: 'auto',
                  height: 'auto',
                  marginTop: '0',
                  marginBottom: '0',
                  padding: '14px',
                  background: isHovering ? '#000' : 'transparent',
                  border: '1.5px solid #000',
                  borderRadius: '0',
                  color: isHovering ? '#f5f5e6' : '#000',
                  fontSize: '11px',
                  fontWeight: '500',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  display: 'block'
                }}>
                Begin
              </button>
            </>
          )}
          
          {/* ANALYTICS PAGE */}
          {activePage === 'analytics' && !isActiveWorkout && (
            <>
              <div style={{
                fontSize: '10px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '4px',
                marginTop: '-8px'
              }}>Analytics</div>
              
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                marginBottom: '10px'
              }}>This Week</div>
              
              {/* Calories Chart */}
              <div style={{
                background: '#f5f5e6',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px'
              }}>
                <div style={{
                  fontSize: '8px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '8px'
                }}>Calories per Workout</div>
                
                {/* Line Chart */}
                <div style={{ position: 'relative', height: '70px', marginBottom: '4px' }}>
                  {/* Y-axis labels */}
                  <div style={{ position: 'absolute', left: '0', top: '0', bottom: '14px', width: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>600</span>
                    <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>300</span>
                    <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>0</span>
                  </div>
                  
                  {/* Chart area */}
                  <div style={{ marginLeft: '28px', height: '55px', position: 'relative' }}>
                    {/* Grid lines */}
                    <div style={{ position: 'absolute', top: '0', left: '0', right: '0', borderTop: '1px solid #eee' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', borderTop: '1px dashed #eee' }} />
                    <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', borderTop: '1px solid #ddd' }} />
                    
                    {/* SVG Line Chart */}
                    <svg width="100%" height="55" viewBox="0 0 160 55" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                      {/* Gradient fill under line */}
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#000" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#000" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area fill */}
                      <path
                        d="M 0 25 L 27 12 L 53 32 L 80 7 L 107 18 L 133 23 L 160 14 L 160 55 L 0 55 Z"
                        fill="url(#lineGradient)"
                      />
                      
                      {/* Line - values: 320, 480, 290, 520, 410, 380, 450 */}
                      <polyline
                        points="0,25 27,12 53,32 80,7 107,18 133,23 160,14"
                        fill="none"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Data points */}
                      {[
                        { x: 0, y: 25 },
                        { x: 27, y: 12 },
                        { x: 53, y: 32 },
                        { x: 80, y: 7 },
                        { x: 107, y: 18 },
                        { x: 133, y: 23 },
                        { x: 160, y: 14 }
                      ].map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="2.5" fill="#fff" stroke="#000" strokeWidth="1.5" />
                      ))}
                    </svg>
                    
                    {/* X-axis labels */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <span key={i} style={{ fontSize: '6px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{day}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '300',
                    color: '#000',
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif"
                  }}>2,850 <span style={{ fontSize: '10px', color: '#666' }}>cal</span></div>
                  <div style={{ fontSize: '9px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>7 workouts</div>
                </div>
              </div>
              
              {/* Workout Duration Chart */}
              <div style={{
                background: '#f5f5e6',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <div style={{
                  fontSize: '8px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '8px'
                }}>Workout Duration</div>
                
                {/* Line Chart for Duration */}
                <div style={{ position: 'relative', height: '70px', marginBottom: '4px' }}>
                  {/* Y-axis labels */}
                  <div style={{ position: 'absolute', left: '0', top: '0', bottom: '14px', width: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>60m</span>
                    <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>30m</span>
                    <span style={{ fontSize: '6px', color: '#999', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>0</span>
                  </div>
                  
                  {/* Chart area */}
                  <div style={{ marginLeft: '24px', height: '55px', position: 'relative' }}>
                    {/* Grid lines */}
                    <div style={{ position: 'absolute', top: '0', left: '0', right: '0', borderTop: '1px solid #e0e0e0' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', borderTop: '1px dashed #e0e0e0' }} />
                    <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', borderTop: '1px solid #ccc' }} />
                    
                    {/* SVG Line Chart */}
                    <svg width="100%" height="55" viewBox="0 0 160 55" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                      {/* Gradient fill under line */}
                      <defs>
                        <linearGradient id="durationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#666" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#666" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area fill - values: 45, 30, 50, 45, 35, 55, 40 min */}
                      <path
                        d="M 0 14 L 27 27.5 L 53 9 L 80 14 L 107 23 L 133 4.5 L 160 18 L 160 55 L 0 55 Z"
                        fill="url(#durationGradient)"
                      />
                      
                      {/* Line */}
                      <polyline
                        points="0,14 27,27.5 53,9 80,14 107,23 133,4.5 160,18"
                        fill="none"
                        stroke="#666"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Data points */}
                      {[
                        { x: 0, y: 14 },
                        { x: 27, y: 27.5 },
                        { x: 53, y: 9 },
                        { x: 80, y: 14 },
                        { x: 107, y: 23 },
                        { x: 133, y: 4.5 },
                        { x: 160, y: 18 }
                      ].map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="2.5" fill="#f5f5e6" stroke="#666" strokeWidth="1.5" />
                      ))}
                    </svg>
                    
                    {/* X-axis labels */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <span key={i} style={{ fontSize: '6px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{day}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '300',
                    color: '#000',
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif"
                  }}>300 <span style={{ fontSize: '10px', color: '#666' }}>min</span></div>
                  <div style={{ fontSize: '9px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>avg 43 min/workout</div>
                </div>
              </div>
            </>
          )}
          
          {/* FRIENDS PAGE - Social Feed */}
          {activePage === 'friends' && !isActiveWorkout && (
            <>
              <div style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                marginBottom: '14px',
                marginTop: '-6px'
              }}>Feed</div>
              
              {/* Social Feed */}
              <div data-phone-scroll className="phone-scroll" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0',
                overflowY: 'auto',
                flex: 1,
                paddingBottom: '60px',
                margin: '0 -28px'
              }}>
                {/* Post 1 - Workout */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>JK</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Jake Kim</div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>2 hours ago</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#000', 
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#fff',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', opacity: 0.6 }}>Workout Complete</div>
                    <div style={{ fontSize: '17px', fontWeight: '600', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '4px' }}>Full Body HIIT</div>
                    <div style={{ fontSize: '12px', opacity: 0.75 }}>45 min · 520 cal burned</div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>47</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>8</span>
                    </div>
                  </div>
                </div>

                {/* Post 2 - PR */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>SL</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Sarah Lee</div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>5 hours ago</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', 
                    borderRadius: '12px',
                    padding: '20px 16px',
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px', opacity: 0.7 }}>New Personal Record</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Deadlift 185 lbs</div>
                  </div>
                  
                  <div style={{ fontSize: '13px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '10px', lineHeight: '1.4' }}>
                    Finally hit my goal!
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>124</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>12</span>
                    </div>
                  </div>
                </div>

                {/* Post 3 - Streak */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>AL</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Amy Liu</div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>1 day ago</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#000', 
                    borderRadius: '12px',
                    padding: '20px 16px',
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '36px', fontWeight: '200', fontFamily: "'SF Pro Display', sans-serif", lineHeight: '1' }}>30</div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px', opacity: 0.7 }}>Day Streak</div>
                  </div>
                  
                  <div style={{ fontSize: '13px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '10px', lineHeight: '1.4' }}>
                    Who's with me?
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>89</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>24</span>
                    </div>
                  </div>
                </div>

                {/* Post 4 - Cardio */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>MT</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Mike Thompson</div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>3 hours ago</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#000', 
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#fff',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', opacity: 0.6 }}>Workout Complete</div>
                    <div style={{ fontSize: '17px', fontWeight: '600', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '4px' }}>Cardio Blast</div>
                    <div style={{ fontSize: '12px', opacity: 0.75 }}>30 min · 380 cal burned</div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>32</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>5</span>
                    </div>
                  </div>
                </div>

                {/* Post 5 - Strength Milestone */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>DR</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>David Rodriguez</div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>6 hours ago</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', 
                    borderRadius: '12px',
                    padding: '20px 16px',
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px', opacity: 0.7 }}>Strength Milestone</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Bench Press 225 lbs</div>
                  </div>
                  
                  <div style={{ fontSize: '13px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '10px', lineHeight: '1.4' }}>
                    Two plates! 💪
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>156</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>18</span>
                    </div>
                  </div>
                </div>

                {/* Post 6 - Yoga Session */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>EW</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Emma Wilson</div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>1 day ago</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#000', 
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#fff',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', opacity: 0.6 }}>Workout Complete</div>
                    <div style={{ fontSize: '17px', fontWeight: '600', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '4px' }}>Yoga Flow</div>
                    <div style={{ fontSize: '12px', opacity: 0.75 }}>60 min · 180 cal burned</div>
                  </div>
                  
                  <div style={{ fontSize: '13px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '10px', lineHeight: '1.4' }}>
                    Perfect way to end the day 🧘
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>28</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>7</span>
                    </div>
                  </div>
                </div>

                {/* Post 7 - Weekly Goal */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>CM</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Chris Martinez</div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>2 days ago</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#000', 
                    borderRadius: '12px',
                    padding: '20px 16px',
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px', opacity: 0.7 }}>Weekly Goal Achieved</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>5/5 Workouts</div>
                  </div>
                  
                  <div style={{ fontSize: '13px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', marginBottom: '10px', lineHeight: '1.4' }}>
                    Crushed it this week! 🔥
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>67</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: '12px', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>11</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* COMPETE PAGE */}
          {activePage === 'compete' && !isActiveWorkout && (
            <>
              <div style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                marginBottom: '14px',
                marginTop: '-6px'
              }}>Challenges</div>
              
              {/* Challenges List */}
              <div data-phone-scroll className="phone-scroll" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0',
                overflowY: 'auto',
                flex: 1,
                paddingBottom: '60px',
                margin: '0 -28px'
              }}>
                {/* Active Section Label */}
                <div style={{ 
                  padding: '8px 16px',
                  fontSize: '11px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: '1px solid #e0e0e0'
                }}>Active</div>
                
                {/* Challenge 1 - Winning */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>JK</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Push-Up Challenge</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>vs Jake Kim · 2 days left</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#22c55e', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>42-38</div>
                      <div style={{ fontSize: '9px', color: '#22c55e', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Winning</div>
                    </div>
                  </div>
                </div>
                
                {/* Challenge 2 - Losing */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>SL</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Squat Challenge</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>vs Sarah Lee · 5 days left</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#ef4444', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>35-41</div>
                      <div style={{ fontSize: '9px', color: '#ef4444', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Behind</div>
                    </div>
                  </div>
                </div>
                
                {/* Pending Section Label */}
                <div style={{ 
                  padding: '8px 16px',
                  fontSize: '11px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: '1px solid #e0e0e0',
                  marginTop: '8px'
                }}>Pending Invites</div>
                
                {/* Pending 1 */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>MT</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Plank Hold</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>from Mike Thompson</div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      background: '#000',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      cursor: 'pointer'
                    }}>Accept</button>
                  </div>
                </div>
                
                {/* Pending 2 */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>AL</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Burpee Blast</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>from Amy Liu</div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      background: '#000',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      cursor: 'pointer'
                    }}>Accept</button>
                  </div>
                </div>
                
                {/* Pending 3 */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>DR</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Pull-Up Challenge</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>from David Rodriguez</div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      background: '#000',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      cursor: 'pointer'
                    }}>Accept</button>
                  </div>
                </div>
                
                {/* Pending 4 */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>EW</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Mile Run</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>from Emma Wilson</div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      background: '#000',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      cursor: 'pointer'
                    }}>Accept</button>
                  </div>
                </div>
                
                {/* Pending 5 */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>CM</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Core Challenge</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>from Chris Martinez</div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      background: '#000',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      cursor: 'pointer'
                    }}>Accept</button>
                  </div>
                </div>
                
                {/* Pending 6 */}
                <div style={{ borderBottom: '1px solid #e0e0e0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>JK</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Bench Press Max</div>
                      <div style={{ fontSize: '11px', color: '#666', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>from Jake Kim</div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      background: '#000',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      cursor: 'pointer'
                    }}>Accept</button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Bottom Navigation Bar */}
          <div style={{
            position: 'absolute',
            bottom: showLoading ? '-60px' : '16px',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '6px 16px',
            background: '#f5f5e6',
            zIndex: 1000,
            transition: 'bottom 0.2s ease-out, opacity 0.2s ease-out',
            opacity: showLoading ? 0 : 1
          }}>
            {/* Home */}
            <div 
              onClick={() => {
                // Always go to main home page
                setIsActiveWorkout(false);
                setShowWorkout(false);
                setActivePage('home');
              }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                cursor: 'pointer',
                opacity: activePage === 'home' ? 1 : 0.5
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span style={{ fontSize: '7px', marginTop: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#000', fontWeight: activePage === 'home' ? '600' : '400' }}>Home</span>
            </div>
            
            {/* Analytics */}
            <div 
              onClick={() => {
                // Save current home state before navigating away
                if (activePage === 'home') {
                  previousHomeState.current = {
                    showWorkout: showWorkout,
                    isActiveWorkout: isActiveWorkout
                  };
                }
                setIsActiveWorkout(false);
                setShowWorkout(false);
                setActivePage('analytics');
              }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                cursor: 'pointer',
                opacity: activePage === 'analytics' ? 1 : 0.5
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span style={{ fontSize: '7px', marginTop: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#000', fontWeight: activePage === 'analytics' ? '600' : '400' }}>Analytics</span>
            </div>
            
            {/* Social/Chat */}
            <div 
              onClick={() => {
                // Save current home state before navigating away
                if (activePage === 'home') {
                  previousHomeState.current = {
                    showWorkout: showWorkout,
                    isActiveWorkout: isActiveWorkout
                  };
                }
                setIsActiveWorkout(false);
                setShowWorkout(false);
                setActivePage('friends');
              }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                cursor: 'pointer',
                opacity: activePage === 'friends' ? 1 : 0.5
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span style={{ fontSize: '7px', marginTop: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#000', fontWeight: activePage === 'friends' ? '600' : '400' }}>Friends</span>
            </div>
            
            {/* Competition/Leaderboard */}
            <div 
              onClick={() => {
                // Save current home state before navigating away
                if (activePage === 'home') {
                  previousHomeState.current = {
                    showWorkout: showWorkout,
                    isActiveWorkout: isActiveWorkout
                  };
                }
                setIsActiveWorkout(false);
                setShowWorkout(false);
                setActivePage('compete');
              }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                cursor: 'pointer',
                opacity: activePage === 'compete' ? 1 : 0.5
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              <span style={{ fontSize: '7px', marginTop: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#000', fontWeight: activePage === 'compete' ? '600' : '400' }}>Compete</span>
            </div>
          </div>
          
          {/* Home Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            background: '#000',
            borderRadius: '2px',
            zIndex: 1001
          }} />
        </div>
      </div>
    </div>
    
    {/* Side Buttons */}
    {/* Silent switch */}
    <div style={{
      position: 'absolute',
      left: '-3px',
      top: '100px',
      width: '4px',
      height: '28px',
      background: 'linear-gradient(90deg, #2a2a2a, #1a1a1a)',
      borderRadius: '2px 0 0 2px'
    }} />
    {/* Volume Up */}
    <div style={{
      position: 'absolute',
      left: '-3px',
      top: '150px',
      width: '4px',
      height: '50px',
      background: 'linear-gradient(90deg, #2a2a2a, #1a1a1a)',
      borderRadius: '2px 0 0 2px'
    }} />
    {/* Volume Down */}
    <div style={{
      position: 'absolute',
      left: '-3px',
      top: '210px',
      width: '4px',
      height: '50px',
      background: 'linear-gradient(90deg, #2a2a2a, #1a1a1a)',
      borderRadius: '2px 0 0 2px'
    }} />
    {/* Power Button */}
    <div style={{
      position: 'absolute',
      right: '-3px',
      top: '160px',
      width: '4px',
      height: '70px',
      background: 'linear-gradient(90deg, #1a1a1a, #2a2a2a)',
      borderRadius: '0 2px 2px 0'
    }} />
  </div>
  </>
  );
});

function FitBoxProject() {
  const [shouldRenderPhone, setShouldRenderPhone] = useState(false);

  const handleBackClick = () => {
    sessionStorage.setItem('returnToHome', 'true');
  };

  // Ensure scroll to 90px happens after component is fully loaded and layout is stable
  // This is needed because FitBoxProject is lazy-loaded and the scroll in App.js
  // happens before the component is fully rendered
  useLayoutEffect(() => {
    const checkPageLoaded = () => {
      const isPageLoading = document.body.classList.contains('loading') || 
                           document.documentElement.classList.contains('loading');
      return !isPageLoading;
    };

    let checkInterval = null;
    let scrollTimeout = null;

    const scrollToPosition = () => {
      // Add a small delay to ensure layout is stable after component renders
      scrollTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 90);
        });
      }, 100);
    };

    // Wait for page load to complete, then scroll to 90px (matching App.js behavior)
    if (checkPageLoaded()) {
      // Loading already complete, scroll after a brief delay for layout stability
      scrollToPosition();
    } else {
      // Wait for loading screen to complete
      let attempts = 0;
      const maxAttempts = 50; // 50 * 50ms = 2.5 seconds max wait
      checkInterval = setInterval(() => {
        attempts++;
        if (checkPageLoaded() || attempts >= maxAttempts) {
          if (checkInterval) {
            clearInterval(checkInterval);
          }
          scrollToPosition();
        }
      }, 50);
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  // Defer IPhoneMockup rendering until after page loading screen completes
  // This prevents the large component from blocking the loading screen
  useEffect(() => {
    // Check if page is still loading
    const checkPageLoaded = () => {
      const isPageLoading = document.body.classList.contains('loading') || 
                           document.documentElement.classList.contains('loading');
      return !isPageLoading;
    };

    // Wait for page load to complete before rendering IPhoneMockup
    let attempts = 0;
    const maxAttempts = 50; // 50 * 50ms = 2.5 seconds max wait
    const checkInterval = setInterval(() => {
      attempts++;
      if (checkPageLoaded() || attempts >= maxAttempts) {
        clearInterval(checkInterval);
        // Use requestIdleCallback if available to defer rendering
        if (window.requestIdleCallback) {
          requestIdleCallback(() => {
            setShouldRenderPhone(true);
          }, { timeout: 2000 });
        } else {
          // Fallback: wait a bit after page load completes
          setTimeout(() => {
            setShouldRenderPhone(true);
          }, 200);
        }
      }
    }, 50);

    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div className="project-detail-page">
      <div className="project-detail-header">
        <Link to="/#projects" className="back-button" onClick={handleBackClick}>Back to Projects</Link>
        <h1>FitBox</h1>
      </div>
      
      <div className="project-detail-content">
        <div className="project-hero-image">
          <img src={fitboxImage} alt="FitBox" style={{ backgroundColor: 'white', padding: '40px' }} />
        </div>
        
        <div className="project-section">
          <h2>Overview</h2>
          <p className="project-description">
            A revolutionary portable workout solution.
          </p>
          <p>
            FitBox was developed during the Management and Technology Summer Institute at the University 
            of Pennsylvania. As technical Co-Founder, I  designed the GTM strategy and MVP,
            combining mechanical innovations with business strategy to create a practical fitness 
            solution for people on the go.
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
              src={explosionDrawing} 
              alt="FitBox Explosion Drawing" 
              style={{ 
                maxWidth: '600px', 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} 
            />
          </div>

          <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
            <div className="project-section">
              <h2>Product Design</h2>
              <p>
                Developed a compact, portable workout system using Onshape CAD. The mechanical design focuses on
                maximizing simulated weight resistance functionality while also optimizing portability footprint.
                Key design features include:
              </p>
              <ul>
                <li>• Modular resistance system for adjustable workout intensity</li>
                <li>• Compact folding mechanism for ease of storage and transport</li>
                <li>• Ergonomic grips and suction-powered attachment points</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="project-section" style={{ marginTop: '2rem' }}>
          <h2>Financial Modeling</h2>
          <p>
            Developed comprehensive financial projections and business models to validate the venture's viability.
            Key financial analyses include:
          </p>
          <ul>
            <li>• Unit economics and cost of goods sold (COGS) breakdown</li>
            <li>• Revenue projections and growth modeling</li>
            <li>• Break-even analysis and profitability timeline</li>
            <li>• Funding requirements and capital allocation strategy</li>
          </ul>
        </div>

        <div style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: '1600px',
          margin: '0 auto',
          width: 'calc(100vw - 4rem)',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          padding: '0 2rem'
        }}>
          <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
            <div className="project-section">
              <h2>User Experience</h2>
              <p>
                Designed user interface and interaction flow using Figma to create an intuitive companion app experience.
                Key UX elements include:
              </p>
              <ul>
                <li>• Workout tracking and progress visualization</li>
                <li>• Guided exercise routines with visual instructions</li>
                <li>• Personalized fitness goals and recommendations</li>
                <li>• Social comptetitions with friends for accountability and motivation. </li>
              </ul>
            </div>
          </div>

          <div style={{ 
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 0',
            marginTop: '-20px',
            minHeight: '570px' // Prevent layout shift when phone loads
          }}>
            {shouldRenderPhone ? (
              <IPhoneMockup logoSrc={fitboxImage} />
            ) : (
              <div style={{
                width: '280px',
                height: '570px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f5e6',
                borderRadius: '12px'
              }}>
                {/* Placeholder while phone loads */}
              </div>
            )}
          </div>
        </div>

        <div className="project-section">
          <h2>Electronics</h2>
          <p>
            Integrated Arduino-based control system for  functionality, enabling real-time workout feedback.
            Key electronic features include:
          </p>
          <ul>
            <li>• Sensor integration for rep counting and form detection</li>
            <li>• Bluetooth connectivity for mobile app synchronization</li>
            <li>• Dynamically adjustable resistance system</li>
            <li>• Integrated display that displays movement type, rep counts, and weight</li>
          </ul>
        </div>

        <div className="project-section">
          <h2>Business Strategy</h2>
          <p>
            Developed comprehensive go-to-market strategy and business plan to bring FitBox from concept to market.
            Key strategic elements include:
          </p>
          <ul>
            <li>• GTM: Direct-to-consumer launch via e-commerce, leveraging social media marketing and fitness influencer partnerships for initial traction</li>
            <li>• PMF: Targeting busy professionals and frequent travelers who want effective workouts without gym access or bulky equipment</li>
            <li>• TAM: Global home fitness equipment market valued at $14B+</li>
            <li>• SAM: Portable/compact fitness segment ~$2B in North America</li>
            <li>• SOM: Initial target of $20M capturing early adopters in urban professional demographic</li>
          </ul>
        </div>

        <div className="project-section">
          <h2>Technologies Used</h2>
          <div className="project-tech">
            <span className="tech-tag">Financial Modelling</span>
            <span className="tech-tag">Onshape</span>
            <span className="tech-tag">Figma</span>
            <span className="tech-tag">C</span>
            <span className="tech-tag">Arduino</span>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Resources</h2>
          <div className="project-links">
            <a href="https://youtu.be/JnfntLZAGBE" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Demo</a>
            <a href="https://docs.google.com/presentation/d/1XXMJS2hofXJqpHwX3uvxKPht97CCMyoBtOF3lLLi4Bc/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
            <a href="https://cad.onshape.com/documents/cfd0d20e2c53157ccca464c4/w/7b40b5013232732c438b29e9/e/784c86c2b4418326fd73f6e6" target="_blank" rel="noopener noreferrer" className="project-link-btn">CAD</a>
            <a href="https://docs.google.com/spreadsheets/d/1sKK92uZeAGJtolWAh7wznRvRncsIrT7I8mjkVkPdV6c/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="project-link-btn">Financial Modelling</a>
            <a href="https://docs.google.com/document/d/16BLjd1bWl2OHBLal30bFIdV5pIzva3wmQyLRJ9i1YFM/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="project-link-btn">Executive Summary</a>
          </div>
        </div>
        
        <div className="project-footer">
          <Link to="/#projects" className="back-button" onClick={handleBackClick}>Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}

export default FitBoxProject;

