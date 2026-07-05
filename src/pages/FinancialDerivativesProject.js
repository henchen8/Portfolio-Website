import { Link } from 'react-router-dom';
import srprojImage from '../assets/Capture-2026-01-01-134649.png';
import blackscholesImage from '../assets/blackscholes.png';
import simplifiedBlackscholesImage from '../assets/port_simplifiedblackscholes.png';
import famafrenchImage from '../assets/portfamafrench.png';
import './FinancialDerivativesProject.css';

function FinancialDerivativesProject() {
  const handleBackClick = () => {
    sessionStorage.setItem('returnToHome', 'true');
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
          <span className="shinkei-category">QUANTITATIVE FINANCE RESEARCH</span>
          <h1 className="shinkei-title">
            Complex mathematics<br />
            with real-world applications.
          </h1>
          <p className="shinkei-subtitle">
            An exploration of quantitative finance through CAPM, Principal Component Analysis, 
            and the Black-Scholes-Merton options pricing model. From retail investment fundamentals 
            to stochastic calculus and free boundary problems.
          </p>
        </div>
        <div className="shinkei-hero-image">
          <img src={srprojImage} alt="Financial Derivatives Research" />
        </div>
      </header>

      {/* Section 1: CAPM - Text Left, Image Right */}
      <section className="shinkei-section">
        <div className="shinkei-text">
          <span className="shinkei-label">CAPITAL ASSET PRICING MODEL</span>
          <h2 className="shinkei-heading">
            Understanding risk-return<br />
            relationships in markets.
          </h2>
          <p>
            The CAPM provides a framework for understanding the relationship between 
            systematic risk and expected return. It forms the foundation for modern 
            portfolio theory and quantitative risk management.
          </p>
          <ul className="shinkei-list">
            <li>Expected return via alpha and beta coefficients</li>
            <li>Systematic vs unsystematic risk decomposition</li>
            <li>Security market line and market equilibrium</li>
            <li>Portfolio optimization and efficient frontier</li>
          </ul>
        </div>
        <div className="shinkei-image">
          <div className="shinkei-equation">
            E(Ri) = Rf + βi(E(Rm) - Rf)
          </div>
        </div>
      </section>

      {/* Section 2: PCA - Image Left, Text Right */}
      <section className="shinkei-section shinkei-section-reverse shinkei-section-alt">
        <div className="shinkei-image">
          <img 
            src={famafrenchImage} 
            alt="Fama-French Principal Component Analysis" 
            className="shinkei-formula-img"
          />
        </div>
        <div className="shinkei-text">
          <span className="shinkei-label">PRINCIPAL COMPONENT ANALYSIS</span>
          <h2 className="shinkei-heading">
            Dimensionality reduction<br />
            for portfolio analysis.
          </h2>
          <p>
            PCA uses eigendecomposition and linear transformations to reduce complexity 
            in financial datasets. By ordering eigenvalues, we identify the principal 
            components that explain the most variance.
          </p>
          <ul className="shinkei-list">
            <li>Linear transformations on portfolio matrices</li>
            <li>Eigendecomposition for component identification</li>
            <li>Variance explained by each component</li>
            <li>Feature extraction in financial datasets</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Black-Scholes Intro - Text Left, Image Right */}
      <section className="shinkei-section">
        <div className="shinkei-text">
          <span className="shinkei-label">BLACK-SCHOLES-MERTON MODEL</span>
          <h2 className="shinkei-heading">
            Options pricing through<br />
            stochastic calculus.
          </h2>
          <p>
            The Black-Scholes-Merton model revolutionized derivatives pricing by providing 
            a closed-form solution for European options. It models stock prices as geometric 
            Brownian motion and derives pricing through risk-neutral valuation.
          </p>
          <p>
            Key assumptions include constant volatility, continuous trading, and no dividends. 
            The model uses the cumulative normal distribution for probability calculations.
          </p>
        </div>
        <div className="shinkei-image">
          <img 
            src={simplifiedBlackscholesImage} 
            alt="Black-Scholes Closed-Form Equation" 
            className="shinkei-formula-img"
          />
        </div>
      </section>

      {/* Section 4: Free Boundary - Image Left, Text Right */}
      <section className="shinkei-section shinkei-section-reverse shinkei-section-alt">
        <div className="shinkei-image">
          <img 
            src={blackscholesImage} 
            alt="Free Boundary Formula" 
            className="shinkei-formula-img"
          />
        </div>
        <div className="shinkei-text">
          <span className="shinkei-label">FREE BOUNDARY PROBLEMS</span>
          <h2 className="shinkei-heading">
            American options with<br />
            early exercise rights.
          </h2>
          <p>
            American options introduce early exercise rights, creating a moving boundary 
            between optimal hold and exercise regions. This transforms the pricing problem 
            into a free boundary PDE with complementarity conditions.
          </p>
          <ul className="shinkei-list">
            <li>Moving boundary between hold/exercise regions</li>
            <li>PDE with complementarity conditions</li>
            <li>No closed-form solution exists</li>
            <li>Requires numerical methods to solve</li>
          </ul>
        </div>
      </section>

      {/* Section 5: Numerical Methods - Text Left */}
      <section className="shinkei-section">
        <div className="shinkei-text">
          <span className="shinkei-label">NUMERICAL METHODS</span>
          <h2 className="shinkei-heading">
            Computational approaches<br />
            to complex models.
          </h2>
          <p>
            When analytical solutions don't exist, numerical methods provide the path forward. 
            Finite difference methods discretize the Black-Scholes PDE, while Monte Carlo 
            simulation leverages the law of large numbers for option pricing.
          </p>
          <ul className="shinkei-list">
            <li>Finite difference methods for PDE solving</li>
            <li>Itô calculus for stochastic differential equations</li>
            <li>Monte Carlo simulation for option pricing</li>
            <li>Binomial tree models for American options</li>
            <li>Numerical optimization algorithms</li>
          </ul>
        </div>
        <div className="shinkei-image">
          <div className="shinkei-equation" style={{ textAlign: 'left', fontSize: '0.95rem', fontFamily: "'Courier New', monospace", fontStyle: 'normal' }}>
            <div style={{ color: '#666', marginBottom: '0.5rem' }}># Monte Carlo pricing</div>
            <div>for i in range(n_simulations):</div>
            <div style={{ paddingLeft: '1rem' }}>S = S0 * exp((r - σ²/2)*T + σ*√T*Z)</div>
            <div style={{ paddingLeft: '1rem' }}>payoffs[i] = max(S - K, 0)</div>
            <div style={{ marginTop: '0.5rem' }}>price = exp(-r*T) * mean(payoffs)</div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="shinkei-resources">
        <span className="shinkei-label">RESOURCES</span>
        <div className="shinkei-links">
          <a href="https://youtu.be/doYoJWpjqiU" target="_blank" rel="noopener noreferrer">
            Watch Presentation
            <span className="link-arrow">→</span>
          </a>
          <a href="https://docs.google.com/presentation/d/129P1cS45KJAWDq-8KD_RfFEJdXTyp73k/edit?slide=id.p1#slide=id.p1" target="_blank" rel="noopener noreferrer">
            View Slides
            <span className="link-arrow">→</span>
          </a>
          <a href="https://docs.google.com/document/d/1O5VnQPQPrbvbTIRUn-OBa9-4rOL6O1LAE2362aLJe6o/edit?tab=t.0" target="_blank" rel="noopener noreferrer">
            Research Notes
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

export default FinancialDerivativesProject;
