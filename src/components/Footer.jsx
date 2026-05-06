import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterAccentLine />
      <FooterContent>
        <FooterSection>
          <FooterLogo>A.P.</FooterLogo>
          <FooterText>
            Applied IT student with a passion for web and back-end development.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Navigation</FooterTitle>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/resume">Resume</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Connect</FooterTitle>
          <SocialLinks>
            <SocialLink href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </SocialLink>
            <SocialLink href="mailto:alexandru.george.poenaru@gmail.com">
              <FaEnvelope /> Email
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>&copy; {currentYear} Alexandru-George Poenaru. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.footer};
  color: white;
  padding-top: 0;
  position: relative;
`;

const FooterAccentLine = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${props => props.theme.primary} 30%,
    ${props => props.theme.primaryLight} 50%,
    ${props => props.theme.primary} 70%,
    transparent 100%
  );
  box-shadow: 0 0 16px ${props => props.theme.glow};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px 40px;
`;

const FooterSection = styled.div``;

const FooterLogo = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 12px;
  color: ${props => props.theme.primary};
  text-shadow: 0 0 16px ${props => props.theme.glow};
`;

const FooterText = styled.p`
  color: ${props => props.theme.footerText};
  line-height: 1.6;
  margin: 0;
  font-size: 0.9rem;
`;

const FooterTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.footerText};
  margin-bottom: 20px;
  margin-top: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.footerText};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.25s ease, padding-left 0.25s ease;

  &:hover {
    color: ${props => props.theme.primary};
    padding-left: 6px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.footerText};
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.25s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 24px;
  text-align: center;
`;

const Copyright = styled.p`
  color: ${props => props.theme.footerText};
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.7;
`;

export default Footer;
