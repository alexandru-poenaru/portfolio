import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavbarContainer scrolled={scrolled}>
      <NavbarWrapper>
        <Logo to="/">
          <LogoText>Alex P.</LogoText>
        </Logo>

        <MenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavMenu isOpen={isOpen}>
          <NavItem>
            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/resume" onClick={() => setIsOpen(false)}>Resume</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
          </NavItem>
        </NavMenu>

        <SocialIcons>
          <SocialIcon href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialIcon>
        </SocialIcons>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${props => props.scrolled ? props.theme.navbar : 'transparent'};
  box-shadow: ${props => props.scrolled ? `0 2px 10px ${props.theme.shadow}` : 'none'};
  padding: ${props => props.scrolled ? '15px 0' : '20px 0'};
  transition: all 0.3s ease-in-out;
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
`;

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  text-decoration: none;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin: 0;
`;

const MenuButton = styled.div`
  display: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${props => props.theme.navbar};
    padding: 20px 0;
    box-shadow: 0 5px 10px ${props => props.theme.shadow};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.isOpen ? '1' : '0'};
    pointer-events: ${props => props.isOpen ? 'all' : 'none'};
    backdrop-filter: blur(10px);
  }
`;

const NavItem = styled.li`
  margin: 0 15px;
  
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.3s;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.text};
  font-size: 1.2rem;
  margin-left: 15px;
  transition: color 0.3s, transform 0.3s;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-3px);
  }
`;

export default Navbar;