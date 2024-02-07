import React from 'react';
import './Footer.css';
//import "./pages/LandingPage";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>Discover your dream home with WeRent, where excellence meets personalized service in every real estate transaction.</p>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: WeRent@gmail.com</p>
                    <p>Phone: 123-456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 WeRent. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
