import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import srprojImage from '../assets/Capture-2026-01-01-134649.png';
import blackscholesImage from '../assets/blackscholes.png';
import simplifiedBlackscholesImage from '../assets/port_simplifiedblackscholes.png';
import famafrenchImage from '../assets/portfamafrench.png';

function FinancialDerivativesProject() {
  const isMobile = useIsMobile(768); // Breakpoint at 768px
  
  const handleBackClick = () => {
    sessionStorage.setItem('returnToHome', 'true');
  };

  return (
    <div className="project-detail-page">
      <div className="project-detail-header">
        <Link to="/#projects" className="back-button" onClick={handleBackClick}>Back to Projects</Link>
        <h1>Pricing Financial Derivatives</h1>
      </div>
      
      <div className="project-detail-content">
        <div className="project-hero-image">
          <img src={srprojImage} alt="Financial Derivatives Project" />
        </div>
        
        <div className="project-section">
          <h2>Overview</h2>
          <p className="project-description">
            A brief exploration of the world of quantitative finance through CAPM, PCA, and Black-Scholes-Merton options model.
          </p>
          <p>
            The scope of this research project is split into two main areas: the first is educating individuals who are interested
            in retail investment, where concepts such as ETFs, dividends, and basic trading strategies are introduced. 
            The second half focuses more on the technical side—the application of data analytics, mathematics, 
            and numerical analysis to quantitative finance. Mathematical concepts discussed include linear 
            transformations on matrix representations of portfolios, eigendecomposition for PCA,
            in addition to a high-level overview of stochastic calculus and free boundary problems. 
          </p>
        </div>
        
        <div className="project-section">
          <h2>Capital Asset Pricing Model</h2>
          <p>
            Understanding risk-return relationships in financial markets through risk analysis.
            Key concepts explored include:
          </p>
          <ul>
            <li>• Expected return calculation using alpha and beta coefficients</li>
            <li>• Systematic vs unsystematic risk decomposition</li>
            <li>• Security market line and market equilibrium</li>
            <li>• Portfolio optimization and efficient frontier</li>
          </ul>
        </div>

        <div className="project-section">
          <h2>Principal Component Analysis</h2>
          <p>
            Dimensionality reduction techniques for portfolio analysis using eigendecomposition and linear transformations.
            Key mathematical concepts include:
          </p>
          <ul>
            <li>• Linear transformations on matrix representations of portfolios</li>
            <li>• Eigendecomposition ordering for principal component identification </li>
            <li>• Variance explained by each component</li>
            <li>• Feature extraction and data compression in financial datasets</li>
          </ul>
          <div style={{
            background: 'linear-gradient(135deg, #fafaf8 0%, #f0f0ed 100%)',
            borderRadius: '12px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginTop: isMobile ? '1.5rem' : '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={famafrenchImage}
                alt="Fama-French Principal Component Analysis"
                style={{
                  maxWidth: isMobile ? '100%' : '800px',
                  width: '100%',
                  height: 'auto',
                  mixBlendMode: 'multiply',
                  background: 'transparent'
                }}
              />
            </div>
          </div>
        </div>

        <div className="project-section">
          <h2>Black-Scholes-Merton Model</h2>
          <p>
            Options pricing using stochastic differential equations, free boundary problems, and stochastic calculus.
            Key theoretical foundations include:
          </p>
          <ul>
            <li>• Geometric Brownian motion for stock price modeling</li>
            <li>• Derivation of the Black-Scholes partial differential equation via CAPM, 
              differential heat transfer, etc.
            </li>
            <li>• Risk-neutral pricing and no-arbitrage principles</li>
            <li>• Put-call parity and arbitrage relationships for European and American options</li>
          </ul>
          
          {/* Simplified Formula Section */}
          <div style={{
            background: 'linear-gradient(135deg, #fafaf8 0%, #f0f0ed 100%)',
            borderRadius: '12px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginTop: isMobile ? '1.5rem' : '2.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.25rem' : '1.5rem', 
              fontWeight: '600',
              marginBottom: isMobile ? '1rem' : '1.5rem', 
              color: '#000000'
            }}>Closed-Form Equation</h3>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
              <img
                src={simplifiedBlackscholesImage}
                alt="Simplified Black-Scholes Formula"
                style={{
                  maxWidth: isMobile ? '100%' : '800px',
                  width: '100%',
                  height: 'auto',
                  mixBlendMode: 'multiply',
                  background: 'transparent'
                }}
              />
            </div>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Closed-form solution for pricing European put and call options</li>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Assumes constant volatility, constant risk-free rate, no dividends, and continuous trading</li>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Uses cumulative normal distribution function for probability calculations</li>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8' }}>• Inputs: stock price, strike price, time to expiration, risk-free rate, volatility</li>
            </ul>
          </div>

          {/* Free Boundary Formula Section */}
          <div style={{
            background: 'linear-gradient(135deg, #fafaf8 0%, #f0f0ed 100%)',
            borderRadius: '12px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginTop: isMobile ? '1rem' : '1.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.25rem' : '1.5rem', 
              fontWeight: '600',
              marginBottom: isMobile ? '1rem' : '1.5rem', 
              color: '#000000'
            }}>Free Boundary Formula</h3>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
              <img
                src={blackscholesImage}
                alt="Black-Scholes Free Boundary Formula"
                style={{
                  maxWidth: isMobile ? '100%' : '800px',
                  width: '100%',
                  height: 'auto',
                  mixBlendMode: 'multiply',
                  background: 'transparent'
                }}
              />
            </div>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Extends Black-Scholes to American options with early exercise rights</li>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Creates moving boundary between optimal hold vs exercise regions</li>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Results in PDE with complementarity conditions</li>
              <li style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', color: '#555', lineHeight: '1.8' }}>• Requires numerical methods to solve (no closed-form solution)</li>
            </ul>
          </div>
        </div>

        <div className="project-section">
          <h2>Numerical Methods</h2>
          <p>
            Computational approaches to solving complex financial models and implementing pricing algorithms.
            Key techniques explored include:
          </p>
          <ul>
            <li>• Finite difference methods for PDE solving</li>
            <li>• Itô calculus for stochastic differential equations</li>
            <li>• Monte Carlo simulation for option pricing</li>
            <li>• Binomial tree models for American options</li>
            <li>• Numerical multivariable optimization algorithms</li>
          </ul>
        </div>
        
        <div className="project-section">
          <h2>Resources</h2>
          <div className="project-links">
            <a href="https://youtu.be/doYoJWpjqiU" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Presentation</a>
            <a href="https://docs.google.com/presentation/d/129P1cS45KJAWDq-8KD_RfFEJdXTyp73k/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer" className="project-link-btn">Slides</a>
            <a href="https://docs.google.com/document/d/1O5VnQPQPrbvbTIRUn-OBa9-4rOL6O1LAE2362aLJe6o/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="project-link-btn">Research Notes</a>
          </div>
        </div>
        
        <div className="project-footer">
          <Link to="/#projects" className="back-button" onClick={handleBackClick}>Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}

export default FinancialDerivativesProject;

