import { Link } from 'react-router-dom';
import srprojImage from '../assets/srproj.png';
import blackscholesImage from '../assets/blackscholes.png';

function FinancialDerivativesProject() {
  return (
    <div className="project-detail-page">
      <div className="project-detail-header">
        <Link to="/#projects" className="back-button">Back to Home</Link>
        <h1>Pricing Financial Derivatives</h1>
      </div>
      
      <div className="project-detail-content">
        <div className="project-hero-image">
          <img src={srprojImage} alt="Financial Derivatives Project" />
        </div>
        
        <div className="project-section">
          <h2>Overview</h2>
          <p className="project-description">
            Conducted a brief exploration of the world of mathematical and quantitative finance 
            through CAPM, PCA, and Black Scholes Merton options model.
          </p>
          <p>
            This research project delves into the fundamental models that underpin modern quantitative 
            finance. Through rigorous mathematical analysis and computational implementation, I explored 
            how these models are used to price derivatives, assess risk, and optimize portfolios in 
            financial markets.
          </p>
        </div>
        
        <div className="project-section">
          <h2>Research Areas</h2>
          <p>
            This project delved into several key areas of quantitative finance:
          </p>
          <ul>
            <li><strong>Capital Asset Pricing Model (CAPM):</strong> Understanding risk-return relationships in financial markets</li>
            <li><strong>Principal Component Analysis:</strong> Dimensionality reduction techniques for portfolio analysis</li>
            <li><strong>Black-Scholes-Merton Model:</strong> Options pricing using stochastic differential equations</li>
            <li><strong>Numerical Methods:</strong> Computational approaches to solving complex financial models</li>
          </ul>
          <div className="project-tech">
            <span className="tech-tag">Financial Derivatives</span>
            <span className="tech-tag">PC Analysis</span>
            <span className="tech-tag">Numerical Methods</span>
            <span className="tech-tag">Linear Algebra</span>
            <span className="tech-tag">Differential Equations</span>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Black-Scholes Model</h2>
          <div className="project-gallery">
            <img src={blackscholesImage} alt="Black-Scholes Model Visualization" />
          </div>
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
          <Link to="/#projects" className="back-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default FinancialDerivativesProject;

