import { Link } from 'react-router-dom';
import fitboxImage from '../assets/FitBoxlogo.png';

function FitBoxProject() {
  return (
    <div className="project-detail-page">
      <div className="project-detail-header">
        <Link to="/#projects" className="back-button">Back to Home</Link>
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
            built the minimum viable product (MVP), combining engineering innovation with business strategy 
            to create a practical fitness solution for people on the go.
          </p>
        </div>
        
        <div className="project-section">
          <h2>Development Process</h2>
          <p>
            This project combined entrepreneurship with engineering to create an innovative fitness solution:
          </p>
          <ul>
            <li><strong>Product Design:</strong> Created a compact, portable workout system using Onshape CAD</li>
            <li><strong>Financial Modeling:</strong> Developed comprehensive financial projections and business models</li>
            <li><strong>User Experience:</strong> Designed user interface and interaction flow using Figma</li>
            <li><strong>Electronics:</strong> Integrated Arduino-based control system for smart functionality</li>
            <li><strong>Business Strategy:</strong> Developed go-to-market strategy and executive summary</li>
          </ul>
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
            <a href="https://docs.google.com/spreadsheets/d/1uZ32Qh6mbSQrWwkWwTfcECNh_2IvQMew/edit?usp=sharing&ouid=108470188565309865197&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="project-link-btn">Financial Modelling</a>
            <a href="https://docs.google.com/document/d/16BLjd1bWl2OHBLal30bFIdV5pIzva3wmQyLRJ9i1YFM/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="project-link-btn">Executive Summary</a>
          </div>
        </div>
        
        <div className="project-footer">
          <Link to="/#projects" className="back-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default FitBoxProject;

