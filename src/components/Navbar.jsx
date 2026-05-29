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
          <LogoText>A.P.</LogoText>
        </LogoButton>

        <MenuButton onClick={() => setIsOpen(prev => !prev)} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavMenu $isOpen={isOpen}>
          {navLinks.map(({ label, id }) => (
            <NavItem key={id}>
              <NavLinkA href={`#${id}`} $active={activeSection === id} onClick={(e) => handleNavClick(e, id)}>
                {label}
              </NavLinkA>
            </NavItem>
          ))}
        </NavMenu>

        <SocialIcons>
          <SocialIcon href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></SocialIcon>
        </SocialIcons>
      </NavbarWrapper>

      <NavMobileDropdown $isOpen={isOpen}>
        {navLinks.map(({ label, id }) => (
          <MobileNavLink key={id} href={`#${id}`} $active={activeSection === id} onClick={(e) => { e.preventDefault(); setIsOpen(false); scrollToSection(id); }}>
            {label}
          </MobileNavLink>
        ))}
      </NavMobileDropdown>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: ${props => props.$scrolled ? '12px 0' : '18px 0'};
  background: ${props => props.$scrolled ? props.theme.glass : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? props.theme.glassBackdrop : 'none'};
  -webkit-backdrop-filter: ${props => props.$scrolled ? props.theme.glassBackdrop : 'none'};
  border-bottom: ${props => props.$scrolled
    ? `0.5px solid ${props.theme.glassBorder}`
    : '0.5px solid transparent'};
  box-shadow: ${props => props.$scrolled
    ? `inset 0 1px 0 ${props.theme.glassHighlight}, ${props.theme.glassShadow}`
    : 'none'};
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
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  box-shadow: inset 0 1px 0 ${props => props.theme.glassHighlight};
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 12px;
  line-height: 1;
  transition: box-shadow 0.2s ease, transform 0.15s ease;

  &:active { transform: scale(0.94); }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
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
    display: none;
  }
`;

const NavItem = styled.li``;

const NavLinkA = styled.a`
  color: ${props => props.$active ? props.theme.primary : props.theme.text};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  padding: 7px 14px;
  border-radius: 20px;
  display: inline-block;
  position: relative;
  transition: color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  background: ${props => props.$active
    ? props.theme.glassTinted
    : 'transparent'};
  backdrop-filter: ${props => props.$active ? props.theme.glassBackdrop : 'none'};
  -webkit-backdrop-filter: ${props => props.$active ? props.theme.glassBackdrop : 'none'};
  border: 0.5px solid ${props => props.$active ? props.theme.glassTintedBorder : 'transparent'};
  box-shadow: ${props => props.$active
    ? `inset 0 1px 0 ${props.theme.glassTintedHighlight}`
    : 'none'};

  ${props => !props.$active && `
    &:hover {
      color: ${props.theme.primary};
      background: ${props.theme.glow};
      border-color: transparent;
      box-shadow: none;
    }
  `}
`;

const NavMobileDropdown = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: ${props => props.$isOpen ? '12px 16px 16px' : '0 16px'};
    max-height: ${props => props.$isOpen ? '240px' : '0'};
    overflow: hidden;
    transition: max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1), padding 0.28s ease;
    border-top: ${props => props.$isOpen ? `0.5px solid ${props.theme.glassBorder}` : 'none'};
  }
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 11px 32px;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  min-width: 160px;
  color: ${props => props.$active ? props.theme.primary : props.theme.text};
  background: ${props => props.$active ? props.theme.glassTinted : props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.$active ? props.theme.glassTintedBorder : props.theme.glassBorder};
  box-shadow: inset 0 1px 0 ${props => props.$active ? props.theme.glassTintedHighlight : props.theme.glassHighlight};
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;

  &:active { transform: scale(0.97); }
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
  font-size: 1.05rem;
  padding: 8px 9px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
  cursor: pointer;
  border: 0.5px solid transparent;

  &:hover {
    color: ${props => props.theme.primary};
    background: ${props => props.theme.glassTinted};
    backdrop-filter: ${props => props.theme.glassBackdrop};
    -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
    border-color: ${props => props.theme.glassTintedBorder};
    box-shadow: inset 0 1px 0 ${props => props.theme.glassTintedHighlight};
    transform: translateY(-2px);
  }
`;

export default Navbar;
