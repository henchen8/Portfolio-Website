import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import fitboxImage from '../assets/FitBoxlogo.png';
import explosionDrawing from '../assets/website_m&tsi explosion drawing.png';

// Figma-style iPhone mockup component with FitBox logo
const IPhoneMockup = ({ logoSrc }) => {
  const phoneRef = useRef(null);
  const [showLoading, setShowLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const hasLoadedRef = useRef(false);

  // Show loading screen when phone scrolls into view (similar to Rubik's cube video)
  useEffect(() => {
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
            }, 800); // 0.8 second delay before fade starts
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
  }, []);

  return (
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

        {/* Workout GUI Overlay */}
        {showWorkout && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#f5f5e6',
            borderRadius: '47px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 200,
            padding: '24px 20px',
            overflow: 'hidden'
          }}>
            {/* Header with back button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
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
              }}>Push Day</div>
              <div style={{ width: '32px' }}></div>
            </div>

            {/* Exercise list */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '16px'
            }}>
              <div style={{
                fontSize: '10px',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '12px'
              }}>Exercises</div>
              
              {/* Exercise 1 */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '10px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '4px'
                }}>Bench Press</div>
                <div style={{
                  fontSize: '11px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 10 reps</div>
              </div>

              {/* Exercise 2 */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '10px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '4px'
                }}>Shoulder Press</div>
                <div style={{
                  fontSize: '11px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 12 reps</div>
              </div>

              {/* Exercise 3 */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '10px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  marginBottom: '4px'
                }}>Tricep Dips</div>
                <div style={{
                  fontSize: '11px',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}>3 sets × 15 reps</div>
              </div>
            </div>

            {/* Start workout button */}
            <button
              onClick={() => setShowWorkout(false)}
              style={{
                width: '100%',
                padding: '14px',
                background: '#000',
                border: 'none',
                borderRadius: '0',
                color: '#f5f5e6',
                fontSize: '11px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer'
              }}
            >
              Start Workout
            </button>
          </div>
        )}
        
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '84px',
          height: '24px',
          background: '#000',
          borderRadius: '12px',
          zIndex: 10
        }} />
        
        {/* Status Bar */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '28px',
          right: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 5
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
          {/* FitBox Logo */}
          <div style={{
            width: '130px',
            height: '42px',
            marginTop: '-8px',
            marginLeft: '-4px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center'
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
          
          {/* Greeting */}
          <div style={{
            fontSize: '14px',
            color: '#666',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: '500',
            marginBottom: '12px'
          }}>Welcome back, Henry!</div>
          
          {/* Streak and Strength Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '18px'
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
          <div style={{ height: '1px', background: '#ddd', marginBottom: '12px' }} />
          
          {/* Today's workout section */}
          <div style={{
            fontSize: '11px',
            color: '#666',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '8px'
          }}>Today</div>
          
          <div style={{
            fontSize: '24px',
            fontWeight: '500',
            color: '#000',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            marginBottom: '4px'
          }}>Push Day</div>
          
          <div style={{
            fontSize: '15px',
            color: '#666',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            marginBottom: '18px'
          }}>45 min · Chest, shoulders, triceps</div>
          
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
            marginBottom: '24px'
          }}>50 min · Quads, hamstrings, glutes</div>
          
          {/* Start Button - minimal outline style */}
          <button 
            onClick={() => setShowWorkout(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              width: '100%',
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
              marginBottom: '28px',
              transition: 'all 0.2s ease'
            }}>
            Begin
          </button>
          
          {/* Home Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            background: '#000',
            borderRadius: '2px'
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
  );
};

function FitBoxProject() {
  const handleBackClick = () => {
    sessionStorage.setItem('returnToHome', 'true');
  };

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
            of Pennsylvania. As Co-Founder and Mechanical Lead, I designed the go-to-market strategy and 
            (MVP), combining engineering innovation with business strategy to create a practical fitness 
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
                Created a compact, portable workout system using Onshape CAD. The mechanical design focuses on
                maximizing functionality while minimizing footprint for true portability.
                Key design features include:
              </p>
              <ul>
                <li>• Modular resistance system for adjustable workout intensity</li>
                <li>• Compact folding mechanism for easy storage and transport</li>
                <li>• Ergonomic grips and attachment points</li>
                <li>• Durable materials selected for longevity and weight optimization</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="project-section">
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
                Key UX considerations include:
              </p>
              <ul>
                <li>• Workout tracking and progress visualization</li>
                <li>• Guided exercise routines with visual instructions</li>
                <li>• Personalized fitness goals and recommendations</li>
                <li>• Social features for accountability and motivation</li>
              </ul>
            </div>
          </div>

          <div style={{ 
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 0',
            marginTop: '-20px'
          }}>
            <IPhoneMockup logoSrc={fitboxImage} />
          </div>
        </div>

        <div className="project-section">
          <h2>Electronics</h2>
          <p>
            Integrated Arduino-based control system for smart functionality, enabling real-time workout feedback.
            Key electronic features include:
          </p>
          <ul>
            <li>• Sensor integration for rep counting and form detection</li>
            <li>• Bluetooth connectivity for app synchronization</li>
            <li>• Low-power design for extended battery life</li>
            <li>• Modular PCB design for easy assembly and maintenance</li>
          </ul>
        </div>

        <div className="project-section">
          <h2>Business Strategy</h2>
          <p>
            Developed comprehensive go-to-market strategy and business plan to bring FitBox from concept to market.
            Key strategic elements include:
          </p>
          <ul>
            <li>• Go-to-Market: Direct-to-consumer launch via e-commerce, leveraging social media marketing and fitness influencer partnerships for initial traction</li>
            <li>• Product-Market Fit: Targeting busy professionals and frequent travelers who want effective workouts without gym access or bulky equipment</li>
            <li>• TAM: Global home fitness equipment market valued at $14B+</li>
            <li>• SAM: Portable/compact fitness segment ~$2B in North America</li>
            <li>• SOM: Initial target of $5M capturing early adopters in urban professional demographic</li>
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

