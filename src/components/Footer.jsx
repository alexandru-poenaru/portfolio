import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>Alex P.</FooterLogo>
          <FooterText>
          Applied Computer Science student with a passion for web and especially backend development.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
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
  padding-top: 60px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterSection = styled.div`
  margin-bottom: 20px;
`;

const FooterLogo = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: ${props => props.theme.primary};
`;

const FooterText = styled.p`
  color: ${props => props.theme.footerText};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
  color: ${props => props.theme.text};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 2px;
    background-color: ${props => props.theme.primary};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.footerText};
  text-decoration: none;
  margin-bottom: 12px;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.footerText};
  text-decoration: none;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  transition: color 0.3s;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.border};
  padding: 20px;
  text-align: center;
  margin-top: 40px;
`;

const Copyright = styled.p`
  color: ${props => props.theme.footerText};
  font-size: 0.9rem;
`;

export default Footer;