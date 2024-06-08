import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../index.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>About Us</h5>
                        <p>
                            Green Haven Plant Shop offers a diverse selection of indoor and outdoor plants, sourced from trusted growers to ensure quality.
                        </p>
                    </Col>
                    <Col md={3}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/store">Store</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contacts">Contact</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Phone: (123) 456-7890</li>
                            <li>Email: contact@greenhaven.com</li>
                            <li>Address: 123 Green Street, Plant City, PC 12345</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
