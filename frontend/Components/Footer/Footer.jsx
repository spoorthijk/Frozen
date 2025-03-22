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
  
  return (
    <div>
      Footer
    </div>
  )
}

export default Footer
