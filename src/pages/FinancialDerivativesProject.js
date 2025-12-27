import { Link } from 'react-router-dom';
import srprojImage from '../assets/srproj.png';
import blackscholesImage from '../assets/blackscholes.png';
import simplifiedBlackscholesImage from '../assets/port_simplifiedblackscholes.png';

function FinancialDerivativesProject() {
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
            A breif exploration of the world of quantitative finance

            through CAPM, PCA, and Black Scholes Merton options model.
          </p>
          <p>
            This reserach project is split in to different foci: the first is educating the individual who is interested
            in retail investment, where concepts such as ETFs, dividends, and basic trading strategies are introduced. 
            The second half focuses more on the technical side—the applicaiton of data analytics, complex mathematical concepts, 
            and numerical analysisto quantitative finance. Topics discussed include CAPM, PCA, and the Black Scholes Merton options model. 
            Mathematical concepts discussed include linear transformations on matrix represenations of portfolios, eigendecomposition for PCA,
            in addition to a high level overview of stochastic calculus and free boundary problems. 

            
            
            This research project delves into the fundamental models that underpin modern quantitative 
            finance. Through rigorous mathematical analysis and computational implementation, I explored 
            how these models are used to price derivatives, assess risk, and optimize portfolios in 
            financial markets.
          </p>
        </div>
        
        <div className="project-section">
          <h2>Capital Asset Pricing Model</h2>
          <p>
            Understanding risk-return relationships in financial markets through systematic and unsystematic risk analysis.
            Key concepts explored include:
          </p>
          <ul>
            <li>• Expected return calculation using beta coefficients</li>
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
            <li>• Eigendecomposition for identifying principal components</li>
            <li>• Variance explained by each component</li>
            <li>• Feature extraction and data compression in financial datasets</li>
          </ul>
        </div>

        <div className="project-section">
          <h2>Black-Scholes-Merton Model</h2>
          <p>
            Options pricing using stochastic differential equations, free boundary problems, and stochastic calculus.
            Key theoretical foundations include:
          </p>
          <ul>
            <li>• Geometric Brownian motion for stock price modeling</li>
            <li>• Derivation of the Black-Scholes partial differential equation</li>
            <li>• Risk-neutral pricing and no-arbitrage principles</li>
            <li>• Put-call parity and arbitrage relationships</li>
            <li>• Greeks: Delta, Gamma, Theta, Vega, and Rho</li>
          </ul>
          
          {/* Simplified Formula Section */}
          <div style={{
            background: 'linear-gradient(135deg, #fafaf8 0%, #f0f0ed 100%)',
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '2.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              marginBottom: '1.5rem', 
              color: '#000000'
            }}>Simplified Formula</h3>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img
                src={simplifiedBlackscholesImage}
                alt="Simplified Black-Scholes Formula"
                style={{
                  maxWidth: '800px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Closed-form solution for pricing European call and put options</li>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Assumes constant volatility, no dividends, and continuous trading</li>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Uses cumulative normal distribution function for probability calculations</li>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8' }}>• Inputs: stock price, strike price, time to expiration, risk-free rate, volatility</li>
            </ul>
          </div>

          {/* Free Boundary Formula Section */}
          <div style={{
            background: 'linear-gradient(135deg, #fafaf8 0%, #f0f0ed 100%)',
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '1.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              marginBottom: '1.5rem', 
              color: '#000000'
            }}>Free Boundary Formula</h3>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img
                src={blackscholesImage}
                alt="Black-Scholes Free Boundary Formula"
                style={{
                  maxWidth: '800px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Extends Black-Scholes to handle American options with early exercise</li>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Creates moving boundary between optimal hold vs exercise regions</li>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '0.5rem' }}>• Results in PDE with complementarity conditions</li>
              <li style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8' }}>• Requires numerical methods to solve (no closed-form solution)</li>
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
            <li>• Monte Carlo simulation for option pricing</li>
            <li>• Binomial tree models for American options</li>
            <li>• Numerical integration and optimization algorithms</li>
          </ul>
        </div>
        
        <div className="project-section">
          <h2>Resources</h2>
          <div className="project-tech">
            <span className="tech-tag">Risk Analysis</span>
            <span className="tech-tag">Portfolio Theory</span>
            <span className="tech-tag">Linear Algebra</span>
            <span className="tech-tag">Data Analytics</span>
            <span className="tech-tag">Derivatives</span>
            <span className="tech-tag">Stochastic Calculus</span>
            <span className="tech-tag">Numerical Analysis</span>
            <span className="tech-tag">Algorithms</span>
          </div>
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

