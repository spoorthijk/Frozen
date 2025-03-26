import React from 'react';
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png'

const Footer = () => {

  const quick__links = [
    { path: "/home", display: "Home" },
    { path: "/about", display: "About" },
    { path: "/menu", display: "Menu" },
  ];

  const quick__links2 = [
    { path: "/gallery", display: "Gallery" },
    { path: "/login", display: "Login" },
    { path: "/register", display: "Register" },
  ];


  const year = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Logo and About Section */}
          <Col lg="3" md="6" sm="12">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <p>
             
              Crafting happiness in every scoop. 
              Join us for a delightful journey of sweet flavors!
              </p><br/>
              <div className="social__links d-flex align-items-center gap-4">
                <span><Link to="#"><i className="ri-youtube-line"></i></Link></span>
                <span><Link to="#"><i className="ri-github-fill"></i></Link></span>
                <span><Link to="#"><i className="ri-facebook-circle-line"></i></Link></span>
                <span><Link to="#"><i className="ri-instagram-line"></i></Link></span>
              </div>
            </div>
          </Col>

          {/* Discover Section */}
          <Col lg="3" md="6" sm="12">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* Quick Links Section */}
          <Col lg="3" md="6" sm="12">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* Contact Section */}
          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-map-pin-line"></i> Address:</span>
                </h6>
                <p className="mb-0">Mangalore, India</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-mail-line"></i> Email:</span>
                </h6>
                <p className="mb-0">support@frozenmagic.com</p>
              </ListGroupItem>
              
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-phone-fill"></i> Phone:</span>
                </h6>
                <p className="mb-0">+91 7259778331</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          {/* Copyright Section */}
          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
              Copyright {year} FrozenMagic. All rights reserved. Designed and developed with by CSP.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer
