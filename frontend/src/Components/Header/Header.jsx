import React, { useState, useEffect } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './header.css'

const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/menu', display: 'Menu' },
]

const Header = () => {
  // State for login status based on token validation.
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // State for toggling the mobile menu.
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Dummy token validation function. Replace with your actual validation logic.
  const validateToken = token => {
    // For example, you might check the token's length, expiry date, or decode it.
    return token && token.length > 10
  }

  // useEffect to check for token when the component mounts.
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (validateToken(token)) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev)
  }

  return (
    <header className='header'>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            {/* Desktop Navigation */}
            <div className="naviagtion">
              <ul className='menu d-flex align-items-center gap-5'>
                {nav__links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink 
                      to={item.path} 
                      className={navClass => navClass.isActive ? "active__link" : ""}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {isLoggedIn ? (
                  <Link to='/dashboard/profile'>
                    <Button className='btn dashboard__btn'>
                      <i className="ri-dashboard-line"></i> Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button className='btn secondary__btn'>
                      <Link to='/login'>Login</Link>
                    </Button>
                    <Button className='btn primary__btn'>
                      <Link to='/register'>Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile__menu" onClick={toggleMobileMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="mobile__nav">
              <ul className='menu d-flex flex-column gap-3'>
                {nav__links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink 
                      to={item.path} 
                      onClick={() => setShowMobileMenu(false)}
                      className={navClass => navClass.isActive ? "active__link" : ""}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Row>
      </Container>
    </header>
  )
}

export default Header
