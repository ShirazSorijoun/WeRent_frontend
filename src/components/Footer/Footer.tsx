import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>We are a fictional company providing examples for demonstration.</p>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: example@example.com</p>
                    <p>Phone: 123-456-7890</p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 WeRent. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
