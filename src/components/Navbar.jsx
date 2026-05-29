import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';

const SECTIONS = ['hero', 'about', 'projects', 'resume', 'contact'];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top: offset, behavior: 'smooth' });
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(id);
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Resume', id: 'resume' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <NavbarContainer $scrolled={scrolled}>
      <NavbarWrapper>
        <LogoButton onClick={(e) => handleNavClick(e, 'hero')}>
          <LogoText $scrolled={scrolled}>A.P.</LogoText>
        </LogoButton>

        <MenuButton onClick={() => setIsOpen(prev => !prev)} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavMenu $isOpen={isOpen}>
          {navLinks.map(({ label, id }) => (
            <NavItem key={id}>
              <NavLinkA
                href={`#${id}`}
                $active={activeSection === id}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </NavLinkA>
            </NavItem>
          ))}
        </NavMenu>

        <SocialIcons>
          <SocialIcon href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
  padding: ${props => props.$scrolled ? '14px 0' : '22px 0'};
  background: ${props => props.$scrolled ? props.theme.navbar : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(20px) saturate(1.6)' : 'none'};
  border-bottom: ${props => props.$scrolled ? `1px solid ${props.theme.border}` : '1px solid transparent'};
  box-shadow: ${props => props.$scrolled ? `0 2px 24px ${props.theme.shadow}` : 'none'};
  transition: padding 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
`;

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${props => props.theme.primary};
  text-shadow: 0 0 20px ${props => props.theme.glow};
  transition: color 0.3s ease, text-shadow 0.3s ease;
  font-family: 'Satoshi', sans-serif;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.4rem;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: ${props => props.theme.navbar};
    backdrop-filter: blur(20px) saturate(1.6);
    border-bottom: 1px solid ${props => props.theme.border};
    padding: 16px 0;
    transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-8px)'};
    opacity: ${props => props.$isOpen ? '1' : '0'};
    pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
    transition: transform 0.25s ease, opacity 0.25s ease;
    z-index: 999;
  }
`;

const NavItem = styled.li`
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const NavLinkA = styled.a`
  color: ${props => props.$active ? props.theme.primary : props.theme.text};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  padding: 8px 14px;
  border-radius: 8px;
  display: inline-block;
  position: relative;
  transition: color 0.25s ease, background 0.25s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: ${props => props.$active ? 'calc(100% - 28px)' : '0'};
    height: 2px;
    bottom: 4px;
    left: 14px;
    background: ${props => props.theme.primary};
    border-radius: 1px;
    box-shadow: 0 0 8px ${props => props.theme.glow};
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    color: ${props => props.theme.primary};
    &::after { width: calc(100% - 28px); }
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    width: 100%;
    display: block;
    text-align: center;
    &::after { display: none; }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.textSecondary};
  font-size: 1.1rem;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.25s ease, background 0.25s ease, transform 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary};
    background: ${props => props.theme.glow};
    transform: translateY(-2px);
  }
`;

export default Navbar;
