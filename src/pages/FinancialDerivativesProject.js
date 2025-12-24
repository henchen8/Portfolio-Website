import { Link } from 'react-router-dom';
import srprojImage from '../assets/srproj.png';
import blackscholesImage from '../assets/blackscholes.png';

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
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <img
              src={blackscholesImage}
              alt="Black-Scholes Model Equation"
              style={{
                maxWidth: '700px',
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
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

